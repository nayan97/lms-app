<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use ZipArchive;
use App\Models\Product;

class ProductImageController extends Controller
{
public function downloadAll($id)
{
    try {
        $product = \App\Models\Product::findOrFail($id);
        $images = json_decode($product->image_gal, true);

        if (!$images || count($images) === 0) {
            return response()->json(['message' => 'No images found'], 404);
        }

        $zip = new \ZipArchive;
        $zipFileName = 'product_' . $id . '_images.zip';
        $zipPath = storage_path('app/public/' . $zipFileName);

        if ($zip->open($zipPath, \ZipArchive::CREATE | \ZipArchive::OVERWRITE) === true) {
            foreach ($images as $image) {
                // Convert "/storage/products/gallery/img1.jpg" to "public/products/gallery/img1.jpg"
                $relativePath = str_replace('/storage/', 'public/', $image);

                // Check file exists
                if (\Storage::exists($relativePath)) {
                    // Add file to ZIP
                    $zip->addFile(storage_path('app/' . $relativePath), basename($image));
                } else {
                    \Log::warning("File not found: " . $relativePath);
                }
            }
            $zip->close();
        }

        return response()->download($zipPath)->deleteFileAfterSend(true);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'error' => $e->getMessage(),
            'line' => $e->getLine(),
        ], 500);
    }
}

}
