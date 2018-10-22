<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\User;

class UserManagementController
{ 
  /**
   * Display a blade view.
   * 
   * @return \Illuminate\View\View
   */ 
  public function index() 
  {
    return view('example');
  }
   
  /**
   * This Method will be called per ajax 
   * via the supplied url for the datatable component.
   * 
   * @param \Illuminate\Http\Request $request
   * @return \Illuminate\Http\JsonResponse
   */ 
  public function show(Request $request) 
  {
    $columns = ['id', 'name', 'email', 'email_verified_at', 'created_at', 'updated_at'];

    $length = $request->input('limit');
    $column = $request->input('column');
    $chosenColumn = $columns[$column];
    $dir = $request->input('direction');
    $searchValue = $request->input('search');

    $query = User::orderBy($columns[$column], $dir);
    
    if ($searchValue) {
        $query->where(function($query) use ($searchValue, $chosenColumn) {
            $query->where($chosenColumn, 'like', '%' . $searchValue . '%');
        });
    }

    $paginator = $query->paginate($length);
    $users = $paginator->all();
    $pagination = $paginator->toArray();

    $pagination = [
        'lastPage' => $pagination['last_page'],
        'currentPage' => $pagination['current_page'],
        'nextPage' => ($pagination['current_page'] >= $pagination['last_page']) ? $pagination['last_page'] : $pagination['current_page']+1,
        'prevPage' => ($pagination['current_page'] <= 1) ? 1 : $pagination['current_page']-1,
        'total' => $pagination['total'],
        'totalPages' => $pagination['last_page'],
        'from' => $pagination['from'],
        'to' => $pagination['to']
    ];

    $columns = array_map(function($column) { 
        return [ 
            'name' => $column,
            'label' => ucfirst($column) 
        ];
    }, $columns);

    return response()->json([
        'columns' => $columns,
        'data' => $users,
        'pagination' => $pagination
    ]);
  }
}
