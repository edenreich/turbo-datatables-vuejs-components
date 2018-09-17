import * as Koa from 'koa';
import * as Router from 'koa-router';
import { Paginator } from './classes/Paginator';
import { Database } from './Database';

const app = new Koa;
const router = new Router;

router.get('/people', async (ctx: any, next: any): Promise<any> => {
    ctx.set('Access-Control-Allow-Origin', 'http://localhost:8080');

    let db: Database = await Database.connect();

    let inputs = ctx.request.query;
    let columns = [
        {
            name: 'name',
            width: '33%',
            label: 'Name'
        },
        {
            name: 'email',
            width: '33%',
            label: 'Email'
        },
        {
            name: 'phone',
            width: '33%',
            label: 'Phone'
        }
    ];

    let direction = (inputs.direction === 'desc') ? 'desc': 'asc';

    let countResult = await db.query(`SELECT COUNT(*) as total FROM test_peoples`);
    let total = countResult[0].total;
   
    let search = escape(inputs.search);
    let column = isNaN(inputs.column) ? columns[0].name : columns[inputs.column].name;
    let page = parseInt(inputs.page);
    let limit = parseInt(inputs.limit);
    let offset = limit * (page-1);

    if (search) {
        let items = await db.query(`SELECT * FROM test_peoples WHERE ${column} LIKE '%${search}%'`);
        return ctx.body = {
            columns: columns,
            data: items
        };
    }

    // Execute the requested query.
    let items = await db.query(`SELECT * FROM test_peoples ORDER BY ${column} ${direction} LIMIT ${limit} OFFSET ${offset}`);
    let paginator = new Paginator(items, total, limit, page);

    ctx.body = {
        columns: columns,
        pagination: paginator.getPagination(),
        data: paginator.getItems()
    };
});

app.use(router.routes());

app.listen(3000);

console.log('listening on port 3000');
