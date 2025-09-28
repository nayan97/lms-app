<?php

namespace App\Http\Controllers\Api;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Models\ProductDetail;
use App\Http\Controllers\Controller;

class ProductDetailController extends Controller
{
   public function index()
{
    $products = Product::latest()->get();
    $categories = Category::all();

    return response()->json([
        'products' => $products,
        'categories' => $categories,
    ]);
}


    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id'    => 'required|exists:users,id',
            'product_id' => 'required|exists:products,id',
            'description'=> 'nullable|string',
        ]);

        $review = ProductDetail::create($validated);

        return response()->json([
            'message' => 'Review added successfully',
            'review'  => $review
        ], 201);
    }
}
