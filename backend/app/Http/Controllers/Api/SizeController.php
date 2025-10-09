<?php

namespace App\Http\Controllers\Api;

use App\Models\Size;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SizeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sizes = Size::latest()->get();

        return response()->json([
            'success' => true,
            'data' => $sizes
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'   => 'required|string|max:255|unique:sizes,name',
            'status' => 'required|in:0,1',
        ]);

        $size = Size::create([
            'name'   => $request->name,
            'status' => $request->status,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Size created successfully.',
            'data' => $size
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Size $size)
    {
        return response()->json([
            'success' => true,
            'data' => $size
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Size $size)
    {
        $request->validate([
            'name'   => 'required|string|max:255|unique:sizes,name,' . $size->id,
            'status' => 'required|in:0,1',
        ]);

        $size->update($request->only('name', 'status'));

        return response()->json([
            'success' => true,
            'message' => 'Size updated successfully.',
            'data' => $size
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Size $size)
    {
        $size->delete();

        return response()->json([
            'success' => true,
            'message' => 'Size deleted successfully.'
        ]);
    }
}
