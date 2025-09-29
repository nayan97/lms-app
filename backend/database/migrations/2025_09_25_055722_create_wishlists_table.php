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
            $table->string('name')->nullable();
            $table->string('email');
            $table->string('product_title');
            $table->string('price');
            $table->string('photo');
            $table->string('size')->nullable();   // ✅ added size
            $table->string('color')->nullable();  // ✅ added color
            $table->string('product_id');
            $table->string('user_id');
            $table->integer('qty')->default(1);
            $table->timestamps();

            // Prevent duplicate wishlist entries for same user/product/variant
            $table->unique(['user_id', 'product_id', 'size', 'color']);
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
