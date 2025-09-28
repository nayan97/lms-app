<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CheckoutOrder extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'product_id',
        'quantity',
        'admin_price',
        'max_sell_price',
        'reseller_sell_price',
        'reseller_profit',
        'customer_name',
        'customer_number',
        'district_id',
        'upazila_id',
        'delivery_address',
        'additional_instruction',
        'delivery_charge',
        'total',
        'payment_status',
        'delivery_status',
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function district()
    {
        return $this->belongsTo(District::class);
    }

    public function upazila()
    {
        return $this->belongsTo(Upazila::class);
    }
}
