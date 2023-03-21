
export const scoutsVersionUpgrades = [
    {
        toVersion: 1,
        statements: [
            `CREATE TABLE scouts (
                id varchar PRIMARY KEY NOT NULL,
                team_key varchar NOT NULL,
                event_key varchar NOT NULL,
                match_id varchar NOT NULL,
                scout_name varchar NOT NULL,
                data varchar NOT NULL
            );`
        ]
    }
]