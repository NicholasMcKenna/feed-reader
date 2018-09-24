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
    describe('RSS Feeds', function() {
        // Check allFeeds is defined and that there is some content
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // Loops through each feed and checks the url fits the criteria
        it('have a URL', function() {
            allFeeds.forEach(feed => {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        // Loops through each feed and checks the name fits the criteria
        it ('have a name', function() {
            allFeeds.forEach(feed => {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });

    describe('The menu', function() {
        it ('is hidden by default', function() {
            expect(document.body.classList.contains('menu-hidden')).toBe(true);
        });

        it('changes visibility when clicked', function() {
            // Use JQuery to simulate the click
            $('.menu-icon-link').trigger('click');
            expect(document.body.classList.contains('menu-hidden')).toBe(false);
            $('.menu-icon-link').trigger('click');
            expect(document.body.classList.contains('menu-hidden')).toBe(true);
        });
    });

    describe('Initial Entries', function() {
        // Load a feed before the tests
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        // Use JQuery to find the feed class and check there is more than zero children
        it('has loaded', function(done) {
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        });
    });

    describe('New Feed Selection', function() {
        // Before each test grab the current feed and save it so we can check against it later
        // We use the call back to check that the feed has finished loading via a callback
        let prevFeedData, newFeedData;

        beforeEach(function(done) {
            loadFeed(0, function() {
                prevFeedData = $('.feed').html();

                loadFeed(1, function() {
                    newFeedData = $('.feed').html();
                    done();
                });
            });
        });

        it('has changed feed successfully', function() {
            expect(prevFeedData).not.toBe(newFeedData);
        });
    });
}());