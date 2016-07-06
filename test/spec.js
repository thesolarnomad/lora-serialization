const path = require('path');
const chai = require('chai');
const decoder = require(path.join(__dirname, '..', 'src', 'decoder.js'));

const expect = chai.expect;
chai.should();

describe('Decoder', () => {
    const unixtimeBytes = new Buffer([0x1d, 0x4b, 0x7a, 0x57]);
    const unixtime = 1467632413;

    describe('unixtime', () => {
        it('should yell at you if the buffer is omitted', () => {
            expect(() => decoder.unixtime()).to.throw;
        });
        it('should yell at you if the buffer size is incorrect', () => {
            expect(() => decoder.unixtime(new Buffer(2))).to.throw;
        });
        it('should be possible to decode a unixtime', () => {
            decoder
                .unixtime(unixtimeBytes)
                .should.be.equal(unixtime);
        });
    });

    const latLngBytes = new Buffer([0x64, 0xa6, 0xfa, 0xfd, 0x6a, 0x24, 0x04, 0x09]);
    const latLng = [-33.905052, 151.26641];

    describe('latLng', () => {
        it('should yell at you if the buffer is omitted', () => {
            expect(() => decoder.latLng()).to.throw;
        });
        it('should yell at you if the buffer size is incorrect', () => {
            expect(() => decoder.latLng(new Buffer(9))).to.throw;
        });
        it('should be possible to decode a coordinate', () => {
            decoder
                .latLng(latLngBytes)
                .should.be.deep.equal(latLng);
        });
    });

    const intBytes = new Buffer([0x9d, 0x5b]);
    const int = 23453;

    describe('int', () => {
        it('should yell at you if the buffer is omitted', () => {
            expect(() => decoder.int()).to.throw;
        });
        it('should yell at you if the buffer size is incorrect', () => {
            expect(() => decoder.int(new Buffer(1))).to.throw;
        });
        it('should be possible to decode an int', () => {
            decoder
                .int(intBytes)
                .should.be.equal(int);
        });
    });

    describe('decode', () => {
        it('should be able to compose decoder functions', () => {
            decoder
                .decode(
                    Buffer.concat([latLngBytes, unixtimeBytes]),
                    [
                        decoder.latLng,
                        decoder.unixtime
                    ]
                )
                .should.be.deep.equal({
                    0: latLng,
                    1: unixtime
                });
        });

        it('should yell at you if mask is longer than input', () => {
            expect(() => decoder.decode(new Buffer(7), [latLng])).to.throw;
        });

        it('should be able to take names', () => {
            decoder
                .decode(unixtimeBytes, [decoder.unixtime], ['time'])
                .should.be.deep.equal({
                    time: unixtime
                });
        });
    });
});
