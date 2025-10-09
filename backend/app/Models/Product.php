<?php

namespace App\Models;

use App\Models\Cart;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
       use HasFactory;


    protected $fillable = [
        'title',
        'description',
        'sizes',
        'colors',
        'category_id',
        'user_id',
        'price',
        'source_price',
        'source_url',
        'cross_price',
        'max_price',
        'profit',
        'status',
        'is_featured',
        'image',
        'image_gal',
    ];

    protected $casts = [
        'sizes' => 'array',
        'colors' => 'array',
        'image_gal' => 'array',
             // ✅ force integer casting
        'price' => 'integer',
        'source_price' => 'integer',
        'cross_price' => 'integer',
        'max_price' => 'integer',
        'profit' => 'integer',
    ];


    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    public function carts()
    {
        return $this->hasMany(Cart::class, 'product_id');
    }
    public function orders()
    {
        return $this->hasMany(CheckoutOrder::class);
    }
        public function user()
    {
        return $this->belongsTo(User::class);
    }



}
