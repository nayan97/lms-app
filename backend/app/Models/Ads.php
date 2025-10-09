<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Ads extends Model
{
        use HasFactory;

    protected $fillable = [
        'title',
        'icon',
        'landing_url',
        'payout_per_view',
        'min_view_seconds',
        'active',
    ];
}
