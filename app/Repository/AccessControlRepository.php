<?php

namespace App\Repository;

use App\Models\AccessControl;
use App\Repository\Interfaces\AccessControlRepositoryInterface;
use Illuminate\Database\Eloquent\Model;

class AccessControlRepository extends BaseRepository implements AccessControlRepositoryInterface
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
        $this->model = new AccessControl();
    }

}