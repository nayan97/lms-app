<?php

namespace App\Http\Controllers\Api;

use App\Models\Color;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AddColorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $colors = Color::latest()->paginate(10);

        return response()->json([
            'success' => true,
            'data' => $colors
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'   => 'required|string|max:255|unique:colors,name',
            'status' => 'required|in:0,1',
        ]);

        $color = Color::create([
            'name'   => $request->name,
            'status' => $request->status,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Color created successfully.',
            'data' => $color
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Color $color)
    {
        return response()->json([
            'success' => true,
            'data' => $color
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Color $color)
    {
        $request->validate([
            'name'   => 'required|string|max:255|unique:colors,name,' . $color->id,
            'status' => 'required|in:0,1',
        ]);

        $color->update($request->only('name', 'status'));

        return response()->json([
            'success' => true,
            'message' => 'Color updated successfully.',
            'data' => $color
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Color $color)
    {
        $color->delete();

        return response()->json([
            'success' => true,
            'message' => 'Color deleted successfully.'
        ]);
    }
}
