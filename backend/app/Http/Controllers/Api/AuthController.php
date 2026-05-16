<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;


use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;

class AuthController extends Controller
{
    private function formatUser(User $user)
    {
        return [
            'id' => $user->id,

            'name' => $user->name,

            'email' => $user->email,

            'role' => $user->role,

            'avatar' => $user->avatar,

            'avatar_url' => $user->avatar
                ? (
                    str_starts_with($user->avatar, 'http')
                    ? $user->avatar
                    : asset('storage/' . $user->avatar)
                )
                : null,
        ];
    }

    /* ================= REGISTER ================= */

    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        Auth::login($user);

        $request->session()->regenerate();

        $user = Auth::user();

        return response()->json([

            'message' => __('messages.register_success'),

            'user' => $this->formatUser($user)

        ]);
    }

    /* ================= LOGIN ================= */

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (!Auth::attempt($credentials)) {

            return response()->json([
                'message' =>  __('messages.invalid_credentials')
            ], 401);
        }

        $request->session()->regenerate();

        $user = Auth::user();

        return response()->json([

            'message' => __('messages.login_success'),

            'user' => $this->formatUser($user)

        ]);
    }

    /* ================= USER ================= */

    public function user(Request $request)
    {
        $user = $request->user();

        return response()->json([
            'user' => $this->formatUser($user)
        ]);
    }

    /* ================= LOGOUT ================= */

    public function logout(Request $request)
    {
        auth('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->json([
            'message' => __('messages.logout_success')
        ]);
    }

    public function forgotPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email'
        ]);

        $status = Password::sendResetLink(
            $request->only('email')
        );

        return $status === Password::RESET_LINK_SENT
            ? response()->json(['message' => __('messages.reset_link_sent')])
            : response()->json(['message' => __('messages.reset_link_failed')], 400);
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:6|confirmed',
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->password = Hash::make($password);
                $user->save();
            }
        );

        return $status === Password::PASSWORD_RESET
            ? response()->json(['message' => __('messages.password_reset_success')])
            : response()->json(['message' => __('messages.invalid_token')], 400);
    }
}
