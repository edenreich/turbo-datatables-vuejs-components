import { Database } from '../Database';
import { Paginator } from './Paginator';
import { Options } from './Options';
import { Column } from './Column';

export class Datatables
{
    private db: Database;

    private paginator: Paginator;

    private columns: Column[];

    private fetchableColumns: string[];

    private hiddenColumns: string[];

    private table: string;

    private inputs: Options;

    constructor(db: Database, paginator: Paginator)
    {
        this.paginator = paginator;
        this.db = db;
        this.inputs = {};
    }

    public of(tableName: string): Datatables
    {
        this.table = tableName;

        return this;
    }

    public only(columns: string[]): void
    {
        this.fetchableColumns = columns;
    }

    public hide(columns: string[]): void
    {
        this.hiddenColumns = columns;
    }

    public async make(): Promise<object>
    {
        if (typeof this.table === 'undefined') {
            throw new Error(`
                Please use datatables.of(tablename) to indicate 
                from which table the records should be fetched`
            );
            process.exit(1);
        }

        this.columns = await this.getColumnNames(this.table);
        const count = await this.getRecordsCount(this.table);

        if (this.fetchableColumns && this.fetchableColumns.length > 0) {
            this.columns = this.columns.filter(column =>
                this.fetchableColumns.indexOf(column.name) !== -1
            );
        }

        if (this.hiddenColumns && this.hiddenColumns.length > 0) {
            this.columns = this.columns.filter(column =>
                this.hiddenColumns.indexOf(column.name) === -1
            );
        }

        const column = this.columns[this.inputs.columnIndex].name;
        const columns = this.columns.map(column => column.name).join(',');

        if (this.inputs.search) {
            const sql = `
                SELECT ${columns} FROM ${this.table}
                WHERE ${column} LIKE '%${this.inputs.search}%'
            `;

            const items = await this.db.query(sql);

            return {
                columns: this.columns,
                data: items
            };
        }

        const sql = `
            SELECT ${columns} FROM ${this.table}
            ORDER BY ${column} ${this.inputs.direction}
            LIMIT ${this.inputs.offset}, ${this.inputs.limit}
        `;
        
        const items = await this.db.query(sql);
        this.paginator.paginate(items, count, this.inputs.limit, this.inputs.page);

        return {
            columns: this.columns,
            data: items,
            pagination: this.paginator.getPagination()
        };
    }

    public setInputs(inputs: any): void
    {
        this.inputs.direction = (inputs.direction === 'desc') ? 'desc' : 'asc';
        this.inputs.search = escape(inputs.search);
        this.inputs.columnIndex = parseInt(inputs.column, 10);
        this.inputs.page = parseInt(inputs.page, 10);
        this.inputs.limit = parseInt(inputs.limit, 10);
        this.inputs.offset = this.inputs.limit * (this.inputs.page - 1);
    }

    protected async getColumnNames(tableName: string): Promise<any>
    {
        const database = this.db.getConnection().config.database;

        const sql = "SELECT `COLUMN_NAME` FROM `INFORMATION_SCHEMA`.`COLUMNS` WHERE `TABLE_SCHEMA`='"+database+"' AND `TABLE_NAME`='"+tableName+"'";
        
        const columns = await this.db.query(sql);

        return columns.map((dbcolumn: any) => {
            const column: Column = {};
            column.name = dbcolumn.COLUMN_NAME;
            column.label = column.name.charAt(0).toUpperCase() + column.name.substr(1);
            column.width = '';

            return column;
        });
    }

    protected async getRecordsCount(tableName: string)
    {
        const count = await this.db.query('SELECT COUNT(*) as `total` FROM ' + tableName);

        return count[0].total;
    }
}

export default Datatables;
