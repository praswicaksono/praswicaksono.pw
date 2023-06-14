---
title: "Fitur Baru di PHP 8"
excerpt: Fitur Baru di PHP 8
date: 2023-06-12 12:00:00
updated: 2023-06-12 12:00:00
draft: false
tags:
  - php
---

## Union Type

```php:UnionType.php
<?php

public function foo(Foo|Bar $input): int|float;
```

## Nullsafe operator

```php:OldNullCheck.php
<?php

$startDate = $booking->getStartDate();

$dateAsString = $startDate ? $startDate->asDateTimeString() : null;
```

```php:NullsalfeOperator.php
<?php

$dateAsString = $booking->getStartDate()?->asDateTimeString();
```

## Named Argument

```php:NamedArgument
<?php
function simpan(string $nama, string $alamat): void {}

simpan(alamat: 'Malang', nama: 'Pras');
```

## Attribute

```php:AttributeExample.php
<?php

class ProductSubscriber
{
    #[ListensTo(ProductCreated::class)]
    public function onProductCreated(ProductCreated $event) { /* … */ }

    #[ListensTo(ProductDeleted::class)]
    public function onProductDeleted(ProductDeleted $event) { /* … */ }
}
```

```php:Attribute.php
<?php

#[Attribute]
class ListensTo
{
    public string $event;

    public function __construct(string $event)
    {
        $this->event = $event;
    }
}
```

Kalian bisa mengkombinasikan `Attribute` dengan fungsi `Reflection` untuk mendapatkan informasi tentang `method` dimana `Attribute` di letakkan

```php:Reflection.php
<?php

$reflectionClass = new ReflectionClass(ProductSubscriber::class);

// Cari semua method didalam class
foreach ($reflectionClass->getMethods() as $method) {
    $attributes = $method->getAttributes(ListensTo::class);
    
    // Cari me
    foreach ($attributes as $attribute) {
        // informasi method yang menggakan attribute ListensTo, bisa di akses di variable $method
    }
}
```

`Attribute` bisa di terapkan di

* Class
* Property
* Method


## Match Expression

```php:Match.php
<?php

public function checkout(string $txId, Request $request): Response
{
    /** @var ?Payment $payment */
    $payment = $this->paymentRepository->findOneBy(['txId' => $txId]);

    return match (true) {
        is_null($payment) => throw new BadRequestException('Transaction ID is invalid.'),
        $payment->isSuccessOrRefunded() => throw new BadRequestException('Transaction is already successful or refunded.'),
        $payment->isPaymentNonResumable() => $this->forgetPaymentAndRedirectToPaymentSelection($payment),
        $payment->isPaymentMethodSelected() => $this->redirect($this->urlHelper->getChargeUrl($payment)),
        default => $this->renderPaymentSelectionPage($payment, $request)
    };
}
```

## Construction Property Promotion

```php:ConstructOld.php
<?php

final class SendChatMessage
{
    private readonly Security $security;

    private readonly EntityManagerInterface $entityManager;

    public function __construct(Security $security, EntityManagerInterface $entityManager)
    {
        $this->security = $security;
        $this->entityManager = $entityManager;
    }

    public function chat($message): void
    {
        $this->security
    }
}
```


```php:ConstructNew.php
<?php

final class SendChatMessage
{
    public function __construct(
        private readonly Security $security,
        private readonly EntityManagerInterface $entityManager
    ) {
    }

    public function chat($message): void
    {
        $this->security
    }
}
```

## Enums

```php:Enum.php
<?php
declare(strict_types=1);

enum PaymentStatus: int
{
    case PENDING = 0;
    case SUCCESS = 1;
    case FAILED = 2;
    case REFUNDED = 3;
    case CANCELLED = 4;
}

// $pending = 0
$pending = PaymentStatus::PENDING->value
```


## Intersection Type

```php:Intersection.php
<?php

function generateSlug(HasTitle&HasId $post) {
    return strtolower($post->getTitle()) . $post->getId();
}
```

## Readonly Class

```php:Readonly.php
<?php

readonly final class SendChatMessage
{
    public function __construct(
        private Security $security,
        private EntityManagerInterface $entityManager
    ) {
    }
}
```

## Disjuctive Normal Form Type

```php:DNF.php
<?php

function generateSlug((HasTitle&HasId)|null $post) 
{
    if ($post === null) {
        return '';
    }

    return 
        strtolower($post->getTitle()) 
        . $post->getId();
}
```

