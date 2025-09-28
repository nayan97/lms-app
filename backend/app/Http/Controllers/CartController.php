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
            $cartItems = Cart::where('user_id', $logid)->get();

            return response()->json([
                'success' => true,
                'cartItems' => $cartItems
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
        'qty' => 'required|integer|min:1'
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
    $unitPrice = (int) ($product->cross_price ?? $product->price);
    $qty = (int) $request->qty;

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



}
