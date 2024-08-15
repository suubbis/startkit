<?php

namespace App\Http\Controllers;

use App\Repository\Interfaces\AccessControlRepositoryInterface;

class AccessControlController extends Controller
{
    public function __construct(private AccessControlRepositoryInterface $accessControlRepository)
    {
        //
    }
}
