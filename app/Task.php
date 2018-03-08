<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id', 'name',
    ];

    /**
     * Find tasks by user id
     *
     * @param $userId integer id of authorized user
     * @return array found records
     */
    public static function findByUser($userId)
    {
        return (self::query()->where('user_id', '=', $userId)->get());
    }
}
