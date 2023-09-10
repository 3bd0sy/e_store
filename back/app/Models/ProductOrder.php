<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class ProductOrder extends Model
{
    use HasFactory;

    protected $table = 'products_orders';

    protected $with = ['product_object'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'product',
        'order',
        'qty',
    ];

    /**
     * get product object
     */
    public function product_object(): HasOne
    {
        return $this->hasOne(Product::class, 'id', 'product');
    }
}
