<?php

namespace App\Http\Controllers;

use App\Repository\Interfaces\RoleRepositoryInterface;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function __construct(private RoleRepositoryInterface $roleRepository)
    {
        //
    }
}
