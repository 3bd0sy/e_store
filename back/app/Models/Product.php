<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class Product extends Model
{
    use HasFactory;
    // /**
    //  * Get all of the orders that are assigned this product.
    //  */
    protected $guarded = ['id'];

    public function category()
    {
        return $this->belongsTo(Categories::class);
    }
}
