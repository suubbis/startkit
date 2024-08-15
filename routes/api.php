<?php


use App\Http\Controllers\AccessControlController;
use App\Http\Controllers\CompanyDetailController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SystemSettingController;
use App\Http\Controllers\UserController;
use Illuminate\Routing\Route;

Route::prefix('api/v1')->middleware(['auth:sanctum', 'throttle:60,1'])->group(function () {
    Route::get('users', [UserController::class, 'index']);

    Route::apiResource('roles', RoleController::class);
    Route::apiResource('permissions', PermissionController::class);
    Route::apiResource('company-details', CompanyDetailController::class);
    Route::apiResource('system-settings', SystemSettingController::class);
    Route::apiResource('access-controls', AccessControlController::class);
});
