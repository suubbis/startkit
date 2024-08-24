<?php

namespace App\Repository\Interfaces;

use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;

interface BaseRepositoryInterface
{
    /**
     * Get all models.
     *
     * @param array $columns
     * @param array $relations
     * @param bool $pagination
     * @param bool $search
     * @param array $searchCols
     * @param bool $skipDeleted
     * @param array $orderBy
     * @param array $conditions
     * @return mixed
     */
    public function all(array $columns = ['*'], array $relations = [], bool $pagination = false, bool $search = false, array $searchCols = [], bool $skipDeleted = false, array $orderBy = [], array $conditions = []): mixed;

    /**
     * Get loggedIn User.
     *
     * @return Authenticatable
     */
    public function getLoggedInUser(): Authenticatable;

    /**
     * Find model by id.
     *
     * @param int $modelId
     * @param array $columns
     * @param array $relations
     * @param array $appends
     * @return Model|null
     */
    public function findById(
        int $modelId,
        array $columns = ['*'],
        array $relations = [],
        array $appends = []
    ): ?Model;

    /**
     * Create a model.
     *
     * @param array $payload
     * @return Model|null
     */
    public function create(array $payload): mixed;

    /**
     * Create a model data multiple.
     *
     * @param array $payload
     * @return Model|null
     */
    public function insert(array $payload): mixed;

    /**
     * Update existing model.
     *
     * @param int $modelId
     * @param array $payload
     * @return bool
     */
    public function update(int $modelId, array $payload): bool;

    /**
     * Delete model by id.
     *
     * @param int $modelId
     * @return bool
     */
    public function deleteById(int $modelId): bool;

    public function uploadFile($file);


}