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
        Schema::create('ad_views', function (Blueprint $table) {
                $table->id();
                $table->foreignId('ad_session_id')->constrained();
                $table->foreignId('ad_id')->constrained();
                $table->foreignId('user_id')->constrained();
                $table->decimal('amount', 8, 4);
                $table->string('ip')->nullable();
                $table->string('user_agent')->nullable();
                $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ad_views');
    }
};
