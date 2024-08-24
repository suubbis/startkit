<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AccessControl extends Model
{
    use HasFactory;

    protected $fillable = [
        'role_id',
        'schedule_monday',
        'schedule_tuesday',
        'schedule_wednesday',
        'schedule_thursday',
        'schedule_friday',
        'schedule_saturday',
        'schedule_sunday',
        'start_time',
        'end_time'
    ];

    protected function createdAt(): Attribute
    {
        return Attribute::make(
            get: fn (string $value) =>  Carbon::parse($value)->format('Y-m-d H:i'),
        );
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }
}
