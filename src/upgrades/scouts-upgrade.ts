
export const scoutsVersionUpgrades = [
    {
        toVersion: 1,
        statements: [
            `CREATE TABLE scouts (
                id varchar PRIMARY KEY NOT NULL,
                teamKey varchar NOT NULL,
                eventKey varchar NOT NULL,
                matchKey varchar NOT NULL,
                scoutName varchar NOT NULL,
                data varchar NOT NULL
            );`
        ]
    }
]