import * as Koa from 'koa';
import * as Router from 'koa-router';
import { Datatables, Row } from 'turbo-datatables-response';

const app: Koa = new Koa;
const router: Router = new Router;

router.get('/users', async (ctx: any): Promise<any> => {
    ctx.set('Access-Control-Allow-Origin', '*');
    const inputs = ctx.request.query;
    const datatables = await Datatables();

    datatables.of('test_users');
    datatables.setInputs(inputs);

    ctx.body = await datatables.make();
});

app.use(router.routes());

app.listen(3000);
console.log('server is listening on port 3000...');