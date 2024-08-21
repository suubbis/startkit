<?php

namespace App\Http\Controllers;

use App\Http\Requests\PermissionRequest;
use App\Repository\Interfaces\PermissionRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PermissionController extends Controller
{
    public function __construct(private PermissionRepositoryInterface $permissionRepository)
    {
        //
    }

    /**
     * @return JsonResponse
     * Retrieve all permissions
     */
    public function index(): \Illuminate\Http\JsonResponse
    {
        $permissions = $this->permissionRepository->all();
        return $this->jsonResponse($permissions, 'Permissions retrieved successfully.');
    }

    /**
     * @param PermissionRequest $request
     * @return JsonResponse
     * Store a new permission
     */
    public function store(PermissionRequest $request): JsonResponse
    {
        $permission = $this->permissionRepository->create($request->validated());
        return $this->jsonResponse($permission, 'Permission created successfully.', 201);
    }

    /**
     * @param $id
     * @return JsonResponse
     * Retrieve a specific permission
     */
    public function show($id): JsonResponse
    {
        $permission = $this->permissionRepository->findById($id);
        return $this->jsonResponse($permission, 'Permission retrieved successfully.');
    }

    /**
     * @param PermissionRequest $request
     * @param $id
     * @return JsonResponse
     * Update a specific permission
     */
    public function update(PermissionRequest $request, $id): JsonResponse
    {
        $permission = $this->permissionRepository->update($request->validated(), $id);
        return $this->jsonResponse($permission, 'Permission updated successfully.');
    }

    /**
     * @param $id
     * @return JsonResponse
     * Delete a specific permission
     */
    public function destroy($id): JsonResponse
    {
        $this->permissionRepository->deleteById($id);
        return $this->jsonResponse(null, 'Permission deleted successfully.');
    }
}
