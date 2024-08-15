<?php

namespace App\Http\Controllers;

use App\Http\Requests\SettingRequest;
use App\Repository\Interfaces\SystemSettingRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SystemSettingController extends Controller
{
    public function __construct(private SystemSettingRepositoryInterface $systemSettingRepository)
    {
        //
    }

    /**
     * @return JsonResponse
     * Retrieve all settings
     */
    public function index(): \Illuminate\Http\JsonResponse
    {
        $settings = $this->systemSettingRepository->all();
        return $this->jsonResponse($settings, 'Settings retrieved successfully.');
    }

    /**
     * @param SettingRequest $request
     * @return JsonResponse
     * Store a new setting
     */
    public function store(SettingRequest $request): JsonResponse
    {
        $setting = $this->systemSettingRepository->create($request->validated());
        return $this->jsonResponse($setting, 'Setting created successfully.', 201);
    }

    /**
     * @param $id
     * @return JsonResponse
     * Retrieve a specific setting
     */
    public function show($id): JsonResponse
    {
        $setting = $this->systemSettingRepository->findById($id);
        return $this->jsonResponse($setting, 'Setting retrieved successfully.');
    }

    /**
     * @param SettingRequest $request
     * @param $id
     * @return JsonResponse
     * Update a specific setting
     */
    public function update(SettingRequest $request, $id): JsonResponse
    {
        $setting = $this->systemSettingRepository->update($request->validated(), $id);
        return $this->jsonResponse($setting, 'Setting updated successfully.');
    }

    /**
     * @param $id
     * @return JsonResponse
     * Delete a specific setting
     */
    public function destroy($id): JsonResponse
    {
        $this->systemSettingRepository->deleteById($id);
        return $this->jsonResponse(null, 'Setting deleted successfully.');
    }
}
