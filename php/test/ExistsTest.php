<?php
declare(strict_types=1);

// Gutendex SDK exists test

require_once __DIR__ . '/../gutendex_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = GutendexSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
