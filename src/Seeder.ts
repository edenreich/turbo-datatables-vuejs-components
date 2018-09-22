const faker = require('Faker'); 
import { Database } from './Database';

export class Seeder
{
    protected db;

    protected records;

    constructor(db: Database, records: number)
    {
        this.db = db;
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

        const sql = 'INSERT INTO test_peoples (name, email, phone) VALUES (?, ?, ?);';

        for (let i = 1; i <= this.records; i++) {
            const data = [faker.name.findName(), faker.internet.email(), faker.phone.phoneNumber()];
            await this.db.query(sql, data);
        }

        process.exit(0);
    }
}

const records: number = parseInt(process.argv[2], 10);

Database.connect().then(conn => {
    const seeder: Seeder = new Seeder(new Database(conn), records);
    seeder.seed();
});
