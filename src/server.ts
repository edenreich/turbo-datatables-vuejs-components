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
    let columns = ['name', 'email', 'phone'];
    let direction = (inputs.direction === 'desc') ? 'desc': 'asc';

    let countResult = await db.query(`SELECT COUNT(*) as total FROM test_peoples`);
    let total = countResult[0].total;
   
    let like = escape(inputs.search);
    let column = isNaN(inputs.column) ? columns[0] : columns[inputs.column];
    let page = parseInt(inputs.page);
    let limit = parseInt(inputs.offset);

    // Execute the requested query.
    let items = await db.query(`SELECT * FROM test_peoples WHERE ${column} LIKE '%${like}%' ORDER BY ${column} ${direction} LIMIT ${page}, ${limit}`);
    let paginator = new Paginator(items, total, limit, page);

    ctx.body = {
        pagination: paginator.getPagination(),
        data: paginator.getItems()
    };
});

app.use(router.routes());

app.listen(3000);

console.log('listening on port 3000');
