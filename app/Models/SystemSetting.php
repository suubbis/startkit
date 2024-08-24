<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SystemSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'date_format',
        'number_format',
        'time_format',
        'list_table_format',
        'id_format',
        'default_currency',
        'currency_name',
        'currency_symbol',
        'usage_format',
        'backup_schedule',
        'session_expiry',
        'min_password_score',
        'allow_consecutive_login_attempts',
        'allow_login_after_fail',
        'enable_two_factor_auth',
    ];

    protected function createdAt(): Attribute
    {
        return Attribute::make(
            get: fn (string $value) =>  Carbon::parse($value)->format('Y-m-d H:i'),
        );
    }
}
