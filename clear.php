<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);

$commands = [
    'config:clear',
    'cache:clear',
    'route:clear',
    'view:clear',
    'optimize:clear',
];

foreach ($commands as $command) {
    $kernel->call($command);
    echo "✅ " . $command . " done.<br>";
}

echo "<br>🎉 All clear commands executed successfully.";
