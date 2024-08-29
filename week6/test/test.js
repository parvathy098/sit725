var expect = require("chai").expect;
var request = require("request");

describe("Healthy Recipes Application", function() {
    
    // Test if the home page loads successfully
    describe("GET /", function() {
        it("returns status 200", function(done) {
            request("http://localhost:3055", function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
    });

    // Test if the form submission works correctly
    describe("POST /submit-form", function() {
        const formData = {
            name: "Salad",
            ingredients: "Lettuce, Tomato",
            instructions: "Chop and mix"
        };

        it("should save the recipe and redirect to home page", function(done) {
            request.post({
                url: "http://localhost:3055/submit-form",
                form: formData
            }, function(error, response, body) {
                expect(response.statusCode).to.equal(302); // Check if it redirects
                expect(response.headers.location).to.equal('/'); // Check if it redirects to the home page
                done();
            });
        });
    });
});
