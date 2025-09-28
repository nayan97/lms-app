<?php

namespace App\Http\Controllers;

use App\Models\Size;
use App\Models\Color;
use App\Models\Product;
use App\Models\Category;
use App\Http\Controllers\Controller;

class HomeController extends Controller
{
    public function index()
    {
        // Latest Products
        $latestpros = Product::where('status', '1')
            ->latest()
            ->take(12)
            ->get()
            ->map(function ($product) {
                $product->image_url = $product->image 
                    ? asset('storage/' . $product->image) 
                    : null;
                return $product;
            });

        // Popular Products (featured first, then latest)
        $popularProducts = Product::where('status', '1')
            ->where(function ($query) {
                $query->where('is_featured', '1')
                      ->orWhereNotNull('id');
            })
            ->orderBy('is_featured', 'desc')
            ->latest()
            ->take(4)
            ->get()
            ->map(function ($product) {
                $product->image_url = $product->image 
                    ? asset('storage/' . $product->image) 
                    : null;
                return $product;
            });

        // All categories
        $cats = Category::all();

        return response()->json([
            'success' => true,
            'latestpros' => $latestpros,
            'popularProducts' => $popularProducts,
            'categories' => $cats,
        ]);
    }

public function productDetails($id)
{
    // Find product with category
    $product = Product::with('category')->findOrFail($id);

    // ✅ Main Image
    $product->image_url = $product->image 
        ? asset('storage/' . $product->image) 
        : null;

    // ✅ Gallery (supports JSON or comma-separated string)
    $gallery = $product->image_gal;

    if (is_string($gallery)) {
        // Try to decode JSON first
        $decoded = json_decode($gallery, true);
        if (json_last_error() === JSON_ERROR_NONE) {
            $gallery = $decoded;
        } else {
            // If not JSON, assume comma-separated string
            $gallery = explode(',', $gallery);
        }
    }

    $product->image_gal = collect($gallery ?? [])->filter()->map(fn($img) =>
        $img ? asset('storage/' . ltrim($img)) : null
    )->values();

    // ✅ Sizes (IDs → names)
    $sizes = $product->sizes;
    if (is_string($sizes)) {
        $sizes = json_decode($sizes, true);
    }
    $sizeNames = Size::whereIn('id', $sizes ?? [])->pluck('name');

    // ✅ Colors (IDs → names)
    $colors = $product->colors;
    if (is_string($colors)) {
        $colors = json_decode($colors, true);
    }
    $colorNames = Color::whereIn('id', $colors ?? [])->pluck('name');

    // ✅ Related products
    $reproducts = Product::where('category_id', $product->category_id)
        ->where('id', '!=', $id)
        ->take(4)
        ->get()
        ->map(function ($related) {
            $related->image_url = $related->image 
                ? asset('storage/' . $related->image) 
                : null;
            return $related;
        });

    // ✅ Final response
    return response()->json([
        'success' => true,
        'data' => [
            'product'           => $product,
            'sizes'             => $sizeNames,
            'colors'            => $colorNames,
            'related_products'  => $reproducts,
        ]
    ]);
}



}
