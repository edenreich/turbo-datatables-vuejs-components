<p align="center">
  <a href="https://nodejs.org/">
    <img
      alt="Node.js"
      src="https://nodejs.org/static/images/logo-light.svg"
      width="400"
    />
  </a>
</p>

# What will you need ?

## Client-Side

Create a simple example.html file and serve it with your prefered web-server:
```html
<html>
    </head>
        <title>Example Datatable Vuejs</title>
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

Install a package via npm:
```sh
npm i turbo-datatables-response
```

Lets install a router and a server library to make it looks better(you can use express if you want):
```
npm i koa
npm i koa-router
```

Create server.js file:
```js
const Koa = require('koa');
const router = require('koa-router')();

const Datatables = require('turbo-datatables-response');

router.get('/users', async (ctx) => {
    // Optionally you can give the Datatables the mysql connection.
    const datatables = await Datatables();
    
    // Set the inputs from the client.
    datatables.setInputs(inputs);

    // supply the table name and the columns you need. 
    datatables.of('users').only(['id', 'name', 'email']);
    
    // or use the inverse
    // dt.of('users').hide(['password']);

    // Edit rows values on the fly.
    datatables.edit('name', (row) => {
        return 'Test '+row.name;
    });

    // Generates the response.
    let response = await datatables.make();

    ctx.body = response;
});

app.use(router.routes());

app.listen(3000);
```

For further details about **[turbo-datatables-response](https://github.com/edenreich/turbo-datatables-response)**

Finally your Vue JS transpiled file should look like in the example on the index page.
An example code will be followed up shortly.
