<?php

namespace App\Models;

use App\Notifications\WelcomeEmail;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone_number',
        'address',
        'date_of_birth',
        'supervisor_id',
        'role_id',
        'view_journal_entry_info',
        'username',
        'password'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    protected static function booted()
    {
        static::created(function ($user) {
            $user->notify(new WelcomeEmail());
        });
    }

    protected function createdAt(): Attribute
    {
        return Attribute::make(
            get: fn (string $value) =>  Carbon::parse($value)->format('Y-m-d H:i'),
        );
    }

    public function role(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Role::class);

    }

    public function supervisor(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class, 'supervisor_id');

    }

    public function companyDetail(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(CompanyDetail::class, 'manager_id');
    }

    public function accessControl(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(AccessControl::class);
    }

    public function permissions(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Permission::class, 'role_id', 'role_id');
    }
}
