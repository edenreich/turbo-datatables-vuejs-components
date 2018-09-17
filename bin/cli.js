#!/usr/bin/env node

const yargs = require('yargs');
const { exec } = require('child_process');

const argv = yargs
    .scriptName("datatables")
    .command("seed", "Seeds dummy data.", seedBuilder, seedRunner)
    .command("demo-server", "Runs a demo server on http://localhost:3000", demoServerRunner)
    .command("dist", "Copy the components into your project.", copyRunner)
    .help()
    .argv;

function seedBuilder(yargs)
{
    yargs.option("records", {
        describe: "Specify the amount of records for seeding.",
        type: "number"
    })
}

function seedRunner(argv)
{
    exec('npm run seed-data '+argv.records, function(err, stdout, stderr) {
        if (err) {
            console.error(err);
            process.exit(1);
        }

        console.log(stdout);
    });
}

function demoServerRunner()
{
    exec('npm run demo-server', function(err, stdout, stderr) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        
        
    });
}

function copyRunner()
{
    console.log("running copy..");
}
