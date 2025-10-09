<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\Storage;


class ProfileController extends Controller
{
    /**
     * Get logged-in user profile
     */
    public function show(Request $request)
    {
        $user = $request->user();

        // Append full image URL for avatar
        $user->avatar_url = $user->avatar
            ? asset('storage/' . $user->avatar)
            : null;

        return response()->json([
            'status' => true,
            'user' => $user,
        ]);
    }

    /**
     * Update user profile info
     */


public function update(ProfileUpdateRequest $request)
{
    $user = $request->user();

    // Validate additional avatar field
    $request->validate([
        'avatar' => ['nullable', 'image', 'max:2048'],
    ]);

    // Update basic profile fields
    $user->name = $request->input('name');
    $user->phone = $request->input('phone');
    $user->gender = $request->input('gender');
    $user->address = $request->input('address');

    // Handle avatar upload
    if ($request->hasFile('avatar')) {
        // Delete old avatar if exists
        if ($user->avatar && Storage::disk('public')->exists($user->avatar)) {
            Storage::disk('public')->delete($user->avatar);
        }

        // Store new avatar
        $path = $request->file('avatar')->store('avatars', 'public');
        $user->avatar = $path;
    }

    // Handle email verification reset if changed
    if ($user->isDirty('email')) {
        $user->email_verified_at = null;
    }

    $user->save();

    return response()->json([
        'status' => true,
        'message' => 'Profile updated successfully.',
        'user' => $user,
        'avatar_url' => $user->avatar ? asset('storage/' . $user->avatar) : null,
    ]);
}

    /**
     * Update password
     */
    public function updatePassword(Request $request)
    {
        $request->validate([
            'current_password' => ['required', 'current_password'],
            'password' => ['required', 'confirmed', Password::defaults()],
        ]);

        $user = $request->user();
        $user->password = Hash::make($request->password);
        $user->save();

        return response()->json([
            'status' => true,
            'message' => 'Password updated successfully.',
        ]);
    }

    /**
     * Update avatar
     */
    public function updateAvatar(Request $request)
    {
        $request->validate([
            'avatar' => ['required', 'image', 'max:2048'],
        ]);

        $user = $request->user();

        // Delete old avatar if exists
        if ($user->avatar && Storage::disk('public')->exists($user->avatar)) {
            Storage::disk('public')->delete($user->avatar);
        }

        // Store new avatar
        $path = $request->file('avatar')->store('avatars', 'public');
        $user->avatar = $path;
        $user->save();

        return response()->json([
            'status' => true,
            'message' => 'Avatar updated successfully.',
            'avatar_url' => asset('storage/' . $path),
        ]);
    }

    /**
     * Delete user account
     */
    public function destroy(Request $request)
    {
        // Validate the password
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        // Revoke all tokens for the user (Sanctum)
        if (method_exists($user, 'tokens')) {
            $user->tokens()->delete();
        }

        // Delete the user
        $user->delete();

        return response()->json([
            'status' => true,
            'message' => 'Account deleted successfully.',
        ]);
    }
}
