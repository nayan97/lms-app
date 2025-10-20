<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Cart;
use App\Models\Product;

class CartController extends Controller
{
    // ✅ Get all cart items for logged-in user
public function index()
{
    if (Auth::check()) {
        $logid = Auth::id();

        $cartItems = Cart::with('product')
            ->where('user_id', $logid)
            ->get()
            ->map(function ($cart) {
              
                    $cart->image_url = $cart->photo
                        ? asset('storage/' . $cart->photo)
                        : null;
               
                return $cart;
            });

        return response()->json([
            'success' => true,
            'cartItems' => $cartItems,
        ]);
    }

    return response()->json([
        'success' => false,
        'message' => 'Unauthorized'
    ], 401);
}



// app/Http/Controllers/CartController.php

public function store(Request $request, $id)
{
    if (!Auth::check()) {
        return response()->json([
            'success' => false,
            'message' => 'Unauthorized'
        ], 401);
    }

    $request->validate([
        'qty' => 'required|integer|min:1',
    ]);

    $user = Auth::user();
    $product = Product::findOrFail($id);

    $cart = new Cart();
    $cart->name = $user->name;
    $cart->email = $user->email;
    $cart->cell = $user->cell ?? null;
    $cart->user_id = $user->id;
    $cart->product_title = $product->title;

    // ✅ ensure price is integer
    $unitPrice = (int) ($product->price ?? $product->price);
    $qty = (int) $request->qty;
    $cart->size =  $request->size;
     $cart->color =  $request->color;

    $cart->price = $unitPrice * $qty;  // total price as integer
    $cart->product_id = $product->id;
    $cart->photo = $product->image;
    $cart->product_qty = $qty; // ensure integer

    $cart->save();

    return response()->json([
        'success' => true,
        'message' => 'Product added to cart successfully',
        'cartItem' => $cart
    ]);
}


public function update(Request $request, $id)
{
    if (!Auth::check()) {
        return response()->json([
            'success' => false,
            'message' => 'Unauthorized'
        ], 401);
    }

    $request->validate([
        'qty' => 'required|integer|min:1',
    ]);

    $user = Auth::user();

    // Find the cart item by ID and ensure it belongs to the authenticated user
    $cart = Cart::where('id', $id)->where('user_id', $user->id)->firstOrFail();

    // Find the associated product
    $product = Product::findOrFail($cart->product_id);

    // Calculate updated price
    $unitPrice = (int) ($product->price ?? $product->price);
    $qty = (int) $request->qty;

    // Update fields
    $cart->product_qty = $qty;
    $cart->price = $unitPrice * $qty;

    $cart->save();

    return response()->json([
        'success' => true,
        'message' => 'Cart item updated successfully',
        'cartItem' => $cart
    ]);
}

public function destroy($id)
    {
        try {
            $cart = Cart::findOrFail($id);
            $cart->delete();

            return response()->json([
                'success' => true,
                'message' => 'Item removed from cart.'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Item not found or could not be removed.',
                'error' => $e->getMessage()
            ], 404);
        }
    }





}
