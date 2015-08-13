// For this review, I just started at the top and read down. So, I learned about ideas in the order that they were written. Which means.. there were some things I was a bit confused about until I hit the bottom. That's my fault, and it means I didn't end up doing as good a review as I could have. I should have done a few passes through the code — a skim, and then a quick read, and then a thorough sweep. I will come back to this code again and do another review. When I do that, I'll probably start with the tests and follow the flow of execution.

// If you see something like: (edit: blah blah) in the middle of a comment, that is a note that I came back and added after reading though the whole thing.

// I deleted all your comments, so any comments you see are my thoughts about things.

// Some of my comments are simple things, little tips and such. Some of them are big crazy "THIS IS ALL WRONG OH MY GOD AHHH" rants. Sorry?



"use strict";

var config = require("../../../config.json");
var pg = require('pg');
var conString = config.postgres;
var uuid = require('uuid').v4;


// Large time values are often easier to read if you write them like: 10 * 1000;
// It's easier to tell at a glance that that is 10 seconds, expressed in milliseconds.
// Granted, this makes MUCH more of a difference with very large values, eg:
// pg.defaults.poolIdleTimeout = 7 * 24 * 60 * 60 * 1000;

pg.defaults.poolIdleTimeout = 10000;




// This code risks introducing a race condition, since you are mutating the `data` object asynchronously.
// Even though you don't do this, it is possible to write some other code that goes looking for the
// `client` or `done` fields on the `data` object, before they exist. It might be better to create a new object,
// which has fields for `client`, `done`, and `data`. You would then resolve the promise with that new object.
// Then you can be sure that nobody will use `data` incorrectly.

let connect = function(data) {
    return new Promise(function(resolve, reject) {
        pg.connect(conString, function(err, client, done) {
            if (err) {
                throw new Error(err, 37);
            } else {
                data.client = client;
                data.done = done;
                resolve(data);
                // Instead of the above, I'd do this:
                // resolve({
                //     data: data,
                //     done: done,
                //     client: client
                // });
            }
        });
    });
};





function error(err) {
    console.error(err);
}

function finish(data) {
    console.log(data.entries);
    data.done();
    data.client.end();
    return data;
}



// This function does (edit: and many of the functions following it do) quite a few different kinds of things.
// It mixes "arrangement" and "work". It might be better to split it up into a few smaller pure functions that do work,
// and then a few impure functions that do arrangement. (edit: I provide an example of this later on)


let createMetaData = function(timesheet) {

    return new Promise(function(resolve, reject) {
        let queryString =
            "INSERT INTO Timesheets_Meta (timesheet_id, user_foreignkey, start_date, end_date, engagement) VALUES($1, $2, $3, $4, $5)";

        // The following 3 lines are kinda messily formatted.
        let metaTimesheet = [timesheet.timesheetID, timesheet.userID,
            timesheet.start_date,
            timesheet.end_date, timesheet.engagement
        ];

        // These next two lines are also a bit messy.
        timesheet.client.query(queryString, metaTimesheet, function(
            err, result) {
            if (err) {

                // You probably shouldn't refer to line numbers from your code. It's a bit smelly.
                // The fact that your code is text in a file is totally incidental to the problem at hand.
                // If you need to know where the error is happening.. throw an error (which you do) and then
                // use the stack trace. Or use an error message that describes this particular failure.
                console.log("error line 68");
                throw new Error(err);
            } else {
                resolve(timesheet);
            }
        });
    });
};


