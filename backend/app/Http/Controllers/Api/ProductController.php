<?php

namespace App\Http\Controllers\Api;

use App\Models\Size;
use App\Models\Color;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::latest()->get();
        $categories = Category::all();
        $colors = Color::all();
        $sizes = Size::all();

        return response()->json([
            'success' => true,
            'data' => [
                'products' => $products,
                'categories' => $categories,
                'colors' => $colors,
                'sizes' => $sizes,
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'sizes' => 'nullable|array',
            'sizes.*' => 'string',
            'colors' => 'nullable|array',
            'colors.*' => 'string',
            'category_id' => 'required|exists:categories,id',
            'price' => 'required|numeric',
            'source_price' => 'nullable|numeric',
            'source_url' => 'nullable|url',
            'cross_price' => 'nullable|numeric',
            'profit' => 'nullable|numeric',
            'status' => 'required|boolean',
            'is_featured' => 'required|in:yes,no',
            'image' => 'required|image|max:2048',
            'image_gallery.*' => 'image|max:2048',
        ]);

        $data = $request->only([
            'title', 'description', 'category_id', 'price', 'source_price',
            'source_url', 'cross_price', 'profit', 'status', 'is_featured'
        ]);

        $data['user_id'] = auth()->id();
        $data['sizes'] = $request->sizes ?? [];
        $data['colors'] = $request->colors ?? [];

        if (empty($data['profit']) && isset($data['price']) && isset($data['source_price'])) {
            $data['profit'] = $data['price'] - $data['source_price'];
        }

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('products', 'public');
        }

        if ($request->hasFile('image_gallery')) {
            $galleryPaths = [];
            foreach ($request->file('image_gallery') as $index => $file) {
                $filename = uniqid() . '_' . time() . '_' . $index . '.' . $file->getClientOriginalExtension();
                $path = $file->storeAs('products/gallery', $filename, 'public');
                $galleryPaths[] = $path;
            }
            $data['image_gal'] = $galleryPaths;
        }

        $product = Product::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Product created successfully!',
            'data' => $product,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $product = Product::findOrFail($id);
        return response()->json([
            'success' => true,
            'data' => $product
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required',
            'category_id' => 'required|exists:categories,id',
            'price' => 'required|numeric',
            'source_price' => 'nullable|numeric',
            'source_url' => 'nullable|url',
            'cross_price' => 'nullable|numeric',
            'profit' => 'nullable|numeric',
            'status' => 'required|boolean',
            'is_featured' => 'required|in:yes,no',
            'image' => 'nullable|image|max:2048',
            'image_gallery.*' => 'nullable|image|max:2048',
        ]);

        $product = Product::findOrFail($id);

        $data = $request->only([
            'title', 'category_id', 'price', 'source_price', 'source_url',
            'cross_price', 'profit', 'status', 'is_featured'
        ]);

        if (!isset($data['profit']) && isset($data['price']) && isset($data['source_price'])) {
            $data['profit'] = $data['price'] - $data['source_price'];
        }

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('products', 'public');
        }

        if ($request->hasFile('image_gallery')) {
            $existingGallery = $product->image_gal ? json_decode($product->image_gal, true) : [];
            foreach ($request->file('image_gallery') as $file) {
                $filename = uniqid() . '_' . time() . '.' . $file->getClientOriginalExtension();
                $path = $file->storeAs('products/gallery', $filename, 'public');
                $existingGallery[] = $path;
            }
            $data['image_gal'] = json_encode(array_values($existingGallery));
        }

        $product->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Product updated successfully!',
            'data' => $product,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return response()->json([
            'success' => true,
            'message' => 'Product deleted successfully!',
        ]);
    }
}
