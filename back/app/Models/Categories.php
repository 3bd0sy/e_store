<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Categories extends Model
{
    protected $fillable = ['name'];

    public function products()
    {
        return $this->hasMany(Product::class,'cat_id');
    }
}
