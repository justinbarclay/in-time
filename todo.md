# TO DO

* Write a to do app to manage to dos in the timesheet application

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

* Work on sending better messages to the client from the server, include an authentication/signup message and id token, maybe other things as necessary
-- User controller sends a JSON message with the keys...

* Refactor the user controller to pass JSON into callbacks
--- Done
* Refactor Router and Client side JS to expect JSON
-- Mostly done, need to check signup
* Create a style for the webpage using one of the CSS frameworks
--- Done
* Place all ajax controls into actions and not into the components themselves
--- Done
* Rename components and all dependencies from TSHeader and FTSFooter to nav and footer
--- Done
* Once logged in the system should open up a timesheet
--- Done
* Time sheet should post to database

* Rework router so that it has authentication built in and so I don't need to check on each component, I should be able to check one route fo all logged in components

* Upgrade router to beta v1.0

* After timesheet entry has been fully tested and expanded upon test in chai and mocha should be written for the api
-- this normally should be done beforehand, but I want a product to play with first before I worry about TDD

* Add ES6 support
-- http://advantcomp.com/blog/ES6Modules/

* Go from biff to redux for Flux implementation

* Begin to abstract out timesheets so that the dashboard that users see will show all the timesheets
--- Done
* Then when they click on a timesheet they can edit the data in a particular timesheet
--- Done
* Implement prepared queries for the controllers
-- I am not sure what this means anymore, but I believe I mean set up queries in postgres and then just pass the variables into them. This has the benefit of less SQL i need to manage appside

* Learn how to and implement a sanitation process for inputting data to the database

* Implement a better form of authentication throughout the app, possibly a Mixin like was shown in the react-router demos

* Hookup timesheets to server api

* Set-up app in Heroku

* Reorganize my to do list

* Fix Login system to send JWT in headers both ways and to store the JWT in local storage

* Style the web app to look passable, maybe just use bootstrap styles and learn sass
--- Done
* Set-up gulp preprocessing
--- Done
