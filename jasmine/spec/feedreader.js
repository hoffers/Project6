/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have a url', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have a name', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });


    /* A new test suite named "The menu" */
    describe('The menu', function() {
        /* A test that ensures the menu element is
         * hidden by default. This is done by checking that
         * the body element has the menu-hidden class.
         */
        it('is hidden by default', function() {
            expect($('body').attr("class")).toContain('menu-hidden');
        });
         /* A test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * first checks that the menu displays when
          * clicked and then checks that it hides when clicked again.
          */
        it('toggles when clicked', function() {
            $('.menu-icon-link').trigger('click');
            expect($('body').attr("class")).not.toContain('menu-hidden');
            $('.menu-icon-link').trigger('click');
            expect($('body').attr("class")).toContain('menu-hidden');
        });
    });
    /* A new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         * This test checks that there is at least one .entry-link within
         * the .feed container and that it has an href attribute defined.
         * It then checks that the .entry-link contains an .entry, which 
         * in turn contains a title in an h2 tag.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('are loaded after loadFeed() is called', function() {
            var entryLinks = $('.feed').children();
            expect(entryLinks).toBeDefined();
            expect(entryLinks.length).not.toBe(0);
            expect(entryLinks.attr("class")).toContain('entry-link');
            expect(entryLinks.attr("href")).toBeDefined();
            expect(entryLinks.attr("href").length).not.toBe(0);
            var entries = entryLinks.children();
            expect(entries).toBeDefined();
            expect(entries.length).not.toBe(0);
            expect(entries.attr("class")).toContain('entry');
            var titles = entries.children('h2');
            expect(titles).toBeDefined();
            expect(titles.length).not.toBe(0);
            expect(titles.html().length).not.toBe(0);
        });
    });
    /* A new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous. This test loads the 
         * feed at index 1 and saves the url and title of the first entry.
         * It then loads the feed at index 0 and compares the url and title
         * of the new first entry with the previously saved ones. Since a
         * different feed has been loaded, they should both be different.
         */
        var firstUrl = '';
        var firstTitle = '';

        beforeEach(function(done) {
            loadFeed(1, function() {
                firstUrl = $('.feed').children().attr("href");
                firstTitle = $('.feed').find('h2').html();
                loadFeed(0, done);
            });
        });

        it('actually changes the content', function() {
            expect($('.feed').children().attr("href")).not.toBe(firstUrl);
            expect($('.feed').find('h2').html()).not.toBe(firstTitle);
        });
    });

    /* A new test suite for a future feature that can be added after 
     * implementing a user login functionality and that requires a database.
     * For each user, the database will keep track of which articles the user
     * has read. When entries are loaded from a feed, articles are assigned the
     * .unread class. It will check the database to see if each article has been 
     * read and remove the .unread class those articles. CSS will style the unread
     * articles differently to make them stand out so that the user knows he has 
     * not yet read them. 
     */
    describe('Article Read Status', function() {
        
        beforeAll(function(done) {
            loadFeed(0, done);
        });
        /* A test that ensures when a feed is loaded that all articles are 
         * initially not read. This is assuming that it is the users first time
         * loading this feel ever.
         */
        xit('is unread by default', function() {
            $('.feed').children().each(function () {
                expect($(this).attr("class")).toContain('unread');
            });
        });
        /* A test that ensures when an article is clicked on by a user that
         * it is no longer marked as unread
         */
        xit('becomes read when selected', function() {
            $('.feed').children().each(function () {
                $(this).trigger('click');
                expect($(this).attr("class")).not.toContain('unread');
            });
        });
        /* A test that ensures when an article is clicked on again by a user
         * that it is still not marked as unread
         */
        xit('stays read when selected again', function() {
            $('.feed').children().each(function () {
                $(this).trigger('click');
                expect($(this).attr("class")).not.toContain('unread');
            });
        });
    });
}());
