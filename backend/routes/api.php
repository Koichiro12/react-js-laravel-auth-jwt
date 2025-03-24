<?php

use App\Http\Controllers\API\AuthController;

Route::group(['middleware' => 'api', 'prefix' => 'auth'], function ($router) {
    Route::post('register',[AuthController::class,'register'])->name('register');
    Route::post('login',[AuthController::class,'login'])->name('login');
    Route::post('logout',[AuthController::class,'logout'])->name('logout');
    Route::get('me',[AuthController::class,'me'])->name('me');
    Route::get('refresh',[AuthController::class,'refresh'])->name('refresh');
});