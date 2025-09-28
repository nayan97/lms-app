<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\District;
use App\Models\Subdistrict;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class CheckoutController extends Controller
{
    // ✅ Get all districts
    public function getDistricts()
    {
        $districts = District::select('id', 'name')->get();

        return response()->json([
            'status' => true,
            'districts' => $districts
        ]);
    }

    // ✅ Get subdistricts by district
    public function getSubdistricts($districtId)
    {
        $subdistricts = Subdistrict::where('district_id', $districtId)
            ->select('id', 'name')
            ->get();

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
        $carts = Cart::with('product')->where('user_id', $userId)->get();

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

}
