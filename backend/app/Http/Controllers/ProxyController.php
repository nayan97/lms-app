<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ProxyController extends Controller
{
    public function loadSite(Request $request)
    {
        $url = $request->query('url');

        // ✅ Basic validation
        if (!$url || !filter_var($url, FILTER_VALIDATE_URL)) {
            return response('Invalid URL', 400);
        }

        try {
            $response = Http::get($url);
            $html = $response->body();

            // Get base URL for rewriting
            $parsed = parse_url($url);
            $base = $parsed['scheme'] . '://' . $parsed['host'];

            // ✅ Fix relative links for CSS, JS, images, iframes, etc.
            $patterns = [
                '/(src|href)=["\'](?!https?:\/\/|\/\/|data:|#)([^"\']+)["\']/i',
            ];
            $replacements = [
                '$1="' . $base . '/$2"',
            ];
            $html = preg_replace($patterns, $replacements, $html);

            // ✅ Optional: inject base tag for relative paths
            $html = preg_replace(
                '/<head[^>]*>/i',
                '<head><base href="' . $base . '/">',
                $html,
                1
            );

            // ✅ Return as HTML
            return response($html, 200)->header('Content-Type', 'text/html');
        } catch (\Exception $e) {
            return response('Failed to load site: ' . $e->getMessage(), 500);
        }
    }
}
