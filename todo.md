# TO DO

* Write a to do app to manage to dos in the timesheet application

* Hookup timesheets to server api

* Fix "about" component so it does not send AJAX unnecessarily
-- Right now it is used to test sending heads as auth method, should split this out to a function in auth

* Work on sending better messages to the client from the server, include an authentication/signup message and id token, maybe other things as necessary
-- User controller sends a JSON message with the keys...
-- This has been changed so that the server sends the JWT in the header.
-- What needs to happen now is that the authentication header is passed to the server and if it is valid it needs to send back the original token
--- Else if it is not valid it sets the authentication JWT header to false

* There should be a timesheet/new route that will hadle the creation of a new timesheet including the submit button
-- this might lead to the creation of a newTimesheet component
-- if so this component needs to handle users abandoning new timesheets
* Time sheet should post to database

* Rework router so that it has authentication built in and so I don't need to check on each component, I should be able to check one route fo all logged in components
-- Partly done, has a verify function that on verified token will return it and on err will return null

* Upgrade router to beta v1.0

* After timesheet entry has been fully tested and expanded upon test in chai and mocha should be written for the api
-- this normally should be done beforehand, but I want a product to play with first before I worry about TDD

* Add ES6 support
-- http://advantcomp.com/blog/ES6Modules/

* Go from biff to redux for Flux implementation

* Implement prepared queries for the controllers
-- I am not sure what this means anymore, but I believe I mean set up queries in postgres and then just pass the variables into them. This has the benefit of less SQL i need to manage appside

* Learn how to and implement a sanitation process for inputting data to the database

* Implement a better form of authentication throughout the app, possibly a Mixin like was shown in the react-router demos

* Set-up app in Heroku

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
