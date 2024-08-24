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

    public function createOrUpdate($payload): Model|AccessControl
    {
        $accessControl = $this->model->where('role_id', $payload['role_id'])->first();
        if ($accessControl) {
            $accessControl->update($payload);
        } else {
            $this->model->create($payload);
        }
        return $this->model;

    }

    public function findByRole($id)
    {
        return $this->model->where('role_id', $id)->first() ?? null;
    }
}