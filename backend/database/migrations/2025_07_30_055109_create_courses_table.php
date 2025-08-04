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
      

        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Assuming relation to users table
            $table->foreignId('category_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('level_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('language_id')->nullable()->constrained()->onDelete('cascade');
            $table->text('description')->nullable();
            $table->decimal('price', 8, 2)->default(0.00);
            $table->decimal('cross_price', 8, 2)->nullable();
            $table->integer('status')->default(0); // e.g. 1 = active, 0 = inactive
            $table->enum('is_featured', ['yes', 'no'])->default('no');
            $table->string('image')->nullable();
            $table->timestamps();
        });

        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};
