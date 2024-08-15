<?php

namespace App\Http\Controllers;

use App\Repository\Interfaces\PermissionRepositoryInterface;
use Illuminate\Http\Request;

class PermissionController extends Controller
{
    public function __construct(private PermissionRepositoryInterface $permissionRepository)
    {
        //
    }
}
