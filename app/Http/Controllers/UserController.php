<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Repository\Interfaces\UserRepositoryInterface;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    public function __construct(private UserRepositoryInterface $userRepository)
    {
        //
    }


    /**
     * @return JsonResponse
     * Retrieve all users
     */
    public function index(): \Illuminate\Http\JsonResponse
    {
        $users = $this->userRepository->all();
        return $this->jsonResponse($users, 'Users retrieved successfully.');
    }

    /**
     * @param UserRequest $request
     * @return JsonResponse
     * Store a new user
     */
    public function store(UserRequest $request): JsonResponse
    {
        $user = $this->userRepository->create($request->validated());
        return $this->jsonResponse($user, 'User created successfully.', 201);
    }

    /**
     * @param $id
     * @return JsonResponse
     * Retrieve a specific user
     */
    public function show($id): JsonResponse
    {
        $user = $this->userRepository->findById($id);
        return $this->jsonResponse($user, 'User retrieved successfully.');
    }

    /**
     * @param UserRequest $request
     * @param $id
     * @return JsonResponse
     * Update a specific user
     */
    public function update(UserRequest $request, $id): JsonResponse
    {
        $user = $this->userRepository->update($request->validated(), $id);
        return $this->jsonResponse($user, 'User updated successfully.');
    }

    /**
     * @param $id
     * @return JsonResponse
     * Delete a specific user
     */
    public function destroy($id): JsonResponse
    {
        $this->userRepository->deleteById($id);
        return $this->jsonResponse(null, 'User deleted successfully.');
    }
}
