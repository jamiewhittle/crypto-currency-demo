<?php

namespace App\Repositories;

use App\Interfaces\CryptoCurrencyInterface;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class CryptoCurrencyRepository implements CryptoCurrencyInterface
{
    private $apiFindUrl;
    private $apirAllUrl;

    public function __construct()
    {
        $this->apiFindUrl = config('app.crypto_currency_api_url') . '/coins/';
        $this->apirAllUrl = config('app.crypto_currency_api_url') . '/coins/markets?vs_currency=gbp&order=market_cap_desc&per_page=' . config('app.crypto_currency_api_num_results') . '&page=1&sparkline=false&locale=en';
    }

    /**
     * Return a single market
     * From the cache, otherwise fetch from thecoin gecko api and store in the cache
     *
     * @param string $id
     */
    public function find(string $marketId): string
    {
        $key = 'crypto.market.' . $marketId;
        $ttl = 60;
        $this->apiFindUrl = $this->apiFindUrl . $marketId;

        return Cache::remember($key, $ttl, function () {
            $response = Http::get($this->apiFindUrl);
            return $response->body();
        });
    }

    /**
     * Return all markets
     * From the cache, otherwise fetch from thecoin gecko api and store in the cache
     */
    public function all(): string
    {
        $key = 'crypto.markets.all';
        $ttl = 60;

        return Cache::remember($key, $ttl, function () {
            $response = Http::get($this->apirAllUrl);
            return $response->body();
        });
    }
}
