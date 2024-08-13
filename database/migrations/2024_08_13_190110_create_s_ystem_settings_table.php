<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('system_settings', function (Blueprint $table) {
            $table->id();
            $table->string('date_format');
            $table->string('number_format');
            $table->string('time_format');
            $table->string('list_table_format');
            $table->string('id_format');
            $table->string('default_currency');
            $table->string('currency_name');
            $table->string('currency_symbol');
            $table->string('usage_format');
            $table->string('backup_schedule');
            $table->string('session_expiry');
            $table->string('min_password_score');
            $table->integer('allow_consecutive_login_attempts');
            $table->string('allow_login_after_fail');
            $table->boolean('enable_two_factor_auth')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('system_settings');
    }
};
