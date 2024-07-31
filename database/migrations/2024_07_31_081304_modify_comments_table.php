<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('comments', function (Blueprint $table) {
            $table->foreign('post_id')->references('id')->on('posts')->cascadeOnDelete()->cascadeOnUpdate();
            $table->string('contents', length: 200)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('comments', function (Blueprint $table) {
            $table->foreign('post_id')->references('id')->on('posts');
            $table->text('contents')->change();
        });
    }
};
