<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = [
        'name_fr',
        'name_ar',
    ];

    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
