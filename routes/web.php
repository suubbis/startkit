<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

//Route::get('/dashboard', function () {
//    return Inertia::render('Dashboard');
//})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/translations/{lang}', function($lang) {
    App::setLocale($lang);
    return response()->json([
        'labels' => trans('labels'),
    ]);
});

Route::get('/{any}', function () {
    return Inertia::render('Dashboard');
})->where('any', '^(?!api).*$');

include __DIR__.'/auth.php';