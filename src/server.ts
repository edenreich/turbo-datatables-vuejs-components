import * as Koa from 'koa';
import * as Router from 'koa-router';
import { Datatables } from './exporter';
import { createConnection, Connection } from 'mysql';

const app = new Koa;
const router = new Router;

router.get('/people', async (ctx: any, next: any): Promise<any> => {
    ctx.set('Access-Control-Allow-Origin', 'http://localhost:8080');
    const inputs = ctx.request.query;

    const connection: Connection = createConnection({
        host     : process.env.TEST_DB_HOST || 'localhost',
        user     : process.env.TEST_DB_USER || 'root',
        password : process.env.TEST_DB_PASSWORD || '',
        database : process.env.TEST_DB_DATABASE || 'test_datatables'
    });

    const dt = Datatables(connection);
    dt.of('test_peoples').only(['id', 'email']);
    // dt.of('test_peoples').hide(['id', 'name']);
    dt.setInputs(inputs);

    ctx.body = await dt.make();
});

app.use(router.routes());

app.listen(3000);

console.log('listening on port 3000');
