<p align="center"><img src="https://laravel.com/assets/img/components/logo-laravel.svg"></p>

# What will you need ?

## Client-Side

In view folder create a simple example.blade.php file:
```html
<html>
    </head>
        <title>Example Datatable Vuejs</title>
        <link rel="stylesheet" href="https://cdn.datatables.net/1.10.19/css/dataTables.bootstrap4.min.css">
    <head>

    <body>
        <div id="app">
            <!-- Vue app.js Content -->
        </div>
        <script src="{{ asset('js/app.js') }}"></script>
    </body>
</html>
```

## Server-Side

Routes should look like this:
```php
Route::get('/', 'UserManagementController@index');
Route::get('/users', 'UserManagementController@show');
```

Controller should look like this:

```php

namespace App\Http;

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
   * @return \Illuminate\Http\JsonResponse
   */ 
  public function show() 
  {
    $columns = ['id', 'name', 'image', 'type', 'updated_at', 'created_at'];

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
```

Finally your Vue JS transpiled file should look like in the example on the index page.
An example code will be followed up shortly.
