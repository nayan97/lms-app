<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCheckoutOrdersTable extends Migration

{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('checkout_orders', function (Blueprint $table) {
            $table->id();

            // Relations
            $table->unsignedBigInteger('user_id')->nullable();  // customer (buyer)
            $table->unsignedBigInteger('product_id')->nullable(); // ordered product

            // Product & Pricing
            $table->integer('quantity')->default(1);
            $table->decimal('admin_price', 10, 2)->nullable();
            $table->decimal('max_sell_price', 10, 2)->nullable();
            $table->decimal('reseller_sell_price', 10, 2)->nullable();
            $table->decimal('reseller_profit', 10, 2)->default(0);

            // Customer Details
            $table->string('customer_name');
            $table->string('customer_number');
            $table->unsignedBigInteger('district_id')->nullable();
            $table->unsignedBigInteger('upazila_id')->nullable();
            $table->text('address')->nullable();
            $table->text('additional_instruction')->nullable();

            // Order Summary
            $table->decimal('delivery_charge', 10, 2)->default(0);
            $table->decimal('total', 10, 2)->default(0);

            // Status
            $table->enum('payment_status', ['Pending', 'Cash On', 'Paid'])->default('Cash On');
            $table->enum('delivery_status', ['Processing', 'Shipped', 'Delivered', 'Cancelled'])->default('Processing');

            $table->timestamps();

            // Foreign Keys
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('product_id')->references('id')->on('products')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('checkout_orders');
    }
}
