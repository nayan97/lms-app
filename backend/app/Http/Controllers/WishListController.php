<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use App\Models\Wishlist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class WishListController extends Controller
{
    // ✅ Show all wishlist items
    public function showWishList()
    {
        if (!Auth::check()) {
            return response()->json([
                'status' => false,
                'message' => 'Unauthorized. Please login first.',
            ], 401);
        }

        $userId = Auth::id();
        $wishlistItems = Wishlist::where('user_id', $userId)
                                ->with('product')
                                ->get()
                                ->map(function ($cart) {
                                
                                        $cart->image_url = $cart->photo
                                            ? asset('storage/' . $cart->photo)
                                            : null;
                                
                                    return $cart;
                                });


        return response()->json([
            'status' => true,
            'wishlist' => $wishlistItems,
        ], 200);
    }

    // ✅ Add product to wishlist
    public function addToWishList(Request $request, $id)
    {
        if (!Auth::check()) {
            return response()->json([
                'status' => false,
                'message' => 'Unauthorized. Please login first.',
            ], 401);
        }

        // ✅ Validate request before processing further
        $request->validate([
            'qty' => 'required|integer|min:1',
     
        ]);

        $user = Auth::user();
        $product = Product::find($id);

        if (!$product) {
            return response()->json([
                'status' => false,
                'message' => 'Product not found.',
            ], 404);
        }

        // Check if product already in wishlist
        $existingWishlist = Wishlist::where('user_id', $user->id)
                                    ->where('product_id', $product->id)
                                    ->first();

        if ($existingWishlist) {
            return response()->json([
                'status' => false,
                'message' => 'Product already exists in your wishlist!',
            ], 409);
        }

        // Save wishlist
        $wishlist = new Wishlist();
        $wishlist->name = $user->name;
        $wishlist->email = $user->email;
        $wishlist->user_id = $user->id;
        $wishlist->product_title = $product->title;

        // ✅ ensure price is integer
        $unitPrice = (int) ($product->cross_price ?? $product->price);
        $qty = (int) $request->qty;
        $wishlist->size =  $request->size;
        $wishlist->color =  $request->color;

        $wishlist->price = $unitPrice * $qty;  // total price as integer
        $wishlist->product_id = $product->id;
        $wishlist->photo = $product->image;
        $wishlist->qty = $request->qty ?? 1; 
        $wishlist->save();

        return response()->json([
            'status' => true,
            'message' => 'Product added to wishlist successfully.',
            'wishlist' => $wishlist,
        ], 201);
    }


    // ✅ Remove wishlist item
    public function destroy($id)
    {
        if (!Auth::check()) {
            return response()->json([
                'status' => false,
                'message' => 'Unauthorized. Please login first.',
            ], 401);
        }

        $wishlistItem = Wishlist::find($id);

        if (!$wishlistItem) {
            return response()->json([
                'status' => false,
                'message' => 'Wishlist item not found.',
            ], 404);
        }

        $wishlistItem->delete();

        return response()->json([
            'status' => true,
            'message' => 'Item removed from wishlist.',
        ], 200);
    }

    // ✅ Move wishlist item to cart
    public function moveToCart(Request $request, $id)
    {
        if (!Auth::check()) {
            return response()->json([
                'status' => false,
                'message' => 'Unauthorized. Please login first.',
            ], 401);
        }

        $user = Auth::user();
        $wishlistItem = Wishlist::find($id);

        if (!$wishlistItem) {
            return response()->json([
                'status' => false,
                'message' => 'Wishlist item not found.',
            ], 404);
        }

        $product = Product::find($wishlistItem->product_id);

        if (!$product) {
            return response()->json([
                'status' => false,
                'message' => 'Product not found.',
            ], 404);
        }

        $cart = new Cart;
        $cart->name = $user->name;
        $cart->email = $user->email;
        $cart->user_id = $user->id;
        $cart->product_title = $product->title;

        if ($product->dis_price != null) {
            $cart->price = $product->dis_price * $wishlistItem->qty;
        } else {
            $cart->price = $product->price * $wishlistItem->qty;
        }

        $cart->product_id = $product->id;
        $cart->photo = $product->image;
        $cart->product_qty = $wishlistItem->qty;
        $cart->save();

        // Remove from wishlist
        $wishlistItem->delete();

        return response()->json([
            'status' => true,
            'message' => 'Product moved to cart successfully.',
            'cart' => $cart,
        ], 201);
    }
}
