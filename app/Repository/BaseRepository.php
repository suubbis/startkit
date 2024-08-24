<?php

namespace App\Repository;

use App\Repository\Interfaces\BaseRepositoryInterface;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class BaseRepository implements BaseRepositoryInterface
{
    /**
     * @var Model
     */
    protected Model $model;

    /**
     * BaseRepository constructor.
     *
     * @param Model $model
     */
    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    /**
     * @param array $columns
     * @param array $relations
     * @param bool $pagination
     * @param bool $search
     * @param array $searchCols
     * @param bool $skipDeleted
     * @param array $orderBy
     * @param array $conditions
     * @return Collection|array|LengthAwarePaginator
     */
    public function all(array $columns = ['*'], array $relations = [], bool $pagination = false, bool $search = false, array $searchCols = [], bool $skipDeleted = false, array $orderBy = [], array $conditions = []): Collection|array|LengthAwarePaginator
    {
        $query = $this->model->with($relations);
        if($skipDeleted && !in_array('Illuminate\Database\Eloquent\SoftDeletes', class_uses($this->model))) {
            $query->whereNull("deleted_at");
        }

        $term = request()->term ?? null;

        $query->when($search && !empty($term), function ($query) use ($term,$searchCols){
            foreach ($searchCols as $key => $col){
                if ($key !== 'searchRelation'){
                    if ($key === 0)
                        $query->where($col, 'Like', '%' . $term . '%');
                    else
                        $query->orWhere($col, 'Like', '%' . $term . '%');
                } else{
                    if (count($col)){
                        foreach ($col as $relName => $relCols){
                            $query->orWhereHas($relName, function ($query) use ($term, $relCols, $relName){
                                foreach ($relCols as  $col){
                                    $query->where($col , 'Like', '%' . $term . '%');
                                }
                            });
                        }
                    }

                }
            }
        });

        $query->when($conditions && count($conditions), function ($query) use ($conditions){
            $index = 0;
            foreach ($conditions as $col => $val){
                if ($index === 0)
                    $query->where($col, $val);
                else
                    $query->orWhere($col, $val);

                $index++;
            }
        });

        if (count($orderBy)){
            foreach ($orderBy as $order){
                $query->orderBy($order[0] ?? $this->model->getKeyName(), $order[1] ?? 'asc');
            }
        }

        if ($pagination){
            $data = $query->select($columns)->paginate(paginationLimit(request()->limit));
            $data->appends(request()->input())->links();
            return $data;
        }
        return $query->get($columns);
    }

    /**
     * @return Authenticatable
     */
    public function getLoggedInUser(): Authenticatable
    {
        return auth()->user();
    }

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
    ): ?Model {
        return $this->model->select($columns)->with($relations)->findOrFail($modelId)->append($appends);
    }

    /**
     * Create a model.
     *
     * @param array $payload
     * @return Model|null
     */
    public function create(array $payload): mixed
    {
        try {
            $model = $this->model->create($payload);
            return $model->fresh();
        } catch (\Exception $e) {
            session()->flash('error', $e->getMessage());
            return false;
        }
    }

    /**
     * Create a model multiple data.
     *
     * @param array $payload
     * @return Model|null
     */
    public function insert(array $payload): mixed
    {
        try{
            return $this->model->insert($payload);
        } catch (\Exception $e) {
            session()->flash('error', $e->getMessage());
            return false;
        }

    }

    /**
     * Update existing model.
     *
     * @param int $modelId
     * @param array $payload
     * @return bool
     */
    public function update(int $modelId, array $payload): bool
    {
        try {
            $model = $this->findById($modelId);
            return $model->update($payload);
        } catch (\Exception $e) {
            session()->flash('error', $e->getMessage());
            return false;
        }

    }

    /**
     * Delete model by id.
     *
     * @param int $modelId
     * @return bool
     */
    public function deleteById(int $modelId): bool
    {
        return $this->findById($modelId)->delete();
    }

    public function uploadFile($file)
    {
        $fileName = time() . '.' . $file->getClientOriginalExtension();
        $file->move(public_path('uploads'), $fileName);
        return $fileName;

    }

}