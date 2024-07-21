<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateCommentRequest;
use App\Models\Comment;
use Illuminate\Support\Facades\Redirect;


class CommentController extends Controller
{
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment)
    {
        $comment->delete();
        return Redirect::route('posts.show', ['post' => $comment->post_id]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCommentRequest $request, Comment $comment)
    {
        $comment->update($request->input());
        return Redirect::route('posts.show', ['post' => $comment->post_id]);
    }
}
