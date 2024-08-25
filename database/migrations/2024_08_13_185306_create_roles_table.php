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
        Schema::create('roles', function (Blueprint $table) {
            $table->id();
            $table->string('role_name');
            $table->string('session_control')->nullable();
            $table->string('redirect_url')->nullable();
            $table->enum('session_control', ['Default', '5 minutes', '10 minutes', '30 minutes', '1 hour', 'No expiry'])->default('Default');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('roles');
    }
};
