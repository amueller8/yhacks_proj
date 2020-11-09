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
import { FormControl, FormLabel} from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

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

export default function SignUp() {
    const classes = useStyles();
    const [birthdayValue, setBirthdayValue] = React.useState();
    const [phoneNumber, setValues] = React.useState('(  )    -    ');
    const [zipCodeValue, setZipCode] = React.useState();
    const [gender, setGender] = React.useState("N/A");

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
        console.log(
            "gender: " + gender +
            "\nPhone Number: " + phoneNumber +
            "\nZip Code: " + zipCodeValue +
            "\nDOB: " + birthdayValue
        );
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
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                placeholder="Where should we contact you?"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                placeholder="Shh! Don't let anyone know this."
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="Confirmed Password"
                                placeholder="Retype the secret here."
                                label="Confirmed Password"
                                type="password"
                                id="confirmedPassword"
                                autoComplete="current-password"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="Phone Number"
                                value={phoneNumber.textmask}
                                onChange={handlePhoneNumChange}
                                name="numberformat"
                                id="formatted-numberformat-input"
                                InputProps={{
                                    inputComponent: TextMaskCustom,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="Zip Code"
                                value={phoneNumber.textmask}
                                onChange={handleZipChange}
                                name="numberformat"
                                id="formatted-numberformat-input"
                                InputProps={{
                                    inputComponent: ZipCodeCustom,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl className={classes.formControl}>
                                <FormLabel component="legend">Gender</FormLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={gender}
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
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="date"
                                label="Date of Birth"
                                type="date"
                                className={classes.textField + " " + classes.date}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={handleDOBChange}
                            />
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