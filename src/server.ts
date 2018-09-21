import * as Koa from 'koa';
import * as Router from 'koa-router';
import { datatables } from './exporter';

const app = new Koa;
const router = new Router;

router.get('/people', async (ctx: any, next: any): Promise<any> => {
    ctx.set('Access-Control-Allow-Origin', 'http://localhost:8080');
    let inputs = ctx.request.query;
    
    let dt = await datatables();

    // dt.of('test_peoples').only(['name', 'email']);
    dt.of('test_peoples').hide(['id', 'name']);
    dt.setInputs(inputs);

    ctx.body = await dt.make();
});

app.use(router.routes());

app.listen(3000);

console.log('listening on port 3000');
