<?php

// return [

//     'paths' => [
//         'api/*',
//         'login',
//         'logout',
//         'user',
//     ],

//     'allowed_methods' => ['*'],

//     'allowed_origins' => [
//         '*', // or specify frontend URLs
//     ],

//     'allowed_origins_patterns' => [],

//     'allowed_headers' => ['*'],

//     'exposed_headers' => [],

//     'max_age' => 0,

//     'supports_credentials' => false, // ❌ no cookies needed
// ];




return [

    'paths' => [
        'api/*',
        'login',
        'logout',
        'user',
    ],

    'allowed_methods' => ['*'],

    'allowed_origins' => [
        'https://lifechangebda.com',
        'https://lifechangebda.com/dashboard',
        'http://localhost:5173',
    ],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => ['Authorization'],

    'max_age' => 0,

    'supports_credentials' => true,

];


