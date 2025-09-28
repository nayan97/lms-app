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
        Schema::create('wishlists', function (Blueprint $table) {
            $table->id();

            // Reference to user
            $table->foreignId('user_id')
                ->constrained()
                ->onDelete('cascade');

            // Reference to product
            $table->foreignId('product_id')
                ->constrained()
                ->onDelete('cascade');
            $table->integer('qty')->default(1);

            $table->timestamps();

            // Prevent duplicate wishlist entries
            $table->unique(['user_id', 'product_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wishlists');
    }
};
