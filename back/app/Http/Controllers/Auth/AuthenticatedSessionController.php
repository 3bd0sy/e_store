<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\View\View;
use App\Models\User;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): View
    {
        return view('auth.login');
    }

    // /**
    //  * Handle an incoming authentication request.
    //  */
    // public function storeapi(Request $request)
    // {       
    //     $request->validate([
    //         'email' => 'required|email',
    //         'password' => 'required',
    //     ]);

    //     $user = User::where('email', $request->email)->first();

    //     if (!$user || !Hash::check($request->password, $user->password)) {
    //         throw ValidationException::withMessages([
    //             'email' => ['The provided credentials are incorrect.'],
    //         ]);
    //     }

    //     Auth::login($user);

    //     // Revoke all tokens...
    //     $user->user()->tokens()->delete();

    //     // create new token
    //     $token = $user->createToken('register_token');

    //     return response()->json([
    //         'token' => $token,
    //         'message' => __('Loggid in Successfully'),
    //     ], 200);
    // }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request)
    {
        $request->authenticate();

        // check if API call
        if ($request->wantsJson()) {
            // Revoke all tokens...
            $request->user()->tokens()->delete();

            // create new token
            $token = $request->user()->createToken('register_token')->plainTextToken;

            return response()->json([
                'token' => $token,
                'message' => __('Success'),
            ], 200);
        }

        $request->session()->regenerate();

        return redirect()->intended(RouteServiceProvider::HOME);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