// In theory, I like that all of these functions are asynchronous, and that they all return promises.
// I have no idea if it's nice to work with, but it seems like a good idea to me. (edit: it does look quite nice, now having seen below where these functions get used)
// I like that, reading the code, the first thing I see is the `return new Promise` part.
// It makes it very easy to understand how I would use this function.
function addEntries(timesheet) {
    return new Promise(function(resolve, reject) {
        let entries = timesheet.entries;
        let total = 0;
        entries.forEach(function(row) {
            var queryString =
                "INSERT INTO Timesheets (timesheet_foreignkey, service_duration, service_description, service_date) VALUES($1, $2, $3, $4)";

            var entry = [
                row.timesheet_foreignkey, row.service_duration,
                row.service_description, row.service_date
            ];
            timesheet.client.query(queryString, entry, function(
                err, result) {
                total += 1;
                if (err) {
                    console.log("error line 93");
                    throw new Error(err);
                } else {

                    // I really don't like this way of figuring out if all of your queries have completed.

                    // (That is — using a shared counter variable, `total`, and going `total += 1` in each
                    // of your callbacks, and then checking to see if it's equal to the length of your array.

                    // Doing it this way makes it very difficult to predict what will happen, since the `total`
                    // variable is shared by a bunch of different callbacks that are executed asynchronously.

                    // This kind of asynchrony is not much different than multithreaded code, so you have all the same risks
                    // as multithreaded code using shared mutable state.

                    // For instance, it is possible that one of your callbacks might never fire, or that one
                    // might fire twice. It's also possible that you might decide to add a failure mode where
                    // you retry if the request times out, and that'll be really hard to implement on top of
                    // this pattern in a way where you are guaranteed to know how it will behave. It's also
                    // really tricky to scale-up this pattern to work in more complicated situations.

                    // I'd much prefer to see you create a bunch of different promises, one for each query,
                    // and then join them all together into one big promise, which is what you return from addEntries.

                    // (I'm presuming the Promises system that you are using supports this joining feature —
                    // Angular promises had it, and JQuery promises did too, IIRC. Angular's was called $q.all())

                    // Alternatively, you could use some recursive functions that run each query in series,
                    // rather than in parallel. That approach might be easier to work with, in exachange
                    // for slightly worse performance.

                    // Alternatively, you could use a hash table to track which queries have finished.
                    // Hashes would be more immune to bugs around retries / double fires.
                    // Or there are other solutions, for other priorities. For the purposes of this code review,
                    // this particular bit is the scariest thing I've seen so far, and would be the most worth
                    // thinking about other ways to handle.


                    if (total === entries.length) {
                        resolve(timesheet);
                    }
                }
            });
        });
    });
}


function getTimesheetIDs(data) {

    let userID = data.userID;


    // "My Kingdom for a strong type system!"

    if (userID !== parseInt(userID, 10)) {
        throw new Error("UserID is not an Int");
    }

    // But seriously.. this might be the wrong place to check if userID is an Int.
    // The best place to check is wherever the userID first enters your system, not
    // the place where you use it.

    // If you make that change, then you can delete this "guard" code at the top of this
    // function, and it becomes nice and consistent with the other async functions —
    // starting right off the bat with that lovely `return new Promise` pattern.

    // In general, the last three functions (including this one) have been very consistent
    // in their structure. I like that a lot. It makes it very easy to read this code.

    return new Promise(function(resolve, reject) {
        let queryString =
            "SELECT timesheet_id, start_date, end_date, engagement FROM Timesheets_Meta WHERE user_foreignkey=" +
            userID;
        data.client.query(queryString, function(err, result) {
            if (err) {
                throw new Error(err, 157);
            } else {
                console.log(
                    "Meta information succesfully selected"
                );
                data.meta = result.rows;
                resolve(data);
            }
        });
    });
}

function getEntries(data) {

    let timesheetIDs = data.meta.map(function(meta) {
        return meta.timesheet_id;
    });

    let total = 0;

    // Again, it might be nice if getEntries() returned a new array (or, rather — returned a promise that resolved
    // with a new entries array), rather than mutating the passed-in `data` object.
    // (edit — but I see that it would break your pattern of passing the data object through a bunch of chained these promise-oriented functions in sequence. Still, this is one place where the current design is forcing you to do some evil mutation.)
    data.entries = [];


    return new Promise(function(resolve, reject) {
        timesheetIDs.forEach(function(timesheetID) {
            let queryString =
                "SELECT * FROM Timesheets WHERE timesheet_foreignkey ='" +
                timesheetID + "'";
            data.client.query(queryString, function(err, result) {

                // Why are you using ++ here and +=1 up above? Pick one style and stick with it! ;)
                total++;


                if (err) {

                    // Same goes with the line numbers. Ignoring the fact that I think they're bad and you
                    // shouldn't use them at all.. if you are going to use them, pick one style and stick with it!
                    // Elsewhere, you had no line number in the Error() constructor, and instead it was in the
                    // console.log("error on line XX") statement. Inconsistency!!! Foul!!!
                    console.error(err);
                    throw new Error(err, 146);


                } else if (result.rows.length > 0) {
                    data.entries.push(result.rows);
                    if (total === timesheetIDs.length) {
                        console.log("getEntries 181"); // This is, in my books, the one acceptable use of line numbers in code.
                        resolve(data);
                    }
                }
            });
        });
    });
}

// You had written the following comment:

// I am unsure if this is the proper way to do this.
// It may be better to have a singular query with a join in it so that

// .... so that.... ??????? THE SUSPENSE! IS KILLING ME! * drama *






