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
        Schema::create('users', function (Blueprint $table) {
            Schema::create('users', function (Blueprint $table) {
                $table->id();
                $table->string('first_name');
                $table->string('last_name');
                $table->string('email')->unique();
                $table->string('phone_number');
                $table->text('address');
                $table->date('date_of_birth')->nullable();
                $table->foreignId('supervisor_id')->nullable()->constrained('users');
                $table->foreignId('role_id')->constrained();
                $table->boolean('view_journal_entry_info')->default(false);
                $table->string('username')->unique();
                $table->string('password');
                $table->timestamps();
            });
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
