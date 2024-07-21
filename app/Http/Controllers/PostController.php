<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddCommentRequest;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Models\Comment;
use App\Models\Post;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Posts/ListPosts', [
            'posts' => Post::query()->orderBy('created_at', 'desc')->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Posts/CreatePost');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostRequest $request)
    {
        Post::create([
            'title' => $request->title,
            'description' => $request->description,
            'body' => $request->body,
            'user_id' => $request->user()->id,
        ]);

        return Redirect::route('posts.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        return Inertia::render('Posts/ShowPost', [
            'post' => $post,
        ]);
    }

    /**
     * Add a user comment to the specified post
     */
    public function comment(Post $post, AddCommentRequest $request)
    {
        $comment = new Comment([
            'contents' => $request->contents,
            'user_id' => $request->user()->id,
        ]);

        $post->comments()->save($comment);
        return Redirect::route('posts.show', ['post' => $post]);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        return Inertia::render('Posts/EditPost', [
            'post' => $post,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostRequest $request, Post $post)
    {
        $post->update($request->input());
        return Redirect::route('posts.show', ['post' => $post]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $post->delete();
        return Redirect::route('posts.index');
    }
}
