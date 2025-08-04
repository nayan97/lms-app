<?php

namespace App\Http\Controllers\front;

use App\Models\Level;
use App\Models\Courses;
use App\Models\Category;
use App\Models\Language;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class CourseController extends Controller
{

            // this method for course all dropdown
        public function metaData(){
            $categories = Category::all();
            $languages = Language::all();
            $levels = Level::all();

            return response()->json([
                'status' => 200,
                'categories' =>  $categories,
                'languages' =>  $languages,
                'levels' =>  $levels,
            ], 200);
        }




    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|min:5'
        ]);
          if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ], 400);
        }

        $course = new Courses();
        $course->title = $request->title;
        $course->status = 0;
        $course->user_id = $request->user()->id;
        $course->save();

            // Return success response
        return response()->json([
            'status' => 200,
            'data' => $course,
            'message' => 'Course has been created successfully',
        ],200);
    }


    

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $course = Courses::find($id);

           if ($course == null){
            return response()->json([
                    'status' => 404,
                     'message' => 'Course not found',
            ],404);
        }

         return response()->json([
            'status' => 200,
            'data' => $course,
        ],200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
           $course = Courses::find($id);

           if ($course == null){
            return response()->json([
                    'status' => 404,
                     'message' => 'Course not found',
            ],404);
        }


            $validator = Validator::make($request->all(), [
                'title' => 'required|string|min:5|max:255',
                'category_id' => 'nullable|exists:categories,id',
                'level_id' => 'nullable|exists:levels,id',
                'language_id' => 'nullable|exists:languages,id',
                'description' => 'nullable|string|max:1000',
                'price' => 'required|numeric|min:0',
                'cross_price' => 'nullable|numeric|min:0',
                'image' => 'nullable|url',  // Or use 'url' if it's a URL
            ]);

          if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ], 400);
        }

    
            $course->title = $request->title;
            $course->category_id = $request->category_id;
            $course->level_id = $request->level_id;
            $course->language_id = $request->language_id;
            $course->description = $request->description;
            $course->price = $request->price;
            $course->cross_price = $request->cross_price;
            $course->image = $request->image;

            $course->save();


            // Return success response
        return response()->json([
            'status' => 200,
            'data' => $course,
            'message' => 'Course has been updated successfully',
        ],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
