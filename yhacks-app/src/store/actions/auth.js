import * as actionTypes from "./actionTypes"
const targetLink = "http://localhost:8000/api/auth/"

// back end link head for any none socket proctored API calls
export let linkHead = "http://localhost:8000/api"

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = token => {
    localStorage.removeItem("errorType")
    localStorage.removeItem("authError")
    localStorage.removeItem("serverError")
    localStorage.removeItem("email_errors")
    localStorage.removeItem("password_errors")
    localStorage.removeItem("birth_day_errors")
    localStorage.removeItem("phone_errors")
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: `Token ${token}`
    }
}

export const authFail = error => {
    localStorage.removeItem("token")
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
        token: null,
    }
}

export const logout = () => {
    localStorage.removeItem("token")
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authLogin = (email, password) => {
    return dispatch => {
        dispatch(authStart())
        fetch(targetLink, {
            'method': 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then(res => res.json())
            .then(data => {
                // parse and throw any error messages here
                const errorType = data["Error"]
                if (errorType === "1") {
                    const authError = data["Authentication Error"]
                    localStorage.setItem("errorType", errorType)
                    localStorage.setItem("authError", authError)
                    throw Error("Bad Input")
                }
                else if (errorType === "2") {
                    const authError = data["Authentication Error"]
                    localStorage.setItem("errorType", errorType)
                    localStorage.setItem("authError", authError)
                    throw Error("Bad Input")

                }
                else if (errorType === "3") {
                    const serverError = data["Server Error"]
                    localStorage.setItem("errorType", errorType)
                    localStorage.setItem("serverError", serverError)
                    throw Error("Bad Input")

                }
                else if (errorType === "4") {
                    const authError = data["Authentication Error"]
                    localStorage.setItem("errorType", errorType)
                    localStorage.setItem("authError", authError)
                    throw Error("Bad Input")
                }

                // if no error retrieve token; check if token was give and put it in local storage
                const token = data.token
                if (token) {
                    localStorage.setItem("token", `Token ${token}`)
                    dispatch(authSuccess(token))
                }
            })
            .catch(err => {
                dispatch(authFail(err))
            })
    }
}

export const authSignUp = (
    first_name, last_name, email,
    birth_day, phone, gender, zipcode, password1, password2) => {

    return dispatch => {
        dispatch(authStart())
        fetch(targetLink, {
            'method': 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                first_name: first_name,
                last_name: last_name,
                email: email,
                birth_day: birth_day,
                phone: phone,
                gender: gender,
                zipcode: zipcode,
                password1: password1,
                password2: password2
            })
        }).then(res => res.json())
            .then(data => {
                // parse and throw errors here
                const { email_errors, password_errors, birth_day_errors, phone_errors } = data
                if (email_errors) localStorage.setItem("email_errors", email_errors)
                if (password_errors) localStorage.setItem("password_errors", password_errors)
                if (birth_day_errors) localStorage.setItem("birth_day_errors", birth_day_errors)
                if (phone_errors) localStorage.setItem("phone_errors", phone_errors)
                if (email_errors || password_errors || birth_day_errors || phone_errors) throw Error("Bad Input")

                // if no error retrieve token; check if token was give and put it in local storage
                const token = data.token
                if (token) {
                    localStorage.setItem("token", `Token ${token}`)
                    dispatch(authSuccess(token))
                }
            })
            .catch(err => {
                dispatch(authFail(err))
            })
    }
}

export const checkState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (token === undefined) {
            dispatch(logout());
        }
        else {
            dispatch(authSuccess(token));
        }
    }
}