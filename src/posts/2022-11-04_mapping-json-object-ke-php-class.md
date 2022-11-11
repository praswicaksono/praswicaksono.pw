---
title: "Mapping JSON Object ke PHP Class"
excerpt: Tutorial mapping json object ke php class dengan cara yang elegan menggunakan named argument dan argument unpacking
date: 2022-11-04 12:00:00
updated: 2022-11-04 12:00:00
draft: false
tags:
  - php
series:
  title: Modern PHP
  ident: modern-php
---

## Named Argument

Named argument adalah fitur baru di PHP 8, yang mana developer dapat mengirimkan
`argument` pada sebuah `function` berdasar nama `parameter` dan tidak harus
berurutan. Berikut contoh penggunaan `named argument`

### Contoh

```php:func.php
<?php
function simpan(string $nama, string $alamat): void {
  // simpan nama dan alamat ke dalam persistance storage
}

// passing argument tidak harus berurutan
simpan(alamat: 'Malang', nama: 'Pras');
```

## Argument Unpacking

`Argument Unpacking` sudah ada sejak PHP 5.6, dengan menggunakan `spread`
operator (`...`) kita bisa mengunpack `array argument` pada sebuah `function`

### Contoh

```php:func.php
<?php
function simpan(string $nama, string $alamat): void {
  // $nama = Pras
  // $alamat = Malang
  // simpan nama dan alamat ke dalam persistance storage
}

// passing argument tidak harus berurutan
simpan(...['Pras', 'Malang']);
```

Namun yang harus diingat bahwa `array` yang unpack harus sesuai urutan
`parameter` pada `function`

## Real World Usage

Kedua function tersebut dapat digunakan untuk proses mapping `JSON` object yang
merupakan response dari `API` pihak ketiga ke PHP `class` yang telah kita buat

### Contoh

```php:User.php
final class User implements UserInterface
{
    public const SESSION_KEY = 'user';

    public function __construct(
        public readonly string $uid,
        public readonly string $access_token,
        public readonly string $refresh_token,
        public readonly int $expires_in
    ) {
    }
}
```

```php:Api.php
// ini dalah contoh json response dari API pihak ketiga
$json = <<<JSON
{
"refresh_token": "96b039511d405c3546e17f9960674d4f05a2acabdfce2b0546c0ff53ad0f9962",
"uid": "6363b99de1e2180007015361",
"access_token": "ZToyMjExMDQsdjoyLHM6MCxzczow.EymWhiveZ2TWCTgQT9X7DeZjIwngyK22SYxav01Z8Ec",
"expires_in": 86400
}
>>>

$user = new User(...json_decode($json, true));

// kita dapat akses fully typed json response dari API pihak ketiga
echo $user->access_token;
```

Jika kita mengirimkan `associative array` dan menggunakan `spread operator`
untuk mengunpack `argument` maka secara otomatis PHP akan menggunakan array key
sebagai nama `parameter` dan `array value` sebagai `argument` valuenya

## Penutup

Dengan menggunakan teknik ini, kita bisa mendapatkan fully typed object dari
response API pihak ketiga sehingga kita bisa menggunakan fitur autocomplete pada
IDE serta menguarangi potensi error typo
