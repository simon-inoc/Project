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
    it(`Should resturn status 200. With [
        "+1 416-568-1010",
        "+1 905-754-3344"
    ]`, () => {
        return chai.request(app)
            .post('/file')
            .set('Content-Type', 'text/plain;charset=base64')
            .attach('file', fs.readFileSync('test/test.txt'), ' ')
            .then(function (response) {
                expect(response).to.have.status(200);
                expect(response.body).to.contain("+1 416-568-1010","+1 905-754-3344");
            });
    });
});