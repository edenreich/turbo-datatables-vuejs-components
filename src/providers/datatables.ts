import { Database } from '../Database';
import { Paginator } from '../classes/Paginator';
import { Datatables as DT } from '../classes/Datatables';
import { Connection } from 'mysql';

export function Datatables(connection?: Connection): DT {
    if (typeof connection === 'undefined') {
        Database.connect().then((conn) => this.connection = conn);
    } else if (connection.state === 'disconnected') {
        Database.connect().then((conn) => this.connection = conn);
    }
    
    return new DT(new Database(connection), new Paginator);
}
