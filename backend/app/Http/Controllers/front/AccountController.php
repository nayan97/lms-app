<?php

namespace App\Http\Controllers\front;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AccountController extends Controller
{
    public function register(Request $request)
    {
        // Validate input
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:5',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
        ]);

        // Handle validation failure
        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ], 400);
        }


        // Create new user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Return success response
        return response()->json([
            'status' => 200,
            'message' => 'User registered successfully',
            'user' => $user
        ],200);
    }


    // auth function

    public function authenticate(Request $request) {
        $credentials = $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    // Attempt to find user
    $user = User::where('email', $credentials['email'])->first();

    if (!$user || !Hash::check($credentials['password'], $user->password)) {
        return response()->json([
            'status' => false,
            'message' => 'Invalid email or password.'
        ], 401);
    }

    // Create token using Sanctum
    $token = $user->createToken('auth_token')->plainTextToken;

    return response()->json([
        'status' => 200,
        'message' => 'Login successful.',
        'name' => $user->name,
        'id' => $user->id,
        'token' => $token,
    ], 401);
        
    }
}
