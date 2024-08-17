<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request): \Illuminate\Http\JsonResponse
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            return $this->jsonResponse([],'Invalid email or password', 401);
        }
        $user = auth()->user();
        $token = $user->createToken('API Token')->plainTextToken;

        return $this->jsonResponse([
            'token' => $token,
            'user' => $user,
        ],'Login successful');
    }
}
