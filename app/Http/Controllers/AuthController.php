<?php

namespace App\Http\Controllers;

use App\Models\AccessControl;
use App\Models\User;
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

        $user = User::where('email', $request->email)->first();
        if ($user) {
            $userAccess = AccessControl::where('role_id', $user->role_id)->first();
            $currentTime = date('H:i:s');
            $today = date('l');
            $today = "schedule_".strtolower($today);

            if ($currentTime < $userAccess->start_time || $currentTime > $userAccess->end_time) {
                return $this->jsonResponse([],'You are not allowed to login at this time', 401);
            }
            if ($userAccess->$today == 0) {
                return $this->jsonResponse([],'You are not allowed to login on this day', 401);
            }
        }

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

    public function logout(Request $request): \Illuminate\Http\JsonResponse
    {
        if ($request->user()) {
            $request->user()->currentAccessToken()->delete();
        }
        return $this->jsonResponse([],'Logout successful');
    }
}
