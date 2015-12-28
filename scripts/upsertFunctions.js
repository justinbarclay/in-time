var pg = require('pg');
var config = require('../config.js');
var conString = config.postgres;

var client = new pg.Client(conString);

// Creat table and insert 2 records into it
function createFunctions() {
    client.connect();
    var upsertMeta =
        `CREATE FUNCTION upsert_meta(key TEXT, user_id INTEGER, sDate DATE, eDate DATE, engagement_num INTEGER, remove BOOLEAN ) RETURNS VOID AS
        $$
        BEGIN
            LOOP
                -- first try to update the key
                UPDATE timesheets_meta SET timesheet_id = key, user_foreignkey = user_id, start_date = sDate, end_date = eDate, engagement = engagement_num, delete = remove WHERE timesheet_id = key;
                IF found THEN
                    RETURN;
                END IF;
                -- not there, so try to insert the key
                -- if someone else inserts the same key concurrently,
                -- we could get a unique-key failure
                BEGIN
                    INSERT INTO timesheets_meta(timesheet_id, user_foreignkey, start_date, end_date, engagement, delete) VALUES (key, user_id, sDate, eDate, engagement_num, remove);
                    RETURN;
                EXCEPTION WHEN unique_violation THEN
                    -- do nothing, and loop to try the UPDATE again
                END;
            END LOOP;
        END;
        $$
        LANGUAGE plpgsql;`;

    var upsertTimesheet =
    `CREATE FUNCTION upsert_timesheet(key TEXT, id TEXT, description TEXT, duration REAL, sDate DATE, remove BOOLEAN ) RETURNS VOID AS
    $$
    BEGIN
        LOOP
            -- first try to update the key
            UPDATE timesheets SET service_description = description, service_date = sDate, service_duration = duration, delete = remove WHERE timesheet_foreignkey = key and row_id = id;
            IF found THEN
                RETURN;
            END IF;
            -- not there, so try to insert the key
            -- if someone else inserts the same key concurrently,
            -- we could get a unique-key failure
            BEGIN
                INSERT INTO timesheets(timesheet_foreignkey, row_id, service_description, service_date, service_duration, delete) VALUES (key, id, description, sDate,  duration, remove);
                RETURN;
            EXCEPTION WHEN unique_violation THEN
                -- do nothing, and loop to try the UPDATE again
            END;
        END LOOP;
    END;
    $$
    LANGUAGE plpgsql;`;

    try {
        client.query(upsertMeta);
        client.query(upsertTimesheet);
    } catch (error) {
        console.error("this is an error", error);
        return error;
    }

    setTimeout(function() {
        client.end();
        console.log("Success");
    }, 1000);
    return "Success";
}
module.exports = createFunctions;
