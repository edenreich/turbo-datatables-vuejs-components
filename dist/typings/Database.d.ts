import { Connection } from 'mysql';
export declare class Database {
    private connection;
    constructor(connection: Connection);
    static connect(): Promise<Connection>;
    disconnect(): Promise<any>;
    query(sql: string, binds?: any): Promise<any>;
    getConnection(): Connection;
}
