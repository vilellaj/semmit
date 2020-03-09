const assert = require('assert');
const { getCommitMessage } = require('../lib/semmit')

describe('Semmit', () => {
    describe('#getCommitMessage()', () => {
        it('should return type(scope): message when all parameters are passed', () => {
            const expected = "type(scope): message";
            const params = {
                type: 'type',
                scope: 'scope',
                message: 'message'
            }

            assert.equal(getCommitMessage(params), expected);
        });

        it('should return type: message when scope is omitted', () => {
            const expected = "type: message";
            const params = {
                type: 'type',
                scope: '',
                message: 'message'
            }

            assert.equal(getCommitMessage(params), expected);
        });
    });
});