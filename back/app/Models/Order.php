<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class Order extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'total',
        'date',
    ];

    /**
     * Get the products of the order
     */
    public function products(): HasMany
    {
        return $this->hasMany(ProductOrder::class, 'order', 'id')->with('product');
    }

    // /**
    //  * Get all of the products for the order.
    //  */
    // public function products(): MorphToMany
    // {
    //     return $this->morphToMany(Product::class, 'products');
    // }
}
