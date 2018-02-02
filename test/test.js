let expect = require('chai').expect;
let chai   = require('chai');
let app    = require("../server.js");
let fs     = require('fs');

chai.use(require('chai-http')); // to simulare http request

describe("index request", ()=>{
    it('Should return html page', () => {
        return chai.request(app)
            .get('/')
            .then((res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
            });
    })
});