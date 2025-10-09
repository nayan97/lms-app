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
        'title'         => 'required|string|max:255',
        'description'   => 'nullable|string',
        'sizes'         => 'nullable|array',
        'sizes.*'       => 'string',
        'colors'        => 'nullable|array',
        'colors.*'      => 'string',
        'category_id'   => 'required|exists:categories,id',
        'price'         => 'required|numeric',
        'source_price'  => 'nullable|numeric',
        'source_url'    => 'nullable|string',
        'cross_price'   => 'nullable|numeric',
        'max_price'     => 'nullable|numeric',
        'profit'        => 'nullable|numeric',
        'status'        => 'required|in:0,1', // since frontend sends "0" or "1"
        'is_featured'   => 'required|in:yes,no',
         'image'           => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
         'image_gal'   => 'nullable|array',
    'image_gal.*' => 'image|mimes:jpeg,png,jpg,gif,webp|max:2048',
    ]);

    $data = $request->only([
        'title', 'description', 'category_id', 'price', 'source_price',
        'source_url', 'cross_price', 'profit', 'max_price', 'status',
        'is_featured', 'image', 'image_gal'
    ]);

     $data['user_id'] = auth()->id();
     $data['sizes'] = $request->input('sizeIds', []);
     $data['colors'] = $request->input('colorIds', []);

    // Auto calculate profit if not provided
    if (empty($data['profit']) && isset($data['price']) && isset($data['source_price'])) {
        $data['profit'] = $data['price'] - $data['source_price'];
    }

 // Handle main image
if ($request->hasFile('image')) {
    $data['image'] = $request->file('image')->store('products', 'public');
}

// Handle gallery
$galleryPaths = [];
if ($request->hasFile('image_gal')) {
    foreach ($request->file('image_gal') as $file) {
        $galleryPaths[] = $file->store('products/gallery', 'public');
    }
}
$data['image_gal'] = $galleryPaths;

    $product = Product::create($data);

    return response()->json([
        'success' => true,
        'message' => 'Product created successfully!',
        'data'    => $product,
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
    $product = Product::findOrFail($id);

    // 🛠️ Step 1: Filter URLs and Files before validation
    if ($request->has('image_gal')) {
        $files = [];
        $urls = [];

        foreach ($request->image_gal as $item) {
            if (is_string($item) && str_starts_with($item, 'http')) {
                $urls[] = $item; // Existing URL
            } else {
                $files[] = $item; // Uploaded file
            }
        }

        // Replace request data for validation
        $request->merge([
            'image_gal' => $files,
            'existing_images' => $urls,
        ]);
    }

    // Step 2: Validate request
    $request->validate([
        'title'         => 'required|string|max:255',
        'description'   => 'nullable|string',
        'sizes'         => 'nullable|array',
        'sizes.*'       => 'string',
        'colors'        => 'nullable|array',
        'colors.*'      => 'string',
        'category_id'   => 'required|exists:categories,id',
        'price'         => 'required|numeric',
        'source_price'  => 'nullable|numeric',
        'source_url'    => 'nullable|string',
        'cross_price'   => 'nullable|numeric',
        'max_price'     => 'nullable|numeric',
        'profit'        => 'nullable|numeric',
        'status'        => 'required|in:0,1',
        'is_featured'   => 'required|in:yes,no',
        'image'         => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        'image_gal'     => 'nullable|array',
        'image_gal.*'   => 'image|mimes:jpeg,png,jpg,gif,webp|max:2048',
    ]);

    // Step 3: Collect basic data
    $data = $request->only([
        'title', 'description', 'category_id', 'price', 'source_price',
        'source_url', 'cross_price', 'profit', 'max_price', 'status',
        'is_featured', 'image', 'image_gal'
    ]);

    $data['user_id'] = auth()->id();
    $data['sizes'] = $request->input('sizeIds', []);
    $data['colors'] = $request->input('colorIds', []);

    // Auto calculate profit if not provided
    if (empty($data['profit']) && isset($data['price']) && isset($data['source_price'])) {
        $data['profit'] = $data['price'] - $data['source_price'];
    }

    // Step 4: Handle main image
    if ($request->hasFile('image')) {
        if ($product->image && \Storage::disk('public')->exists($product->image)) {
            \Storage::disk('public')->delete($product->image);
        }
        $data['image'] = $request->file('image')->store('products', 'public');
    }

    // Step 5: Handle gallery images (URLs + new uploads)
    $galleryPaths = $request->existing_images ?? [];

    if ($request->hasFile('image_gal')) {
        foreach ($request->file('image_gal') as $file) {
            $galleryPaths[] = $file->store('products/gallery', 'public');
        }
    }

    $data['image_gal'] = $galleryPaths;

    // Step 6: Update product
    $product->update($data);

    return response()->json([
        'success' => true,
        'message' => 'Product updated successfully!',
        'data'    => $product,
    ], 200);
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
