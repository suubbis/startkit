<?php

namespace Database\Seeders;

use App\Models\AccessControl;
use Illuminate\Database\Seeder;

class AccessControlSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        AccessControl::factory()->count(10)->create();
    }
}
