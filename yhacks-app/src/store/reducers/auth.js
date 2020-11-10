import {updateObject} from "./utility";
import * as actionTypes from "../actions/actionTypes";


// initial state for a state i.e first time page loads with no authentication attemps
const initialState = {
    token: null,
    error: null,
    loading: null,
}

// sets loading to true because an authentication request has been sent
const authStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    })
}

// if the authentication request is successful, sets the token and sets loading to false
const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.token,
        error: null,
        loading: false
    })
}

// is the authentication request is not succesful, sets the error and sets loading to false
const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        token: action.token,
        loading: false
    })
}

// sets token to null for logout
const authLogout = (state, action) => {
    return updateObject(state, {
        token: null
    })
}

// reducers for the redux state
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        default:
            return state
    }
}

export default reducer

