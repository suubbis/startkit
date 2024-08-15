<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'first_name' => 'Admin',
            'last_name' => 'User',
            'email' => 'admin@example.com',
            'phone_number' => '1234567890',
            'address' => '123 Admin St, Admin City, Admin Country',
            'username' => 'admin',
            'password' => Hash::make('password'),
            'role_id' => 1, // Admin
        ]);
    }
}
