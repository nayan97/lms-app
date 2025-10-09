<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class AdSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('ads')->insert([
            [
                'title' => 'OlympTrade – Trade Smarter',
                'icon' => 'https://www.youtube.com/watch?v=P2QWGA6QTak',
                'landing_url' => 'https://olymptrade.com/',
                'payout_per_view' => 0.0100,
                'min_view_seconds' => 10,
                'active' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'title' => 'Binomo – Global Trading App',
                'icon' => 'https://i.imgur.com/Skz0bEY.png',
                'landing_url' => 'https://binomo.com/',
                'payout_per_view' => 0.0085,
                'min_view_seconds' => 15,
                'active' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'title' => 'Shopee – Online Shopping Deals',
                'icon' => 'https://www.youtube.com/watch?v=P2QWGA6QTak',
                'landing_url' => 'https://shopee.com/',
                'payout_per_view' => 0.0060,
                'min_view_seconds' => 12,
                'active' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'title' => 'Amazon – Shop Everything Online',
                'icon' => 'https://i.imgur.com/ZwJxBmi.png',
                'landing_url' => 'https://amazon.com/',
                'payout_per_view' => 0.0050,
                'min_view_seconds' => 10,
                'active' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'title' => 'Revolut – Mobile Banking & Crypto',
                'icon' => 'https://i.imgur.com/VG2EYAs.png',
                'landing_url' => 'https://revolut.com/',
                'payout_per_view' => 0.0120,
                'min_view_seconds' => 20,
                'active' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}
