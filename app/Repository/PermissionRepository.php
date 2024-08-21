<?php

namespace App\Repository;

use App\Models\Permission;
use App\Repository\Interfaces\PermissionRepositoryInterface;
use Illuminate\Database\Eloquent\Model;

class PermissionRepository extends BaseRepository implements PermissionRepositoryInterface
{
    /**
     * @var Model
     */
    protected Model $model;

    /**
     * AccessControlRepository constructor.
     *
     */
    public function __construct()
    {
        $this->model = new Permission();
    }

}