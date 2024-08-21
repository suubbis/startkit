<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = Role::all();

        foreach ($roles as $role) {
            Permission::create(['role_id' => $role->id, 'permission_name' => 'View Dashboard']);
            Permission::create(['role_id' => $role->id, 'permission_name' => 'Manage Users']);
        }
    }
}
