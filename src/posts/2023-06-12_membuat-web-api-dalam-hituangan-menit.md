---
title: "Membuat API Dalam Hitungan Menit"
excerpt: Membuat API Dalam Hitungan Menit
date: 2023-06-12 12:00:00
updated: 2023-06-12 12:00:00
draft: false
tags:
  - php
---

## Api Platform

* Powered by Symfony Framework (soon to be decoupled)
* REST and GraphQL Supported
* React based admin included

## Creating REST and GraphQL CRUD in less than 5 minutes

```bash
symfony new bookshop-api
```

```bash
symfony new bookshop-api
```

```bash
symfony composer require api
```

Rubah .env sesuai konfigurasi database masing masing

Buat doctrine entity

```php:Entity.php
<?php
// src/Entity/Book.php
namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
 
 /** A book. */
#[ORM\Entity]
#[ApiResource]
class Book
{
    /** The ID of this book. */
    #[ORM\Id, ORM\Column, ORM\GeneratedValue]
    private ?int $id = null;

    /** The ISBN of this book (or null if doesn't have one). */
    #[ORM\Column(nullable: true)]
    public ?string $isbn = null;

    /** The title of this book. */
    #[ORM\Column]
    public string $title = '';

    /** The description of this book. */
    #[ORM\Column(type: 'text')]
    public string $description = '';

    /** The author of this book. */
    #[ORM\Column]
    public string $author = '';

    /** The publication date of this book. */
    #[ORM\Column]
    public ?\DateTimeImmutable $publicationDate = null;

    /** @var Review[] Available reviews for this book. */
    #[ORM\OneToMany(targetEntity: Review::class, mappedBy: 'book', cascade: ['persist', 'remove'])]
    public iterable $reviews;

    public function __construct()
    {
        $this->reviews = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }
}
```

```php:Review.php
<?php
// src/Entity/Review.php
namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use Doctrine\ORM\Mapping as ORM;
 
 /** A review of a book. */
#[ORM\Entity]
#[ApiResource]
class Review
{
    /** The ID of this review. */
    #[ORM\Id, ORM\Column, ORM\GeneratedValue]
    private ?int $id = null;

    /** The rating of this review (between 0 and 5). */
    #[ORM\Column(type: 'smallint')]
    public int $rating = 0;

    /** The body of the review. */
    #[ORM\Column(type: 'text')]
    public string $body = '';

    /** The author of the review. */
    #[ORM\Column]
    public string $author = '';

    /** The date of publication of this review.*/
    #[ORM\Column]
    public ?\DateTimeImmutable $publicationDate = null;

    /** The book this review is about. */
    #[ORM\ManyToOne(inversedBy: 'reviews')]

    public function getId(): ?int
    {
        return $this->id;
    }
}
```

Migrate entity ke dalam database tabel

```bash
symfony console doctrine:database:create
symfony console doctrine:schema:create
```

Jalankan symfony server

```bash
symfony serve
```

Secara default Base url API akan menggunakan `/api`

![REST API Doc!](https://api-platform.com/static/c868a040420c76cb964af598e03be8dd/f43e4/api-platform-2.6-bookshop-api.png)

Selanjutnya kita expose endpoint graphqlnya

```bash
composer require webonyx/graphql-php
bin/console cache:clear
```

Secara default graphp interactive console di `/api/graphql`

![GraphQL!](https://api-platform.com/static/61acc01888cf0122fbe8f3dfe6c9936c/f43e4/api-platform-2.6-graphql.png)

## Beberapa Library Menarik

Ada beberapa library modern yang cukup menarik untuk mengembangkan applikasi modern

* Library Real Time: Mercure
* HTTP 2 Server Push: Vulcain
* Admin Panel: Filament PHP
* Frontend Framework Integration: Symfony UX, Laravel Livewire, InertiaJS

