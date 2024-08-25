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
        $permissions = [
            ['name' => 'New'],
            ['name' => 'Save'],
            ['name' => 'Submit'],
            ['name' => 'Update'],
            ['name' => 'View (Global)'],
            ['name' => 'View (Own)'],
            ['name' => 'Cancel'],
            ['name' => 'Delete'],
            ['name' => 'Print'],
        ];

        foreach ($permissions as $permission) {
            Permission::create($permission);
        }

        $role = Role::where('role_name', 'Admin')->first();
        $role->permissions()->sync(Permission::all());
    }
}
