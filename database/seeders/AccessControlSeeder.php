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
            'role_id' => 1, // Assuming 1 is the ID for the role Admin
            'notification_enabled' => true,
            'schedule_monday' => true,
            'schedule_tuesday' => true,
            'schedule_wednesday' => true,
            'schedule_thursday' => true,
            'schedule_friday' => true,
            'schedule_saturday' => true,
            'schedule_sunday' => true,
            'start_time' => '00:00:00',
            'end_time' => '24:00:00',
        ]);
    }
}
