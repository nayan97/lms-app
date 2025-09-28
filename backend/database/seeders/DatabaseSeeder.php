<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Database\Seeders\ProductsTableSeeder;
use Database\Seeders\DistrictsTableSeeder;
use Database\Seeders\DivisionsTableSeeder;
use Database\Seeders\SubdistrictTableSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Example user
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        // Call your custom seeders
        $this->call([
            DivisionsTableSeeder::class,
            DistrictsTableSeeder::class,
            SubdistrictTableSeeder::class,
            ProductsTableSeeder::class,
        ]);
    }
}

