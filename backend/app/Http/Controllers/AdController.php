<?php

namespace App\Http\Controllers;

use App\Models\Ad;
use App\Models\Ads;
use App\Models\AdView;
use App\Models\AdSession;
use App\Models\Transaction;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdController extends Controller
{
    // Get random ads
    public function index() {
        $ads = Ads::inRandomOrder()->take(5)->get();
        return response()->json($ads);
    }

    // Direct ad view (simple)
    public function view(Request $request, $id) {
        $user = $request->user();
        $ad = Ad::findOrFail($id);

        // Add earning to user
        $user->increment('balance', $ad->reward);

        return response()->json([
            'success' => true,
            'message' => 'Ad viewed successfully. Reward added!',
            'reward' => $ad->reward,
        ]);
    }

    // Create ad session for timer-based viewing
    public function createSession(Request $req, Ad $ad) {
        $user = $req->user();

        $session = AdSession::create([
            'ad_id' => $ad->id,
            'user_id' => $user->id,
            'session_token' => Str::random(48),
            'required_seconds' => $ad->min_view_seconds,
            'created_at' => now()
        ]);

        return response()->json([
            'session_token' => $session->session_token,
            'required_seconds' => $session->required_seconds,
        ]);
    }

    // Complete ad view and reward
    public function completeView(Request $req) {
        $req->validate([
            'session_token' => 'required|string',
            'view_seconds' => 'required|integer|min:1'
        ]);

        $session = AdSession::where('session_token', $req->session_token)
                            ->where('credited', false)
                            ->firstOrFail();

        // Validate session expiry
        if ($session->created_at->diffInMinutes(now()) > 5) {
            return response()->json(['error' => 'Session expired'], 403);
        }

        if ($req->view_seconds < $session->required_seconds) {
            return response()->json(['error' => 'Not enough view time'], 422);
        }

        // Daily cap check
        $todayCount = AdView::where('user_id', $req->user()->id)
                            ->whereDate('created_at', now())
                            ->count();
        if ($todayCount >= 500) {
            return response()->json(['error' => 'Daily cap reached'], 429);
        }

        DB::transaction(function() use ($session, $req) {
            $ad = $session->ad;
            $user = $req->user();

            $amount = $ad->payout_per_view;
            $user->balance += $amount;
            $user->total_earned += $amount;
            $user->save();

            AdView::create([
                'ad_session_id' => $session->id,
                'ad_id' => $ad->id,
                'user_id' => $user->id,
                'amount' => $amount,
                'ip' => $req->ip(),
                'user_agent' => $req->header('User-Agent'),
            ]);

            Transaction::create([
                'user_id' => $user->id,
                'type' => 'credit',
                'amount' => $amount,
                'description' => "Ad view reward for ad #{$ad->id}"
            ]);

            $session->credited = true;
            $session->credited_at = now();
            $session->save();
        });

        return response()->json([
            'success' => true,
            'amount' => $session->ad->payout_per_view
        ]);
    }
}
