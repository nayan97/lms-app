<?php

namespace App\Models;

use App\Models\Subdistrict;
use Illuminate\Database\Eloquent\Model;

class District extends Model {
    protected $fillable = ['name'];

    public function subdistricts() {
        return $this->hasMany(Subdistrict::class);
    }
}
