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
        Schema::create('districts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('division_id')->constrained()->onDelete('cascade'); 
            $table->string('name');        // English name
            $table->string('bn_name');     // Bangla name
            $table->decimal('lat', 10, 7)->nullable();  // latitude
            $table->decimal('long', 10, 7)->nullable(); // longitude
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('districts');
    }
};
