import { Connection, createConnection } from 'mysql';

export class Database
{
    private connection: Connection = null;

    public constructor(connection: Connection)
    {
        this.connection = connection;
    }

    public static async connect(): Promise<Connection>
    {
        return createConnection({
            host     : process.env.TEST_DB_HOST || 'localhost',
            user     : process.env.TEST_DB_USER || 'root',
            password : process.env.TEST_DB_PASSWORD || '',
            database : process.env.TEST_DB_DATABASE || 'test_datatables'
        });
    }

    public async disconnect(): Promise<any>
    {
        setTimeout(this.connection.end, 500);
    }

    public async query(sql: string, binds?: any): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, binds, (err, result) => {
                if (err) {
                    reject(err);
                }

                return resolve(result);
            });
        });
    }

    public getConnection(): Connection
    {
        return this.connection;
    }
}
