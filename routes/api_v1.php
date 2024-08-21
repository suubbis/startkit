<?php


use App\Http\Controllers\AccessControlController;
use App\Http\Controllers\CompanyDetailController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SystemSettingController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('logout', [\App\Http\Controllers\AuthController::class, 'logout']);

Route::apiResource('users', UserController::class);
Route::apiResource('roles', RoleController::class);
Route::apiResource('permissions', PermissionController::class);
Route::apiResource('company-details', CompanyDetailController::class);
Route::apiResource('system-settings', SystemSettingController::class);
Route::apiResource('access-controls', AccessControlController::class);
