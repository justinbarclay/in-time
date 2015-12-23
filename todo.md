# TO DO

* Fix timesheet/:id bug where when it redirects to timesheets, timesheets does not update to show all timesheets
* Rework layout with Ivan

* rewrite database creation scripts, they need to include new columns and default values

* relook at JWT, need to know what user is requesting access to whose files
-- Meaning can a JWT reliably store in it the user who is looking for the data
* Permission system
-- Each user has a permission attribute with an array of numbers
-- Have a permission table that is a list of permission numbers that map to actions
-- This system allows for expandability and modularity
-- one problem is how to codify this in business logic
-- so far all I can think is that we will need to hardcode an action/permission in each route
-- Why do we need a permission system though?
--- This is a question I do not have an answer for yet.

* Write a to do app to manage to dos in the timesheet application

* Find a Javascript date picker

* Add a delete entry/timesheet system
-- Need to be able to delete meta timesheets


* Work on sending better messages to the client from the server, include an authentication/signup message and id token, maybe other things as necessary
-- User controller sends a JSON message with the keys...
-- This has been changed so that the server sends the JWT in the header.
-- What needs to happen now is that the authentication header is passed to the server and if it is valid it needs to send back the original token
--- Else if it is not valid it sets the authentication JWT header to false

* There should be a timesheet/new route that will handle the creation of a new timesheet including the submit button
-- this might lead to the creation of a newTimesheet component
-- if so this component needs to handle users abandoning new timesheets
-- Unsure of this for now


* Rework router so that it has authentication built in and so I don't need to check on each component, I should be able to check one route fo all logged in components
-- Partly done, has a verify function that on verified token will return it and on err will return null

* Upgrade router to beta v1.0

* After timesheet entry has been fully tested and expanded upon test in chai and mocha should be written for the api
-- this normally should be done beforehand, but I want a product to play with first before I worry about TDD

* Add ES6 support
-- http://advantcomp.com/blog/ES6Modules/

* Go from biff to redux for Flux implementation



* Learn how to and implement a sanitation process for inputting data to the database

* Implement a better form of authentication throughout the app, possibly a Mixin like was shown in the react-router demos

* Implement prepared queries for the controllers
-- Done

* Time sheet should post to database
-- Done

* Set-up app in Heroku
-- Done

* Fix "about" component so it does not send AJAX unnecessarily
-- Done

* Reorganize my to do list
--- Done

* Fix Login system to send JWT in headers both ways and to store the JWT in local storage
--- Done

* Style the web app to look passable, maybe just use bootstrap styles and learn sass
--- Done
* Set-up gulp preprocessing
--- Done

* Figure out how TimesheetID should work
-- it needs to be gauranteed unique per staff
-- Will have to handle calling to the server and verifying it's unique and rejecting it if not

* Begin to abstract out timesheets so that the dashboard that users see will show all the timesheets
--- Done

* Then when they click on a timesheet they can edit the data in a particular timesheet
--- Done

* Create a style for the webpage using one of the CSS frameworks
--- Done

* Place all ajax controls into actions and not into the components themselves
--- Done

* Rename components and all dependencies from TSHeader and FTSFooter to nav and footer
--- Done

* Once logged in the system should open up a timesheet
--- Done

* Set up build file to compile React and Stylesheets
--- Done
* Rewrite the homepage in React
--- Done

* Add a login system for the homepage
--- Done

* Make Signup and Signin use AJAX
-- SignIn is AJAXified, need to do some more proper error handling and pass messages for success
--- Done
-- Sing Up needs to AJAXified
--- Done

* Refactor the user controller to pass JSON into callbacks
--- Done

* Refactor Router and Client side JS to expect JSON
--- Done

* Hookup timesheets to server api
-- done
