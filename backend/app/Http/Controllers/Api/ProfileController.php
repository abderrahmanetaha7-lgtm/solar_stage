<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\ImageOptimizer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    public function __construct(
        private readonly ImageOptimizer $imageOptimizer
    ) {}

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

        if ($request->hasFile('avatar')) {

            if ($user->avatar && !str_starts_with($user->avatar, 'http')) {

                Storage::disk('public')->delete(
                    $user->avatar
                );
            }

            $path = $this->imageOptimizer->optimizeAndStore(
                $request->file('avatar'),
                'avatars',
                ImageOptimizer::AVATAR_MAX_SIZE,
                ImageOptimizer::AVATAR_MAX_SIZE
            );

            $user->avatar = $path;
        }

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

                'avatar_url' => $user->avatar_url,
            ]
        ]);
    }

    /* ================= DELETE ACCOUNT ================= */

    public function destroy(Request $request)
    {
        $user = $request->user();

        if ($user->avatar && !str_starts_with($user->avatar, 'http')) {

            Storage::disk('public')->delete(
                $user->avatar
            );
        }

        $user->tokens()->delete();

        $user->delete();

        return response()->json([
            'message' => __('messages.account_deleted'),
        ]);
    }
}
