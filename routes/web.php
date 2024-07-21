<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
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

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth:sanctum', 'verified'])->name('dashboard');

Route::middleware('auth:sanctum')->group(function () {
    Route::prefix('/posts')->group(function () {
        Route::get('/', [PostController::class, 'index'])->name('posts.index');
        Route::get('/create', [PostController::class, 'create'])->name('posts.create');
        Route::post('/store', [PostController::class, 'store'])->name('posts.store');
        Route::get('/edit/{post}', [PostController::class, 'edit'])->name('posts.edit');
        Route::patch('/update/{post}', [PostController::class, 'update'])
            ->name('posts.update')
            ->middleware('can:update,post');
        Route::delete('/{post}', [PostController::class, 'destroy'])->name('posts.destroy')
            ->middleware('can:delete,post');
        Route::get('/{post}', [PostController::class, 'show'])->name('posts.show');
        Route::post('/comment/{post}', [PostController::class, 'comment'])->name('posts.comment');
    });

    Route::prefix('/comments')->group(function () {
        Route::delete('/{comment}', [CommentController::class, 'destroy'])
            ->name('comments.destroy')->middleware('can:delete,comment');

        Route::patch('/update/{comment}', [CommentController::class, 'update'])
            ->name('comments.update')->middleware('can:update,comment');
    });
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
