<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Interfaces\CryptoCurrencyInterface;
use Illuminate\Http\JsonResponse;

class CryptoCurrencyController extends Controller
{
    private $cryptoCurrency;

    public function __construct(CryptoCurrencyInterface $cryptoCurrency)
    {
        $this->cryptoCurrency = $cryptoCurrency;
    }

    /**
     * Get all market data from the CryptoCurrencyRepository
     */
    public function all(): JsonResponse
    {
        return response()->json(json_decode($this->cryptoCurrency->all()));
    }

    /**
     * Get market data for a specific coin from the CryptoCurrencyRepository
     */
    public function find(string $id): JsonResponse
    {
        return response()->json(json_decode($this->cryptoCurrency->find($id)));
    }
}
