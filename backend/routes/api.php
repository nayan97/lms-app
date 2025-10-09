<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


use App\Http\Controllers\AdController;
use App\Http\Controllers\CartController;

use App\Http\Controllers\HomeController;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Api\SizeController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\WishListController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\AddColorController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\front\CourseController;
use App\Http\Controllers\Api\ProductDetailController;
use App\Http\Controllers\PasswordResetLinkController;




Route::post('/register', [AccountController::class, 'register']);

// Route::post('/forgot-password', [PasswordResetLinkController::class, 'sendResetLinkEmail']);
// Route::post('/reset-password', [PasswordResetLinkController::class, 'resetPassword']);
Route::post('/auth/forgot-password', [PasswordResetLinkController::class, 'sendOtp']);
Route::post('/auth/verify-otp', [PasswordResetLinkController::class, 'verifyOtp']);
Route::post('/auth/reset-password', [PasswordResetLinkController::class, 'resetPassword']);

Route::post('/login', [AccountController::class, 'authenticate']);
Route::get('/home',[HomeController::class,'index']);

Route::get('/product/{id}',[HomeController::class, 'productDetails']);
Route::get('/districts', [CheckoutController::class, 'getDistricts']);
Route::get('/districts/{id}/subdistricts', [CheckoutController::class, 'getSubdistricts']);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::group(['middleware' => ['auth:sanctum']], function(){

      // ✅ Logout route
    Route::post('/logout', [AccountController::class, 'logout']);
    Route::resource('/admin/categories', CategoryController::class);
    Route::resource('/admin/colors', AddColorController::class);
    Route::resource('/admin/sizes', SizeController::class);
    Route::resource('/admin/products', ProductController::class);
    
    Route::get('/products-detail', [ProductDetailController::class, 'index']);
    Route::get('/users/{email}', [UserController::class, 'show']);

    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart/{id}', [CartController::class, 'store']);
    Route::put('/cart/{id}', [CartController::class, 'update']);
    Route::delete('/removecart/{id}',[CartController::class, 'destroy']);

    //------------------------Wishlist------------------------//

    Route::get('/wishlist',[WishListController::class, 'showWishList']);
    Route::post('/wishlist/{id}', [WishListController::class, 'addToWishList']);
    Route::post('/wishlist/move-to-cart/{id}', [WishListController::class, 'moveToCart']);
    Route::delete('/wishlist/remove/{id}', [WishListController::class, 'destroy']);

    Route::get('/checkout-data', [CheckoutController::class, 'checkoutData']);
    Route::post('/checkout-data', [CheckoutController::class, 'checkoutOrders']);
    Route::get('/checkout-orders', [CheckoutController::class, 'myOrders']);

    // Common profile routes for ALL authenticated users

    Route::get('/profile', [ProfileController::class, 'show']);
    Route::put('/profile', [ProfileController::class, 'update']);
    Route::post('/profile/avatar', [ProfileController::class, 'updateAvatar']);
    Route::put('/profile/password', [ProfileController::class, 'updatePassword']);
    Route::post('/profile/delete', [ProfileController::class, 'destroy']);


    Route::get('/ads', [AdController::class, 'index']);
    Route::post('/ads/{id}/view', [AdController::class, 'view']);
    Route::post('ads/{ad}/create-session', [AdController::class, 'createSession']);
    Route::post('ads/complete', [AdController::class, 'completeView']);
    // Route::post('withdrawals', [WithdrawalController::class, 'requestWithdrawal']);
});