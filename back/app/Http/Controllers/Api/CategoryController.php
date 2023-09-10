<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Categories;
use App\Models\Order;
use App\Models\ProductOrder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CategoryController extends Controller
{

    public function getAllCategories()
    {
        $categories = Categories::all();

        return response()->json([
            'message' => 'Categories retrieved successfully',
            'categories' => $categories,
        ], 200);
    }


}


