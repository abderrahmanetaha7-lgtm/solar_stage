<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    /* ================= UPDATE PROFILE ================= */

    public function update(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([

            'name' => 'required|string|max:255',

            'email' => 'required|email|unique:users,email,' . $user->id,
 

            'current_password' => 'nullable|required_with:new_password|string',

            'new_password' => 'nullable|min:6|string',

            'avatar' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',

        ]);

        /* ================= CHECK PASSWORD ================= */

        if ($request->filled('new_password')) {

            if (!$request->filled('current_password')) {

                return response()->json([
                    'errors' => [
                        'current_password' => [
                            __('messages.current_password_required')
                        ]
                    ]
                ], 422);
            }

            if (!Hash::check(
                $request->current_password,
                $user->password
            )) {

                return response()->json([
                    'errors' => [
                        'current_password' => [
                            __('messages.password_incorrect')
                        ]
                    ]
                ], 422);
            }

            $user->password = Hash::make(
                $request->new_password
            );
        }

        /* ================= UPLOAD AVATAR ================= */

        if ($request->hasFile('avatar')) {

            // DELETE OLD IMAGE

            if ($user->avatar) {

                Storage::disk('public')->delete(
                    $user->avatar
                );
            }

            $path = $request
                ->file('avatar')
                ->store('avatars', 'public');

            $user->avatar = $path;
        }

        /* ================= UPDATE INFO ================= */

        $user->name = $validated['name'];

        $user->email = $validated['email']; 

        $user->save();

        return response()->json([

            'message' => __('messages.profile_updated'),

            'user' => [

                'id' => $user->id,

                'name' => $user->name,

                'email' => $user->email, 

                'role' => $user->role,

                'avatar' => $user->avatar,

                'avatar_url' => $user->avatar
                    ? asset('storage/' . $user->avatar)
                    : null,
            ]
        ]);
    }

    /* ================= DELETE ACCOUNT ================= */

    public function destroy(Request $request)
    {
        $user = $request->user();

        /* DELETE AVATAR */

        if ($user->avatar) {

            Storage::disk('public')->delete(
                $user->avatar
            );
        }

        /* DELETE TOKENS */

        $user->tokens()->delete();

        /* DELETE USER */

        $user->delete();

        return response()->json([
            'message' => __('messages.account_deleted'),
        ]);
    }
}
