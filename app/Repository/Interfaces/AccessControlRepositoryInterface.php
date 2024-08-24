<?php

namespace App\Repository\Interfaces;

interface AccessControlRepositoryInterface extends BaseRepositoryInterface
{

    public function createOrUpdate($payload);

    public function findByRole($id);
}