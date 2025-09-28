<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;

class Subdistrict extends Model
{    
    protected $fillable = [
        'district_id',
        'name',
        'bn_name',
    ];
        public function district() {
        return $this->belongsTo(District::class);
    }
}




