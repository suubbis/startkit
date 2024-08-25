<?php

namespace App\Http\Controllers;

use App\Http\Requests\RoleRequest;
use App\Models\Permission;
use App\Repository\Interfaces\RoleRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function __construct(private RoleRepositoryInterface $roleRepository)
    {
        //
    }

    /**
     * @return JsonResponse
     * Retrieve all roles
     */
    public function index(): \Illuminate\Http\JsonResponse
    {
        $roles = $this->roleRepository->all(['*'],['permissions']);
        return $this->jsonResponse($roles, 'Roles retrieved successfully.');
    }

    /**
     * @param RoleRequest $request
     * @return JsonResponse
     * Store a new role
     */
    public function store(RoleRequest $request): JsonResponse
    {
        $role = $this->roleRepository->create($request->validated());

        if ($request->has('permissions')) {
            $permissions = Permission::whereIn('id', $request->permissions)->select('id')->get();
            $role->permissions()->attach($permissions);
        }
        return $this->jsonResponse($role, 'Role created successfully.', 201);
    }

    /**
     * @param $id
     * @return JsonResponse
     * Retrieve a specific role
     */
    public function show($id): JsonResponse
    {
        $role = $this->roleRepository->findById($id,['*'],['permissions']);
        return $this->jsonResponse($role, 'Role retrieved successfully.');
    }

    /**
     * @param RoleRequest $request
     * @param $id
     * @return JsonResponse
     * Update a specific role
     */
    public function update(RoleRequest $request, $id): JsonResponse
    {
        $role = $this->roleRepository->update($id, $request->validated());
        if ($request->has('permissions')) {
            $permissions = Permission::whereIn('id', $request->permissions)->select('id')->get();
            $role->permissions()->sync($permissions);
        }
        return $this->jsonResponse($role, 'Role updated successfully.');
    }

    /**
     * @param $id
     * @return JsonResponse
     * Delete a specific role
     */
    public function destroy($id): JsonResponse
    {
        $this->roleRepository->deleteById($id);
        return $this->jsonResponse(null, 'Role deleted successfully.');
    }
}
