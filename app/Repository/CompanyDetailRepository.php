<?php

namespace App\Repository;

use App\Models\CompanyDetail;
use App\Repository\Interfaces\CompanyDetailRepositoryInterface;
use Illuminate\Database\Eloquent\Model;

class CompanyDetailRepository extends BaseRepository implements CompanyDetailRepositoryInterface
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
        $this->model = new CompanyDetail();
    }

}