<?php

namespace Database\Seeders;

use App\Models\CompanyDetail;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CompanyDetailSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        CompanyDetail::create([
            'name' => 'Example Company',
            'abbreviation' => 'EC',
            'address' => '123 Company St, Company City, Company Country',
            'manager_id' => 1, // Assuming 1 is  the ID of an existing user
            'phone' => '0987654321',
            'email' => 'info@example.com',
            'website' => 'https://www.example.com',
        ]);
    }
}
