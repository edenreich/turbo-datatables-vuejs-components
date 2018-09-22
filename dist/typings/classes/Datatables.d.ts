import { Database } from '../Database';
import { Paginator } from './Paginator';
export declare class Datatables {
    private db;
    private paginator;
    private columns;
    private fetchableColumns;
    private hiddenColumns;
    private table;
    private inputs;
    constructor(db: Database, paginator: Paginator);
    of(tableName: string): Datatables;
    only(columns: string[]): void;
    hide(columns: string[]): void;
    make(): Promise<object>;
    setInputs(inputs: any): void;
    protected getColumnNames(tableName: string): Promise<any>;
    protected getRecordsCount(tableName: string): Promise<any>;
}
export default Datatables;
