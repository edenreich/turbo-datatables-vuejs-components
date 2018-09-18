import { Database } from "../Database";
import { Paginator } from "./Paginator";
import { Options } from "./Options";
import { Column } from "./Column";

class Datatables
{
    private db: Database;

    private columns: Array<Column>;

    private fetchableColumns: Array<string>;

    private hiddenColumns: Array<string>;

    private table: string;

    private inputs: Options;

    constructor(db: Database)
    {
        this.db = db;
        this.inputs = {};
    }

    public of(tableName: string): Datatables
    {
        this.getColumnNames

        this.table = tableName;

        return this;
    }

    public only(columns: Array<string>): void
    {
        this.fetchableColumns = columns;
    }

    public hide(columns: Array<string>): void
    {
        this.hiddenColumns = columns;
    }

    public async make(): Promise<object>
    {
        this.columns = await this.getColumnNames(this.table);
        let count = await this.getRecordsCount(this.table);
        
        if (this.fetchableColumns && this.fetchableColumns.length > 0) {
            this.columns = this.columns.filter(column => this.fetchableColumns.indexOf(column.name) != -1);
        }

        if (this.hiddenColumns && this.hiddenColumns.length > 0) {
            this.columns = this.columns.filter(column => this.hiddenColumns.indexOf(column.name) === -1);
        }
        
        let column = this.columns[this.inputs.columnIndex].name;
        let columns = this.columns.map(column => column.name).join(',');

        if (this.inputs.search) {
            let items = await this.db.query(`SELECT ${columns} FROM test_peoples WHERE ${column} LIKE '%${this.inputs.search}%'`);
            return {
                columns: this.columns,
                data: items
            };
        }

        let items = await this.db.query(`SELECT ${columns} FROM test_peoples ORDER BY ${column} ${this.inputs.direction} LIMIT ${this.inputs.limit} OFFSET ${this.inputs.offset}`);
        let paginator = new Paginator(items, count, this.inputs.limit, this.inputs.page);

        return {
            columns: this.columns,
            data: items,
            pagination: paginator.getPagination()
        };
    }

    public setInputs(inputs: any): void
    {
        this.inputs.direction = (inputs.direction === 'desc') ? 'desc': 'asc';
        this.inputs.search = escape(inputs.search);
        this.inputs.columnIndex = parseInt(inputs.column);
        this.inputs.page = parseInt(inputs.page);
        this.inputs.limit = parseInt(inputs.limit);
        this.inputs.offset = this.inputs.limit * (this.inputs.page-1);
    }

    protected async getColumnNames(tableName: string): Promise<any>
    {
        // @todo create a config file where the user can specify the connection string.
        let database = 'test_datatables';

        let columns = await this.db.query("SELECT `COLUMN_NAME` FROM `INFORMATION_SCHEMA`.`COLUMNS` WHERE `TABLE_SCHEMA`='"+database+"' AND `TABLE_NAME`='"+tableName+"'");

        return columns.map((dbcolumn: any) => {
            let column: Column = {};
            column.name = dbcolumn.COLUMN_NAME;
            column.label = dbcolumn.COLUMN_NAME.charAt(0).toUpperCase() + dbcolumn.COLUMN_NAME.substr(1);
            column.width = '';

            return column;
        });
    }

    protected async getRecordsCount(tableName: string)
    {
        let count = await this.db.query('SELECT COUNT(*) as `total` FROM '+tableName);
        
        return count[0].total;
    }
}

export default Database.connect().then((db) => {
    return new Datatables(db);
});

