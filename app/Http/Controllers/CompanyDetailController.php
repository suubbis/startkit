<?php

namespace App\Http\Controllers;

use App\Repository\Interfaces\CompanyDetailRepositoryInterface;
use Illuminate\Http\Request;

class CompanyDetailController extends Controller
{
    public function __construct(private CompanyDetailRepositoryInterface $companyDetailRepository)
    {
        //
    }
}
