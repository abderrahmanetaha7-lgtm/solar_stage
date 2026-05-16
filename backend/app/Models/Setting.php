<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = [
        'store',
        'email',
        'phone',
        'city_ar',
        'city_fr',
        'address',
        'google_maps',
        'logo',
        'favicon',
        'description',
    ];
}