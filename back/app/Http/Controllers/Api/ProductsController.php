<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Categories;
use App\Models\Order;
use App\Models\Product;
use App\Models\ProductOrder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductsController extends Controller
{

    public function GetProducts(): JsonResponse
    {
        $proudcts = Product::all();
        return response()->json([
            'message' => 'products has been retreived successfully',
            'products' => $proudcts,
        ], 200);
    }

    /**
     * Request:
     * auth request
     * @param products list with qty
     */
    public function CreateOrder(Request $request): JsonResponse
    {

        if (empty($request->products)) {
            return response()->json(
                [
                    'message' => 'products is not exists!',
                ],
                400
            );
        }

        // create order
        $order = Order::create([
            'user_id' => $request->user()->id,
            'total' => 0,
            'date' => date('Y-m-d H:i:s'),
        ]);

        // adding order products to database
        $total = 0;
        $requestProducts = $request->products;
        foreach ($requestProducts as $rProduct) {

            $dbProductOrder = ProductOrder::where('order', $order->id)
                ->where('product', $rProduct['id'])
                ->first();

            if ($dbProductOrder) {
                $newQty = $dbProductOrder->qty + $rProduct['qty'];
                $dbProductOrder->update(['qty' => $newQty]);
            } else {
                $dbProduct = Product::find($rProduct['id']);
                if (!$dbProduct) {
                    return response()->json(
                        [
                            'message' => "Product " . $rProduct['id'] . " does not exist!",
                        ],
                        400
                    );
                }

                ProductOrder::create([
                    'product' => $rProduct['id'],
                    'qty' => $rProduct['qty'],
                    'order' => $order->id,
                ]);

                $dbProductOrder = ProductOrder::firstOrCreate([
                     'product' => $rProduct['id'],
                      'order' => $order->id,
                     ]);
                    $dbProductOrder->qty += $rProduct['qty'];
                    $dbProductOrder->save();


            }
            $total += $dbProduct->price * $rProduct['qty'];
        }
        $order->total = $total;
        $order->save();
        return response()->json([
            'message' => 'Order has been created/updated successfully',
            'order' => $order,
        ], 200);
    }

    /**
     * Get Orders for specific user
     *
     */
    public function GetOrders(Request $request): JsonResponse
    {
        $products = ProductOrder::where('id', '>=', 0)
            ->with('product_object')->get();
        return response()->json([
            'message' => 'Orders has been retrived successfully',
            'order' => $products,
        ], 200);
        // var_dump($products);
        // die;
        $orders = Order::where('user_id', $request->user()->id)
            ->with('products')->get();
        // var_dump($orders[0]->products);
        // die;
        return response()->json([
            'message' => 'Orders has been retrived successfully',
            'order' => $orders,
        ], 200);
    }
    public function updateProductQuantity(Request $request, $order_id, $product_id): JsonResponse
    {
        // Validate the request data, e.g., ensure the new quantity is valid.
        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        // Find the order and product
        $order = Order::findOrFail($order_id);
        $product = Product::findOrFail($product_id);

        // Check if the product is part of the order
        $productOrder = ProductOrder::where('order', $order_id)->where('product', $product_id)->first();

        if (!$productOrder) {
            return response()->json(['message' => 'Product not found in order'], 404);
        }

        // Update the product's quantity
        $productOrder->qty = $request->input('quantity');
        $productOrder->save();

        // Update the order's total
        $order->total = $this->calculateOrderTotal($order_id);
        $order->save();

        return response()->json(['message' => 'Product quantity updated successfully']);
    }

// Helper function to calculate the order total
    private function calculateOrderTotal($order_id)
    {
        $productOrders = ProductOrder::where('order', $order_id)->get();
        $total = 0;

        foreach ($productOrders as $productOrder) {
            $total += $productOrder->product_object->price * $productOrder->qty;
        }

        return $total;
    }


    public function deleteProduct(Request $request, $order_id, $product_id): JsonResponse
    {
        // Find the order and product
        $order = Order::findOrFail($order_id);
        $product = Product::findOrFail($product_id);

        // Check if the product is part of the order
        $productOrder = ProductOrder::where('order', $order_id)->where('product', $product_id)->first();

        if (!$productOrder) {
            return response()->json(['message' => 'Product quantity updated successfully']);
        }

        // Remove the product from the order
        $productOrder->delete();

        // Update the order's total
        $order->total = $this->calculateOrderTotal($order_id);
        $order->save();

        return response()->json(['message' => 'Product deleted from the order']);
    }
    public function getProductsByCategory($categoryId)
    {
        $category = Categories::find($categoryId);

        if (!$category) {
            return response()->json([
                'message' => 'Category not found',
            ], 404);
        }

        $products = $category->products;

        return response()->json([
            'message' => 'Products retrieved successfully',
            'products' => $products,
        ], 200);
    }
    // for search in Products
    public function searchProducts(Request $request)
    {
        $query = Product::query();

        if ($request->has('name')) {
            $query->where('name', 'like', '%' . $request->input('name') . '%');
        }

        if ($request->has('desc')) {
            $query->where('description', 'like', '%' . $request->input('desc') . '%');
        }

        if ($request->has('category')) {
            $query->whereHas('category', function ($query) use ($request) {
                $query->where('name', 'like', '%' . $request->input('category') . '%');
            });
        }

        $products = $query->get();

        return response()->json([
            'message' => 'Products retrieved successfully',
            'products' => $products,
        ], 200);
    }


}
