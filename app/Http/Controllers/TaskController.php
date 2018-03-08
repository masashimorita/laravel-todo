<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use JWTAuth;
use App\Task;

class TaskController extends Controller
{
    public function findAll()
    {
        $user = JWTAuth::toUser(JWTAuth::getToken());
        $tasks = Task::findByUser($user->id);
        return response()->json([
            'tasks' => $tasks,
        ], 200);
    }

    public function insert(Request $request)
    {
        $user = JWTAuth::toUser(JWTAuth::getToken());
        $this->validate($request, [
            'name' => 'required|string',
        ]);

        $task = new Task();
        $task->name = $request->input('name');
        $task->user_id = $user->id;
        $task->save();

        return response()->json([
            'task' => $task,
        ], 200);
    }

    public function delete($id)
    {
        if (!$id) {
            return response()->json([
                'message' => 'Invalid ID...',
            ], 500);
        }
        $task = Task::find($id);
        if (!$task) {
            return response()->json([
                'message' => 'Task not found...',
            ], 404);
        }

        $task->delete();
        return response()->json([
            'message' => 'Task has been successfully deleted',
        ], 200);
    }
}
