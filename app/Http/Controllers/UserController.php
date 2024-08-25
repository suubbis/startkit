<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Repository\Interfaces\UserRepositoryInterface;
use Illuminate\Http\JsonResponse;
use League\Csv\Reader;

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
        $users = $this->userRepository->all(['*'],['role', 'supervisor']);
        return $this->jsonResponse($users, 'Users retrieved successfully.');
    }

    /**
     * @param UserRequest $request
     * @return JsonResponse
     * Store a new user
     */
    public function store(UserRequest $request): JsonResponse
    {
        $user = $this->userRepository->create($request->all());
        if (!$user) {
            return $this->jsonResponse(null, 'User not created.', 500);
        }
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
        $user = $this->userRepository->update($id, $request->validated());
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

    public function uploadCsv(Request $request)
    {
        $request->validate([
            'csv_file' => 'required|file|mimes:csv,txt|max:2048',
        ]);

        $path = $request->file('csv_file')->getRealPath();
        $csv = Reader::createFromPath($path, 'r');
        $csv->setHeaderOffset(0); // Set first row as header

        $records = $csv->getRecords();

        foreach ($records as $record) {
            DB::table('your_table_name')->insert([
                'column1' => $record['csv_column1'],
                'column2' => $record['csv_column2'],
                // Continue mapping as needed
            ]);
        }

        return back()->with('success', 'CSV uploaded and data inserted successfully!');
    }
}
