import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Button, Grid } from '@material-ui/core';
import MaskedInput from 'react-text-mask';
import PropTypes from 'prop-types';

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
    const data = {

    }

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

export default function UserDashboard() {
    const classes = useStyles();
    const [disabled, setDisabled] = React.useState(true)
    const [firstName, setFirstName] = React.useState("")
    const [lastName, setLastName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [phoneNumber, setValues] = React.useState('(  )    -    ');
    const [zipCodeValue, setZipCode] = React.useState();
    const [gender, setGender] = React.useState("N/A");
    const [birthdayValue, setBirthdayValue] = React.useState();
    const [changed, setChanged] = React.useState([])

    const buttonHandler = (event) => {
        event.preventDefault();
        if (disabled){
            setDisabled(false)
        } else {
            console.log("update")
            setDisabled(true)
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Update your account
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                disabled={disabled}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="lname"
                                name="lastName"
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                autoFocus
                                disabled={disabled}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="email"
                                name="email"
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                autoFocus
                                disabled={disabled}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                // error={!!phoneErrors.length > 0}
                                variant="outlined"
                                fullWidth
                                label="Phone Number"
                                required
                                // value={phoneNumber}
                                // onChange={handlePhoneNumChange}
                                name="numberformat"
                                id="formatted-numberformat-input"
                                // helperText={phoneErrors}
                                InputProps={{
                                    inputComponent: TextMaskCustom,
                                }}
                                disabled={disabled}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                required
                                label="Zip Code"
                                // value={zipCodeValue}
                                // onChange={handleZipChange}
                                name="numberformat"
                                id="formatted-numberformat-input"
                                disabled={disabled}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                // error={birthDayErrors.length > 0}
                                id="date"
                                label="Date of Birth"
                                type="date"
                                required
                                fullWidth
                                variant="outlined"
                                className={classes.textField + " " + classes.date}
                                // helperText={birthDayErrors}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                disabled={disabled}
                            // onChange={handleDOBChange}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={buttonHandler}
                    >
                        {disabled?"Edit":"Update"}
                    </Button>
                </form>
            </div>
        </Container>
    );
}