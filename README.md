<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

# Getting Started
- Install PHP >= 8.2 and NodeJS >= 16
- `composer install && npm install` - To install dependencies
- `cp .env.example .env` - Copy sample `.env`
- `php artisan key:generate` - To generate `APP_KEY`
- `php artisan migrate --seed` - To run migrations and seed the database
- `npm run build` - To build the frontend
- `php artisan inertia:start-ssr` _[OPTIONAL]_ - To start the SSR server
- `php artisan serve` - To serve the application

- Login with default user `[email => "test@example.com", password => "password"]`
