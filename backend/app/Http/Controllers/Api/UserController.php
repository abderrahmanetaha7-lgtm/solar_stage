<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /* ================= GET USERS ================= */

    public function index()
    {
        return response()->json(
            User::latest()->get()
        );
    }

    /* ================= UPDATE USER ================= */

    public function update(Request $request, string $id)
    {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'role' => 'nullable|string',
            'status' => 'nullable|string',
            'name' => 'nullable|string|max:255',
            'email' => 'nullable|email',
        ]);

        $user->update($validated);

        return response()->json([
            'message' => __('messages.user_updated'),
            'user' => $user,
        ]);
    }

    /* ================= DELETE USER ================= */

    public function destroy(string $id)
    {
        $user = User::findOrFail($id);

        $user->delete();

        return response()->json([
            'message' => __('messages.user_deleted')
        ]);
    }
}
