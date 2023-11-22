<?php

namespace App\Interfaces;

interface CryptoCurrencyInterface
{
    /**
     * Return a single market
     */
    public function find(string $marketId): string;

    /**
     * Return all markets
     */
    public function all(): string;
}
