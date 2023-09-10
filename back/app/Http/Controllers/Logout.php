<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\PersonalAccessToken;
use Illuminate\Http\Request;

class Logout extends Controller
{
    public function logout(Request $request)
    {
        $user = Auth::user();

        // Revoke all tokens for the user
        $user->tokens->each(function (PersonalAccessToken $token) {
            $token->delete();
        });

        return response()->json([
            'message' => 'User logged out successfully',
        ], 200);
    }
}
