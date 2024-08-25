<?php

namespace Database\Seeders;

use App\Models\SystemSetting;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SystemSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        SystemSetting::create([
            'date_format' => 'YYYY-MM-DD',
            'number_format' => '##.##',
            'time_format' => 'HH:MM',
            'list_table_format' => 'Ascending',
            'id_format' => 'Regular ID',
            'default_currency' => 'USD',
            'currency_name' => 'Dollar',
            'currency_symbol' => '$',
            'usage_format' => 'Currency Symbol',
            'backup_schedule' => 'Daily',
            'session_expiry' => '30 minutes',
            'min_password_score' => 'Strong',
            'allow_consecutive_login_attempts' => 5,
            'allow_login_after_fail' => '10 minutes',
            'enable_two_factor_auth' => false,
        ]);
    }
}
