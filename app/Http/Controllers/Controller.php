<?php

namespace App\Http\Controllers;

abstract class Controller
{
    public function jsonResponse($data = [], $message = '', $code = 200): \Illuminate\Http\JsonResponse
    {
        $status = $code >= 200 && $code < 300;
        return response()->json([
            'status' => $status,
            'message' => $message,
            'data' => $data
        ], $code);
    }
}
