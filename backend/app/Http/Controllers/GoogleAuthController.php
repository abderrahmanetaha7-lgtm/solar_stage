<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Google_Client;

class GoogleAuthController extends Controller
{
    public function googleLogin(Request $request)
    {
        $request->validate([
            'token' => 'required',
        ]);

        $client = new Google_Client([
            'client_id' => env('GOOGLE_CLIENT_ID'),
        ]);

        $payload = $client->verifyIdToken($request->token);

        if (!$payload) {
            return response()->json([
                'message' => __('messages.invalid_google_token'),
            ], 401);
        }

        $user = User::where('email', $payload['email'])->first();

        if (!$user) {
            $user = User::create([
                'name' => $payload['name'],
                'email' => $payload['email'],
                'google_id' => $payload['sub'],
                'avatar' => $payload['picture'] ?? null,
                'password' => bcrypt(Str::random(24)),

                // 'role' => $payload['email'] === env('ADMIN_EMAIL')
                //     ? 'admin'
                //     : 'user',
            ]);
        }

        // LOGIN USER
        Auth::login($user);

        // IMPORTANT
        $request->session()->regenerate();

        return response()->json([
            'message' => __('messages.google_login_success'),
        ]);
    }
}
