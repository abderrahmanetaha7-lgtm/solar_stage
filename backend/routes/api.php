<?php

use App\Http\Controllers\Api\AnalyticsController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\SettingController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\GoogleAuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
 
// PUBLIC ROUTES
Route::middleware('throttle:10,1')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/auth/google', [GoogleAuthController::class, 'googleLogin']);
    Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
    Route::post('/reset-password', [AuthController::class, 'resetPassword']);
});

Route::middleware('throttle:5,1')->post('/contact', [ContactController::class, 'store']);
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{product}', [ProductController::class, 'show']);
Route::get('/settings', [SettingController::class, 'index']);
Route::post('/orders', [OrderController::class, 'store']);
// AUTH ROUTES
Route::middleware('auth:sanctum')->group(function () {

    // AUTH
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    // PROFILE
    Route::put('/profile', [ProfileController::class, 'update']);
    Route::delete('/profile', [ProfileController::class, 'destroy']);
    // USER ORDERS
    Route::get('/orders', [OrderController::class, 'index']);
    // Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/orders/{order}', [OrderController::class, 'show']);
    Route::put('/orders/{order}', [OrderController::class, 'update']);
    // USER CANCEL ORDER
    Route::patch(
        '/orders/{order}/cancel',
        [OrderController::class, 'cancel']
    );
    // ADMIN
    Route::middleware('admin')->group(function () {
        // ADMIN USER
        Route::get('/admin', function (Request $request) {
            return response()->json($request->user());
        });
        // CONTACT MESSAGES
        Route::get(
            '/contact-messages',
            [ContactController::class, 'index']
        );

        Route::get(
            '/contact-messages/{contactMessage}',
            [ContactController::class, 'show']
        );

        Route::delete(
            '/contact-messages/{contactMessage}',
            [ContactController::class, 'destroy']
        );

        // SETTINGS
        Route::post('/settings', [SettingController::class, 'update']);

        // USERS
        Route::get('/users', [UserController::class, 'index']);

        Route::get('/users/{id}', [UserController::class, 'show']);

        Route::put('/users/{id}', [UserController::class, 'update']);

        Route::delete('/users/{id}', [UserController::class, 'destroy']);

        // PRODUCTS
        Route::post('/products', [ProductController::class, 'store']);

        Route::put(
            '/products/{product}',
            [ProductController::class, 'update']
        );

        Route::delete(
            '/products/{product}',
            [ProductController::class, 'destroy']
        );

        //======================== ADMIN ORDER MANAGEMENT ==================
        // CHANGE STATUS
        Route::patch(
            '/orders/{order}/status',
            [OrderController::class, 'updateStatus']
        );

        // ARCHIVE ORDER
        Route::delete(
            '/orders/{order}',
            [OrderController::class, 'destroy']
        );

        Route::get('/archived-orders', [OrderController::class, 'archived']);

        Route::patch('/orders/{id}/restore', [OrderController::class, 'restore']);
        
        // ANALYTICS
        Route::get('/analytics', [AnalyticsController::class, 'index']);
    });
});
