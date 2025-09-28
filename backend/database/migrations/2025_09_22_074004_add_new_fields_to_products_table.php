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
        Schema::table('products', function (Blueprint $table) {
                $table->string('source_url')->nullable()->after('short_description');
                $table->decimal('source_price', 10, 2)->nullable()->after('source_url');
                $table->decimal('profit', 10, 2)->nullable()->after('cross_price');
                $table->json('image_gal')->nullable()->after('image');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn(['source_url', 'source_price', 'profit', 'image_gal']);
        });
    }
};
