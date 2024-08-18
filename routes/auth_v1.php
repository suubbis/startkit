<?php

use Illuminate\Support\Facades\Route;

Route::post('login', [\App\Http\Controllers\AuthController::class, 'login']);

Route::get('logout', [\App\Http\Controllers\AuthController::class, 'logout']);