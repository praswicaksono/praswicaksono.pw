---
title: "Pengenalan Fiber"
excerpt: Pengenalan fitur fiber pada php 8.1
date: 2022-11-11 12:00:00
updated: 2022-11-11 12:00:00
draft: false
tags:
  - php
series:
  title: Modern PHP
  ident: modern-php
---

## Pembukaan

Seiring dengan populernya bahasa pemrograman `javascript` yang dikenal dengan
proses eksekusi `async` nya dan kemudian disusul dengan ngetrend nya bahasa `go`
akhir-akhir ini karena fitur `goroutine`-nya yang bisa dijalankan secara paralel
karena `process` yang dibuat `go` menyesuaikan dengan jumlah `CPU` jadi ini
memungkinkan untuk menjalankan beberapa `goroutine` sekaligus. Kali ini `PHP`
tidak mau ketinggalan dimulai dengan era `PHP` 8 yang mengenalkan fitur `JIT`
kali ini pada versi 8.1 PHP merilis fitur baru yang bernama `Fiber` yang dimana
ini membuka peluang bagi PHP untuk menciptakan eksekusi `async` yang mirip serta
`javascript` serta kemampuan eksekusi `parralel` yang dimiliki oleh `go`

## Fiber

Fiber ada sebuah fitur yang memungkinan sebuah fungsi untuk diinterupsi atau
dipause dibagian `code` manapun serta dapat dijalankan kembali sesuai keinginan.

## Contoh Penggunaan

```php:Fiber.php
<?php

$fiber = new Fiber(function(): void {
    $value = Fiber::suspend('halo');
    echo "Hasil dari resumed fiber: {$value}"
});

$value = $fiber->start();

echo "Hasil dari suspended fiber: {$value}"

$fiber->resume('hola');

// hasilnya
"Hasil dari suspended fiber: halo"
"Hasil dari resumed fiber: hola"
```

## Penutup

Fiber ini adalah fitur dasar untuk membuat `coroutine` atau `green thread`
dengan bantuan library semacam [ReactPHP](https://reactphp.org/),
[AmPHP](https://amphp.org/), [RevoltPHP](https://revolt.run/),
[Swoole](https://openswoole.com/) kita tidak perlu menggunakan `Fiber` pada
userland code karena pada dasarnya semua library itu sudah mengimplementasikan
`Fiber` untuk membuat `coroutine` sehingga memungkinkan `PHP` menjalankan
eksekusi `async`. Namun demikian semua fungsi bawaan `PHP` yang berhubungan
dengan I/O seperti file operation dan network operation masih belum mengadopsi
`Fiber` jadi belum bisa dieksekusi secara `async`.

Khusus untuk `swoole` kita dapat mengeksekusi `coroutine` dengan benar-benar
`parallel` karena `swoole` juga sama seperti `go` kita dapat mengatur jumlah
`worker` yang diciptakan untuk memproses `coroutine` ditambah lagi ada `worker`
khusus yang bisa digunakan untuk menjalankan fungsi berat secara `parallel`
tanpa mengganggu proses pelayanan `HTTP` request
