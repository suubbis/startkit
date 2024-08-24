<?php
return ["pusher" => [
    'driver' => 'pusher',
    'key' => env('PUSHER_APP_KEY'),
    'secret' => env('PUSHER_APP_SECRET'),
    'app_id' => env('PUSHER_APP_ID'),
    'options' => [
        'cluster' => env('PUSHER_APP_CLUSTER'),
        'useTLS' => true,
        'host' => env('PUSHER_APP_HOST', 'api.pusherapp.com'),
        'port' => env('PUSHER_APP_PORT', 443),
        'scheme' => env('PUSHER_APP_SCHEME', 'https'),
        'encrypted' => env('PUSHER_APP_ENCRYPTED', true),
    ],
]];
