<?php

namespace App\Repository;

use App\Models\Role;
use App\Repository\Interfaces\RoleRepositoryInterface;
use Illuminate\Database\Eloquent\Model;

class RoleRepository extends BaseRepository implements RoleRepositoryInterface
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
        $this->model = new Role();
    }

}