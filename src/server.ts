import * as Koa from 'koa';
import * as Router from 'koa-router';
import Datatables from './classes/Datatables';

const app = new Koa;
const router = new Router;

router.get('/people', async (ctx: any, next: any): Promise<any> => {
    ctx.set('Access-Control-Allow-Origin', 'http://localhost:8080');
    let inputs = ctx.request.query;
    
    let datatables = await Datatables;

    datatables.of('test_peoples');
    datatables.setInputs(inputs);

    ctx.body = await datatables.make();
});

app.use(router.routes());

app.listen(3000);

console.log('listening on port 3000');
