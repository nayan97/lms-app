<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Wishlist extends Model
{
      use HasFactory;

    // The attributes that are mass assignable.
    protected $fillable = [
        'user_id',
        'product_id',
    ];

    /**
     * Get the user that owns the wishlist item.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the product associated with the wishlist item.
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
