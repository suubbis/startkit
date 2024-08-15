<?php

namespace App\Http\Controllers;

use App\Repository\Interfaces\SystemSettingRepositoryInterface;
use Illuminate\Http\Request;

class SystemSettingController extends Controller
{
    public function __construct(private SystemSettingRepositoryInterface $systemSettingRepository)
    {
        //
    }
}
