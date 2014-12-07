# Project Overview

This is a web-based application that reads RSS feeds. The original developers of this application clearly saw the value in testing, they've already included [Jasmine](http://jasmine.github.io/) and even started writing their first test suite! Unfortunately, they decided to move on to start their own company and I was left with an application with an incomplete test suite. I completed the four test suites that the developers had thought of, which include seven specs.

I also added a new test suite for a future feature that could be added after implementing a user login functionality and that requires a database. For each user, the database will keep track of which articles the user has read. When entries are loaded from a feed, articles are assigned the .unread class. It will check the database to see if each article has been read and remove the .unread class from those articles. CSS will style the unread articles differently to make them stand out so that the user knows he has not yet read them. The three specs in this suite are marked as pending, so they do not run when you open the application.

To open the application, simply open the index.html file in your favorite web browser. You can click on the menu icon in the top, left of the screen to view a list of RSS feeds that you can select. After selecting one, you will see that feed's articles appear in the main screen.

To view the test suites, open feedreader.js in your favorite javascript editor.