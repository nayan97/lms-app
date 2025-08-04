<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\front\CourseController;
use App\Http\Controllers\front\AccountController;

Route::post('/register', [AccountController::class, 'register']);
Route::post('/login', [AccountController::class, 'authenticate']);


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::group(['middleware' => ['auth:sanctum']], function(){
    Route::post('/course', [CourseController::class, 'store']);
    Route::get('/course/meta-data', [CourseController::class, 'metaData']);
    Route::get('/course/{id}', [CourseController::class, 'show']);
    Route::put('/course/{id}', [CourseController::class, 'update']);

});