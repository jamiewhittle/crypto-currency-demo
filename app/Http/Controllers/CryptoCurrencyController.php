<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class CryptoCurrencyController extends Controller
{
    /**
     * Display the crypto index page
     */
    public function index(): Response
    {
        return Inertia::render('CryptoCurrency');
    }

    /**
     * Display an individual crypto page
     */
    public function single(string $id): Response
    {
        return Inertia::render('CryptoCurrencySingle', [
            'id' => $id
        ]);
    }
}
