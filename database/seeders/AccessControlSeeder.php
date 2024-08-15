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
        AccessControl::create([
            'user_id' => 1, // Assuming 1 is the ID for the first user
            'notification_enabled' => true,
            'schedule_monday' => true,
            'schedule_tuesday' => true,
            'schedule_wednesday' => true,
            'schedule_thursday' => true,
            'schedule_friday' => true,
            'schedule_saturday' => false,
            'schedule_sunday' => false,
            'start_time' => '09:00:00',
            'end_time' => '17:00:00',
        ]);
    }
}
