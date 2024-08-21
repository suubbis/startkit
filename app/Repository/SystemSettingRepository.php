<?php

namespace App\Repository;

use App\Models\SystemSetting;
use App\Repository\Interfaces\SystemSettingRepositoryInterface;
use Illuminate\Database\Eloquent\Model;

class SystemSettingRepository extends BaseRepository implements SystemSettingRepositoryInterface
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
        $this->model = new SystemSetting();
    }

}