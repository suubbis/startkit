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
        Schema::create('access_controls', function (Blueprint $table) {
            $table->id();
            $table->foreignId('role_id')->constrained();
            $table->boolean('notification_enabled')->default(false);
            $table->boolean('schedule_monday')->default(false);
            $table->boolean('schedule_tuesday')->default(false);
            $table->boolean('schedule_wednesday')->default(false);
            $table->boolean('schedule_thursday')->default(false);
            $table->boolean('schedule_friday')->default(false);
            $table->boolean('schedule_saturday')->default(false);
            $table->boolean('schedule_sunday')->default(false);
            $table->time('start_time')->nullable();
            $table->time('end_time')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('access_controls');
    }
};
