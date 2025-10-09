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
        Schema::create('ad_sessions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ad_id')->constrained();
            $table->foreignId('user_id')->constrained();
            $table->string('session_token')->unique();
            $table->timestamp('created_at');
            $table->boolean('credited')->default(false);
            $table->timestamp('credited_at')->nullable();
            $table->integer('required_seconds')->default(15);
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ad_sessions');
    }
};
