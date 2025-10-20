<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\District;
use App\Models\Subdistrict;
use Illuminate\Http\Request;
use App\Models\CheckoutOrder;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class CheckoutController extends Controller
{
    // ✅ Get all districts
    public function getDistricts()
    {
        $districts = District::select('id', 'name', 'bn_name')->get();

        return response()->json([
            'status' => true,
            'districts' => $districts
        ]);
    }

    // ✅ Get subdistricts by district
    public function getSubdistricts($districtId)
    {
        $subdistricts = Subdistrict::where('district_id', $districtId)
            ->select('id', 'name', 'bn_name')->get();
        return response()->json([
            'status' => true,
            'subdistricts' => $subdistricts
        ]);
    }

    // ✅ (Optional) Checkout data with carts + districts
    public function checkoutData()
    {
        try {
            if (!Auth::check()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Unauthorized'
                ], 401);
            }

            $userId = Auth::id();
            $carts = Cart::with('product')->where('user_id', $userId)
            ->get()
              ->map(function ($cart) {
              
                    $cart->image_url = $cart->photo
                        ? asset('storage/' . $cart->photo)
                        : null;
               
                return $cart;
            });
            return response()->json([
                'status' => true,
                'carts' => $carts,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }

public function checkoutOrders(Request $request)
{
    if (!Auth::check()) {
        return response()->json([
            'status' => false,
            'message' => 'Unauthorized. Please login first.'
        ], 401);
    }

    $user = Auth::user();
    $cartItems = Cart::with('product')->where('user_id', $user->id)->get();

    if ($cartItems->isEmpty()) {
        return response()->json([
            'status' => false,
            'message' => 'Your cart is empty.'
        ], 400);
    }

    $validated = $request->validate([
        'customer_name'   => 'required|string|max:255',
        'customer_number' => 'required|string|max:20',
        'district_id'     => 'required|integer',
        'upazila_id'      => 'required|integer',
        'delivery_address'=> 'required|string',
        'reseller_sell_price' => 'required|numeric|min:0',
        'additional_instruction' => 'nullable|string',
    ]);

    foreach ($cartItems as $cart) {
        $product = $cart->product;

        if (!$product) {
            continue; // skip cart if product is missing
        }

        $order = new CheckoutOrder();

        // Customer info
        $order->customer_name   = $validated['customer_name'];
        $order->customer_number = $validated['customer_number'];
        $order->district_id     = $validated['district_id'];
        $order->upazila_id      = $validated['upazila_id'];
        $order->address =         $validated['delivery_address'];
        $order->additional_instruction = $request->additional_instruction;

        // User & Product
        $order->user_id    = $user->id;
        $order->product_id = $product->id;
        $order->quantity   = (int) $cart->product_qty;

        // Pricing logic
        $order->admin_price         = (int) ($product->admin_price ?? 0);
        $order->max_sell_price      = (int) ($product->max_sell_price ?? 0);
        $order->reseller_sell_price = (int) $validated['reseller_sell_price'];
        $order->reseller_profit     = $request->total_reseller_profit;

        $order->delivery_charge   = 0; 
        $order->total             = $request->reseller_sell_price + $order->delivery_charge;

        // Status
        $order->payment_status  = 'Cash On';
        $order->delivery_status = 'Pending';

        $order->save();

        // remove item from cart
        $cart->delete();
    }

    return response()->json([
        'status' => true,
        'message' => 'Your order has been submitted successfully!',
    ], 200);
}

        public function myOrders(Request $request)
        {
            $user = $request->user();

            $orders = CheckoutOrder::with('product:id,title,image')
                ->where('user_id', $user->id)
                ->latest()
                ->get()
                ->map(function ($order) {
                    // Add full product image URL
                    $order->product_image_url = $order->product && $order->product->image
                        ? asset('storage/' . $order->product->image)
                        : asset('images/default-product.jpg'); // fallback image if needed

                    return $order;
                });

            return response()->json($orders);
        }


    public function index()
    {
        $orders = CheckoutOrder::orderBy('id', 'desc')->get();

        return response()->json($orders);
    }

public function update(Request $request, $id)
{
    if (!Auth::check()) {
        return response()->json([
            'success' => false,
            'message' => 'Unauthorized'
        ], 401);
    }

    // Validate allowed ENUM values
    $request->validate([
        'delivery_status' => 'required|in:Pending,Processing,Delivered,Cancelled',
    ]);

    // Find the order
    $order = CheckoutOrder::findOrFail($id);

    // Update status
    $order->delivery_status = $request->delivery_status;
    $order->save();

    return response()->json([
        'success' => true,
        'message' => 'Order delivery status updated successfully',
        'order' => $order
    ]);
}

//   Route::put('/admin/checkout-orders/{id}', [CheckoutController::class, 'update']);


}
