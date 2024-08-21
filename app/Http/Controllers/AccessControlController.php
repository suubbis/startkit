<?php

namespace App\Http\Controllers;

use App\Repository\Interfaces\AccessControlRepositoryInterface;
use Illuminate\Http\Client\Request;
use Illuminate\Http\JsonResponse;

class AccessControlController extends Controller
{
    public function __construct(private AccessControlRepositoryInterface $accessControlRepository)
    {
        //
    }

    /**
     * @return JsonResponse
     * Retrieve all access control
     */
    public function index(): \Illuminate\Http\JsonResponse
    {
        return $this->jsonResponse([], 'Access retrieved successfully.');
    }

    /**
     * @param Request $request
     * @return JsonResponse
     * Store a new access control
     */
    public function store(Request $request): JsonResponse
    {
        return $this->jsonResponse([], 'Access created successfully.', 201);
    }

    /**
     * @param $id
     * @return JsonResponse
     * Retrieve a specific access control
     */
    public function show($id): JsonResponse
    {
        return $this->jsonResponse([], 'Access retrieved successfully.');
    }

    /**
     * @param Request $request
     * @param $id
     * @return JsonResponse
     * Update a specific access control
     */
    public function update(Request $request, $id): JsonResponse
    {
        return $this->jsonResponse([], 'Access updated successfully.');
    }

    /**
     * @param $id
     * @return JsonResponse
     * Delete a specific access control
     */
    public function destroy($id): JsonResponse
    {
        return $this->jsonResponse([], 'Access deleted successfully.');
    }
}
