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
        'user_id',
        'category_id',
        'description',
        'sizes',
        'colors',
        'price',
        'cross_price',
        'source_price',
        'source_url',
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



}
