let expect = require('chai').expect;
let chai = require('chai');
let app = require("../server.js");
let fs = require('fs');

chai.use(require('chai-http')); // to simulare http request

// GET - Root
describe("index request", () => {
    it('Should return html page', () => {
        return chai.request(app)
            .get('/')
            .then((res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
            });
    })
});

// POST - Root
describe('API POST request /file', () => {
    // We define what the test should return (BUT THIS PART IS FOR HUMANS ONLY)
    it(`Should resturn status 200. With [
        "+1 416-568-1010",
        "+1 905-754-3344"
    ]`, () => {
        // We make the request here
        return chai.request(app)
            // Request type is a post
            .post('/file')
            // We're setting the headers
            .set('Content-Type', 'text/plain;charset=base64')
            // We're attaching the file
            .attach('file', fs.readFileSync('test/test.txt'), ' ')
            // The 'then' is used to tell the code what to do with the value recieved
            // from the reqest
            .then(function (response) {
                // We define what we 'expect' the response to have
                expect(response).to.have.status(200);
                expect(response.body).to.contain("+1 416-568-1010","+1 905-754-3344");
            });
    });
});