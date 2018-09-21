import { Connection, createConnection } from 'mysql';

export class Database
{
    private static instance: Database = null;

    private connection: Connection;

    private constructor()
    {
        this.connection = createConnection({
            host     : process.env.TEST_DB_HOST || 'localhost',
            user     : process.env.TEST_DB_USER || 'root',
            password : process.env.TEST_DB_PASSWORD || '',
            database : process.env.TEST_DB_DATABASE || 'test_datatables'
        });
    }

    public static async connect(): Promise<any>
    {
        if (!Database.instance) {
            Database.instance = new Database;
        }

        return Database.instance;
    }

    public async disconnect(): Promise<any>
    {
        setTimeout(this.connection.end, 500);   
    }

    public async query(sql: string, binds?: Array<any>): Promise<any>
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
}