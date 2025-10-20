<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProxyController;

Route::get('/', function () {
    return view('welcome');
});


Route::get('/proxy', [ProxyController::class, 'loadSite']);


Route::get('/clear-all', function () {
    Artisan::call('config:clear');
    Artisan::call('cache:clear');
    Artisan::call('route:clear');
    Artisan::call('view:clear');
    Artisan::call('optimize:clear');

    return '✅ All caches cleared successfully!';
});