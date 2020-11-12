import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import { FormControl, FormLabel } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from "react-redux"
import { Redirect, withRouter } from "react-router";
import * as actions from "../../store/actions/auth";


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    date: {
        alignItems: 'left',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

function TextMaskCustom(props) {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={(ref) => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
            placeholderChar={'\u2000'}
            showMask
        />
    );
}

function ZipCodeCustom(props) {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={(ref) => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={[/\d/, /\d/, /\d/, /\d/, /\d/]}
            placeholderChar={'\u2000'}
            showMask
        />
    );
}

TextMaskCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
};

ZipCodeCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
};

function SignUp(props) {
    if (localStorage.getItem("token") && !props.token) {
        props.checkState()
    }

    const classes = useStyles();
    const [firstName, setFirstName] = React.useState("")
    const [lastName, setLastName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [password1, setPassword1] = React.useState("")
    const [password2, setPassword2] = React.useState("")
    const [birthdayValue, setBirthdayValue] = React.useState();
    const [phoneNumber, setValues] = React.useState('(  )    -    ');
    const [zipCodeValue, setZipCode] = React.useState();
    const [gender, setGender] = React.useState("N/A");
    const [emailErrors, setEmailErrors] = React.useState("")
    const [passwordErrors, setPasswordErrors] = React.useState("")
    const [birthDayErrors, setBirthDayErrors] = React.useState("")
    const [phoneErrors, setPhoneErrors] = React.useState("")


    const handleFirstNameChange = event => {
        setFirstName(event.target.value)
    }

    const handleLastNameChange = event => {
        setLastName(event.target.value)
    }

    const handleEmailChange = event => {
        setEmail(event.target.value)
    }

    const handlePassword1Change = event => {
        setPassword1(event.target.value)
    }

    const handlePassword2Change = event => {
        setPassword2(event.target.value)
    }

    const handlePhoneNumChange = (event) => {
        setValues(event.target.value);
    };

    const handleGenderChange = event => {
        setGender(event.target.value)
    }

    const handleZipChange = (event) => {
        setZipCode(event.target.value);
    };

    const handleDOBChange = (event) => {
        setBirthdayValue(event.target.value)
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();
        props.signUp(firstName, lastName, email,
            birthdayValue, phoneNumber, gender, zipCodeValue, password1, password2)
        while (props.loading) {
            props.checkState()
        }
        setTimeout(() => {
            setEmailErrors(localStorage.getItem("email_errors"))
            setPasswordErrors(localStorage.getItem("password_errors"))
            setBirthDayErrors(localStorage.getItem("birth_day_errors"))
            setPhoneErrors(localStorage.getItem("phone_errors"))
        }, 400)
    }

    if (localStorage.getItem("token") === props.token && props.token) {
        return <Redirect to="/dashboard" />
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar>:)</Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                placeholder="John"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                value={firstName}
                                onChange={handleFirstNameChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                placeholder="Doe"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                value={lastName}
                                onChange={handleLastNameChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={emailErrors.length > 0}
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                placeholder="Where should we contact you?"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={email}
                                onChange={handleEmailChange}
                                helperText={emailErrors}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={passwordErrors.length > 0}
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                placeholder="Shh! Don't let anyone know this."
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password1}
                                onChange={handlePassword1Change}
                                helperText={passwordErrors}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={passwordErrors.length > 0}
                                variant="outlined"
                                required
                                fullWidth
                                name="Confirmed Password"
                                placeholder="Retype the secret here."
                                label="Confirmed Password"
                                type="password"
                                id="confirmedPassword"
                                autoComplete="current-password"
                                value={password2}
                                onChange={handlePassword2Change}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={!!phoneErrors.length > 0}
                                variant="outlined"
                                fullWidth
                                label="Phone Number"
                                value={phoneNumber}
                                required
                                onChange={handlePhoneNumChange}
                                name="numberformat"
                                id="formatted-numberformat-input"
                                helperText={phoneErrors}
                                InputProps={{
                                    inputComponent: TextMaskCustom,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                required
                                label="Zip Code"
                                value={zipCodeValue}
                                onChange={handleZipChange}
                                name="numberformat"
                                id="formatted-numberformat-input"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={birthDayErrors.length > 0}
                                id="date"
                                label="Date of Birth"
                                type="date"
                                required
                                variant="outlined"
                                fullWidth
                                className={classes.textField + " " + classes.date}
                                helperText={birthDayErrors}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={handleDOBChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl className={classes.formControl}>
                                <FormLabel component="legend">Gender</FormLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={gender}
                                    required
                                    fullWidth
                                    onChange={handleGenderChange}
                                >
                                    <MenuItem value={"N/A"}>_</MenuItem>
                                    <MenuItem value={"Male"}>Male</MenuItem>
                                    <MenuItem value={"Female"}>Female</MenuItem>
                                    <MenuItem value={"Non-Binary"}>Non-Binary</MenuItem>
                                    <MenuItem value={"Transgender"}>Transgender</MenuItem>
                                    <MenuItem value={"Intersex"}>Intersex</MenuItem>
                                    <MenuItem
                                        value={"I prefer not to say"}
                                    >
                                        I prefer not to say
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={onSubmitHandler}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}

const mapStateToProps = state => {
    return {
        loading: state.loading,
        error: state.error,
        token: state.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signUp: (first_name, last_name, email,
            birth_day, phone, gender, zipcode,
            password1, password2) => dispatch(actions.authSignUp(
                first_name, last_name, email,
                birth_day, phone, gender, zipcode,
                password1, password2)),
        checkState: () => dispatch(actions.checkState())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp))