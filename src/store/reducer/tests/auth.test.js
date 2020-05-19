import reducer from '../auth';
import * as actionTypes from '../../actions/actionTypes';

describe('auth reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({ //const reducer = (state = initialState, action) =>{ this is the reducer function at reducer/auth.js so that is what we are expecting to test
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    });

    it('should run authSuccess and return the updated reducer', () => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        }, {
            type: actionTypes.AUTH_SUCCESS,
            idToken: 'SOME-TOKEN',
            userId: 'SOME-USERID'
        })).toEqual({ //the test must only PASS if the credentials sent and the updated toEqual({reducer}) be equal
            token: 'SOME-TOKEN',
            userId: 'SOME-USERID',
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    });
});