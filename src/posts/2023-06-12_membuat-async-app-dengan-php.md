---
title: "Membuat Async App Dengan PHP"
excerpt: Membuat Async App Dengan PHP
date: 2023-06-12 12:00:00
updated: 2023-06-12 12:00:00
draft: false
tags:
  - php
---

## Revolt PHP

Ini adalah implementasi scheduler berbasis fitur PHP yaitu Fiber

```php:Revolt.php
<?php

require __DIR__ . '/vendor/autoload.php';

use Revolt\EventLoop;

$suspension = EventLoop::getSuspension();

$repeatId = EventLoop::repeat(1, function (): void {
    print '++ Executing callback created by EventLoop::repeat()' . PHP_EOL;
});

EventLoop::delay(5, function () use ($suspension, $repeatId): void {
    print '++ Executing callback created by EventLoop::delay()' . PHP_EOL;

    EventLoop::cancel($repeatId);
    $suspension->resume(null);

    print '++ Suspension::resume() is async!' . PHP_EOL;
});

print '++ Suspending to event loop...' . PHP_EOL;

$suspension->suspend();

print '++ Script end' . PHP_EOL;
```

Output yang di hasilkan

```
++ Suspending to event loop...
++ Executing callback created by EventLoop::repeat()
++ Executing callback created by EventLoop::repeat()
++ Executing callback created by EventLoop::repeat()
++ Executing callback created by EventLoop::repeat()
++ Executing callback created by EventLoop::delay()
++ Suspension::resume() is async!
++ Script end
```

Dengan scheduler atau event loop ini, kita bisa membuat async server bebasis TCP

## AMPHP: Framework untuk membuat concurrent application

*BETA* Http Server

```php:http.php
#!/usr/bin/env php
<?php

require dirname(__DIR__) . "/vendor/autoload.php";

use Amp\ByteStream;
use Amp\Http\HttpStatus;
use Amp\Http\Server\DefaultErrorHandler;
use Amp\Http\Server\Request;
use Amp\Http\Server\RequestHandler\ClosureRequestHandler;
use Amp\Http\Server\Response;
use Amp\Http\Server\SocketHttpServer;
use Amp\Log\ConsoleFormatter;
use Amp\Log\StreamHandler;
use Monolog\Logger;
use Monolog\Processor\PsrLogMessageProcessor;
use function Amp\trapSignal;

// Run this script, then visit http://localhost:1337/ in your browser.

$logHandler = new StreamHandler(ByteStream\getStdout());
$logHandler->pushProcessor(new PsrLogMessageProcessor());
$logHandler->setFormatter(new ConsoleFormatter);
$logger = new Logger('server');
$logger->pushHandler($logHandler);

$server = SocketHttpServer::createForDirectAccess($logger);

$server->expose("0.0.0.0:1337");
$server->expose("[::]:1337");

$server->start(new ClosureRequestHandler(function (Request $request): Response {
    static $counter = 0;

    // We can keep state between requests, but if you're using multiple server processes,
    // such state will be separate per process.
    // Note: You might see the counter increase by more than one per reload, because browser
    // might try to load a favicon.ico or similar.
    return new Response(
        status: HttpStatus::OK,
        headers: ["content-type" => "text/plain; charset=utf-8",],
        body: "You're visitor #" . (++$counter) . "."
    );
}), new DefaultErrorHandler());

// Await a termination signal to be received.
$signal = trapSignal([\SIGHUP, \SIGINT, \SIGQUIT, \SIGTERM]);

$logger->info(sprintf("Received signal %d, stopping HTTP server", $signal));

$server->stop();
```

Hal yang harus di perhatikan

* Sama seperti nodejs async php menggunakan Fiber adalah single thread, untuk memaksimalkan cpu core yang kita punya kita harus membuat process sebanyak cpu core yang kita miliki + 1 traffic manager untuk mendistribusi request
* Perhatikan penggunaan static variable, ini bisa jadi penyebab memory leak
* Pertimbangkan penggunakan teknik immutable, ini bisa jadi solusi memory leak tapi sebagai gantinya kita mungkin kehilangan performa


## Other Async Framework

Ada beberapa async framework dengan keunggulan masing masing diantaranya

* ReactPHP
* Swoole
* Road Runner
* Franken PHP