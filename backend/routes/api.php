<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


use App\Http\Controllers\CartController;
use App\Http\Controllers\HomeController;

use App\Http\Controllers\AccountController;
use App\Http\Controllers\Api\SizeController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\AddColorController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\front\CourseController;
use App\Http\Controllers\Api\ProductDetailController;




Route::post('/register', [AccountController::class, 'register']);
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
    Route::get('/checkout-data', [CheckoutController::class, 'checkoutData']);

});