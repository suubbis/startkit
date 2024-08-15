<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
		$this->app->bind(
			\App\Repository\Interfaces\BaseRepositoryInterface::class,
			\App\Repository\BaseRepository::class
		);

		$this->app->bind(
			\App\Repository\Interfaces\UserRepositoryInterface::class,
			\App\Repository\UserRepository::class
		);

		$this->app->bind(
			\App\Repository\Interfaces\RoleRepositoryInterface::class,
			\App\Repository\RoleRepository::class
		);

		$this->app->bind(
			\App\Repository\Interfaces\PermissionRepositoryInterface::class,
			\App\Repository\PermissionRepository::class
		);

		$this->app->bind(
			\App\Repository\Interfaces\CompanyDetailRepositoryInterface::class,
			\App\Repository\CompanyDetailRepository::class
		);

		$this->app->bind(
			\App\Repository\Interfaces\AccessControlRepositoryInterface::class,
			\App\Repository\AccessControlRepository::class
		);

		$this->app->bind(
			\App\Repository\Interfaces\SystemSettingRepositoryInterface::class,
			\App\Repository\SystemSettingRepository::class
		);
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
