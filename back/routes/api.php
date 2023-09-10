<?php

use App\Http\Controllers\Api\ProductsController;
use App\Http\Controllers\Logout;

use App\Http\Controllers\Api\CategoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!

sanctum - passport
|
*/

// not auth requests
Route::middleware('guest')->group(function () {
    // 1) Register
    Route::post('register', [RegisteredUserController::class, 'store']);

    // 2) Login
    Route::post('login', [AuthenticatedSessionController::class, 'store']);

    // 3) Get Products
    Route::get('products', [ProductsController::class, 'GetProducts']);
});

// auth requests
Route::middleware('auth:sanctum')->group(function () {
    // 4) Create orders
    Route::post('orders', [ProductsController::class, 'CreateOrder']);

    // 5) Get User API Requests
    Route::get('user', function (Request $request) {
        return $request->user();
    });

    // 6) Get orders
    Route::get('orders', [ProductsController::class, 'GetOrders']);
    // Authenticated routes


    // Create orders (POST)
   // Route::post('orders', [ProductsController::class, 'CreateOrder']);

    // Update the quantity of a product in an order (PUT)
    Route::put('updateorder/{order_id}/product/{product_id}', [ProductsController::class, 'updateProductQuantity']);

    // Delete a product from an order (DELETE)
    Route::delete('deletefromorder/{order_id}/product/{product_id}', [ProductsController::class, 'deleteProduct']);

    //Return a list of all exist categories
    Route::get('/categories', [CategoryController::class, 'getAllCategories']);
    // Return a List by Cat id
    Route::get('/products/category/{categoryId}', [ProductsController::class, 'getProductsByCategory']);
    // Search for product using: name - desc - category fields
    Route::get('/products/search', [ProductsController::class, 'searchProducts']);
    //LOgout

    Route::post('/logout', [Logout::class, 'logout'])->middleware('auth:sanctum');

});


