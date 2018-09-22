import { Database } from './Database';
export declare class Seeder {
    protected db: any;
    protected records: any;
    constructor(db: Database, records: number);
    seed(): Promise<void>;
}