// This function is different than the functions above it, and below it.
// It does not seem to return a promise. It seems to be a helper function.
// It ALMOST qualifies as a pure function — which would be awesome — but
// you have `entries.slice(index, 1)` which is destructively mutating `data`,
// which makes me sad. It'd be nice if you could refactor this into a pure function,
// and then move it do a different place in your file, so that it doesn't interrupt
// the nice stretch of async data reading/writing functions above and below it.
function buildTimesheets(data) {
    let meta_info = data.meta;
    let entries = data.entries;

    let timesheets = meta_info.map(function(meta) {
        let timesheet = {};
        timesheet = meta.timesheetID;
        timesheet.entries = [];
        entries.forEach(function(entry, index) {
            if (entry.timesheetID === timesheet.timesheetID) {
                timesheet.entries.push(entry);
                entries.slice(index, 1);
            }
        });
    });
    console.log(timesheets);
    return timesheets;
}




// The next two functions are exactly the same as one another, except for the query string.
// You could just... make them the same function, and pass in the query string as an argument.
// See below for an example.

function deleteTimesheetEntries(data) {
    return new Promise(function(resolve, reject) {
        data.delete.forEach(function(index) {
            data.client.query(
                "DELETE FROM Timesheets WHERE timesheet_foreignkey=$1", [
                    index
                ],
                function(err, result) {
                    if (err) {
                        console.error(
                            'error deleting query into timesheet',
                            err);
                        throw new Error(err, 209);
                    } else {
                        console.log(
                            "Timesheet succesfully deleted  "
                        );
                        resolve(data);
                    }
                });
        });
    });
}

function deleteTimesheetMeta(data) {
    return new Promise(function(resolve, reject) {
        data.delete.forEach(function(index) {
            data.client.query(
                "DELETE FROM Timesheets_Meta WHERE timesheet_id=$1", [
                    index
                ],
                function(err, result) {
                    if (err) {
                        console.error(
                            'error deleting query into timesheet',
                            err);
                        throw new Error(err, 209);
                    } else {
                        console.log(
                            "Timesheet succesfully deleted  "
                        );
                        resolve(data);
                    }
                });
        });
    });
}


// The above two functions could be refactored into the following.
// There are MANY different ways to refactor them.
// What I'm doing here is a little bit of "separating arrangement from work",
// which is one way of introducing abstraction. The arrangement happens in the
// two functions `deleteTimesheetEntries` and `deleteTimesheetMeta`.
// The work happens in `performQueries`.
// The `performQueries` function could be abstracted even further, and made much more general,
// and thus made useful for many other functions to use... rather than repeating the
// same basic data->promise->if-error-else-resolve pattern in a whole bunch of places.

function performQueries(data, queries, client, queryString, errorMessage) {
    return new Promise(function(resolve, reject) {
        queries.forEach(function(index) {
            client.query(query, [index], function(err, result) {
                if (err) {
                  console.error(errorMessage, err);
                  throw new Error(err);
                } else {
                  resolve(data);
                }
            });
        });
    });
}

function deleteTimesheetEntries(data) {
    let queryString = "DELETE FROM Timesheets WHERE timesheet_foreignkey=$1";
    let errorMessage = "error deleting query into timesheet";
    return performQueries(data, data.delete, data.client, queryString, errorMessage);
}

function deleteTimesheetMeta(data) {
    let queryString = "DELETE FROM Timesheets_Meta WHERE timesheet_id=$1";
    let errorMessage = "error deleting query into timesheet";
    return performQueries(data, data.delete, data.client, queryString, errorMessage);
}

// END IVAN'S REFACTORED VERSIONS







// Mmmmmmm. This is why promise-oriented code is so nice to read. Oh baby.
// A nice, linear flow of transformations written out in order. Such a pleasure.

// NOW I can see why you were passing that "data" object through all those promises,
// and mutating it within each one. I still don't think it's a good idea, but prior
// to reading this code, I had no idea what the "data" object was. It was opaque.

// I _STILL_ don't know what the data object is, but at least now I can see more of
// how you're using it.

// In some of your comments, it seems that you are unhappy passing this data object around.
// Perhaps, when we get together, we could look at some other alternatives.


function createTimesheet(data) {
    connect(data)
        .then(createMetaData)
        .then(addEntries)
        .then(function(timesheet) {
            console.log("Timesheet for " + timesheet.userID +
                " entered into database at " + new Date());
            return timesheet;
        })
        .then(finish)
        .catch(error);

}

function getTimesheets(request, res, callback) {
    connect(request)
        .then(getTimesheetIDs)
        .then(getEntries)
        .then(Promise.resolve(buildTimesheets))
        .catch(error)
        .then(finish)
        .then(callback);

}

function deleteTimesheets(request, res, callback) {
    connect(request)
        .then(deleteTimesheetEntries)
        .then(deleteTimesheetMeta)
        .catch(error)
        .then(finish)
        .then(callback);
}




// I deleted your tests section because, tonight, I don't have time to go through it.... which is unfortunate, because it looked like it would answer some of my uncertainty about what the "data" object looks like in practice.
