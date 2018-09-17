import * as faker from 'faker';
import { Database } from './Database';

export class Seeder
{
    protected db;

    protected records;

    constructor(database: Database, records: number)
    {
        this.db = database;
        this.records = records;

        this.db.query(` 
            CREATE TABLE IF NOT EXISTS test_peoples(
            id int AUTO_INCREMENT, 
            name varchar(100) NOT NULL,
            email varchar(100) NOT NULL,
            phone varchar(100) NOT NULL,
            PRIMARY KEY(id),
            UNIQUE(email)
        );`);
    }

    public async seed()
    {
        this.db.query('TRUNCATE TABLE test_peoples;');

        let sql = 'INSERT INTO test_peoples (name, email, phone) VALUES (?, ?, ?);';
        
        for (let i = 1; i <= this.records; i++) {
            var data = [faker.name.findName(), faker.internet.email(), faker.phone.phoneNumber()];
            await this.db.query(sql, data);
        }

        process.exit(0);
    }
}

const records: number = parseInt(process.argv[2]);

Database.connect().then(db => {
    const seeder: Seeder = new Seeder(db, records);
    seeder.seed();
});
