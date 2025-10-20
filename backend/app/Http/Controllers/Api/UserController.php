<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Display user info by email.
     * Handles CORS correctly since it's outside Sanctum middleware.
     */
    public function show($email)
    {
        // ✅ Optional: manually check authentication
        // Uncomment this if you want only logged-in users to access it
     
        // if (!Auth::check()) {
        //     return response()->json(['message' => 'Unauthorized'], 401);
        // }
       

        $user = User::where('email', $email)->first();

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        return response()->json([
            'id'    => $user->id,
            'name'  => $user->name,
            'email' => $user->email,
            'role'  => $user->role,
        ], 200);
    }
}
