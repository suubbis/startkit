<?php

namespace App\Http\Controllers;

use App\Http\Requests\CompanyRequest;
use App\Repository\Interfaces\CompanyDetailRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CompanyDetailController extends Controller
{
    public function __construct(private CompanyDetailRepositoryInterface $companyDetailRepository)
    {
        //
    }

    /**
     * @return JsonResponse
     * Retrieve all company
     */
    public function index(): \Illuminate\Http\JsonResponse
    {
        $companys = $this->companyDetailRepository->all();
        return $this->jsonResponse($companys, 'Company retrieved successfully.');
    }

    /**
     * @param CompanyRequest $request
     * @return JsonResponse
     * Store a new company
     */
    public function store(CompanyRequest $request): JsonResponse
    {
        $company = $this->companyDetailRepository->create($request->validated());
        return $this->jsonResponse($company, 'Company created successfully.', 201);
    }

    /**
     * @param $id
     * @return JsonResponse
     * Retrieve a specific company
     */
    public function show($id): JsonResponse
    {
        $company = $this->companyDetailRepository->findById($id);
        return $this->jsonResponse($company, 'Company retrieved successfully.');
    }

    /**
     * @param CompanyRequest $request
     * @param $id
     * @return JsonResponse
     * Update a specific company
     */
    public function update(CompanyRequest $request, $id): JsonResponse
    {
        $company = $this->companyDetailRepository->update($request->validated(), $id);
        return $this->jsonResponse($company, 'Company updated successfully.');
    }

    /**
     * @param $id
     * @return JsonResponse
     * Delete a specific company
     */
    public function destroy($id): JsonResponse
    {
        $this->companyDetailRepository->deleteById($id);
        return $this->jsonResponse(null, 'Company deleted successfully.');
    }
}
