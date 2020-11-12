import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Button, FormControl, FormLabel, Grid} from '@material-ui/core';
import MaskedInput from 'react-text-mask';
import PropTypes from 'prop-types';
import MyAppBar from "../../components/menuBar";
import {linkHead} from "../../store/actions/auth"
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import * as actions from "../../store/actions/auth";
import {Redirect, withRouter} from "react-router";
import {connect} from "react-redux";


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

function UserDashboard(props) {
    const classes = useStyles();
    const [disabled, setDisabled] = React.useState(true)
    const [mounted, setMounted] = React.useState(false)
    const [firstName, setFirstName] = React.useState("")
    const [lastName, setLastName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [phoneNumber, setValues] = React.useState('(  )    -    ');
    const [zipCodeValue, setZipCode] = React.useState();
    const [gender, setGender] = React.useState("N/A");
    const [changed, setChanged] = React.useState(new Set())
    const [birthDay, setBirthDay] = React.useState()

    if (localStorage.getItem("token") && !props.token) {
        props.checkState()
    }

    else if (!localStorage.getItem("token") || !(localStorage.getItem("token") === props.token)) {
        return <Redirect push to="/login" />
    }

    const data = {
        "type": "auth",
        "token": localStorage.getItem("token"),
        "link_url": `${linkHead}/auth/`,
    }

    if(!mounted) {
        fetch(`${linkHead}/auth/`, {
            'method': 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": localStorage.getItem("token"),
            },
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                setEmail(data.email)
                setFirstName(data.first_name)
                setLastName(data.last_name)
                setGender(data.gender)
                setValues(data.phone)
                setBirthDay(data.birth_day)
            })
            .catch(err => {
                console.log(err)
            })
        setMounted(true)
    }

    const buttonHandler = (event) => {
        event.preventDefault();
        if (disabled){
            setDisabled(false)
        } else {
            let newData = {"request_type":"put"}
            for(let field of changed) {
                console.log(field)
                if (field === "firstName") newData["first_name"] = firstName
                if(field === "last_name") newData["lastName"] = lastName
                if(field === "email") newData["email"] = email
                if(field === "phone") newData["phone"] = phoneNumber
                if (field === "gender") newData["gender"] = gender
            }
            console.log(newData)
            setTimeout(() => {
                props.socket.send(JSON.stringify({
                    ...data,
                    ...newData
                }))
            }, 300)
            setDisabled(true)
        }
    };

    const handleChangingFields = field => {
        const set = changed
        set.add(field)
        setChanged(set)
    }

    const handleFirstName = e => {
        const {value} = e.target
        setFirstName(value)
        handleChangingFields("firstName")
    }
    const handleLastName = e => {
        const {value} = e.target
        setLastName(value)
        handleChangingFields("lastName")
    }

    const handleGender = e => {
        const {value} = e.target
        setGender(value)
        handleChangingFields("gender")
    }

    const handleEmail = e => {
        const {value} = e.target
        setEmail(value)
        handleChangingFields("email")
    }

    const handlePhone = e => {
        const {value} = e.target
        setValues(value)
        handleChangingFields("phone")
    }

    return (
        <div>
            <MyAppBar {...props} isProfile={true}/>
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
                                    onChange={handleFirstName}
                                    disabled={disabled}
                                    value={firstName}
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
                                    onChange={handleLastName}
                                    disabled={disabled}
                                    value={lastName}
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
                                    onChange={handleEmail}
                                    disabled={disabled}
                                    value={email}
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
                                    onChange={handlePhone}
                                    disabled={disabled}
                                    value={phoneNumber}
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
                                    value={zipCodeValue}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl className={classes.formControl}>
                                    <FormLabel component="legend">Gender</FormLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        required
                                        fullWidth
                                        onChange={handleGender}
                                        disabled={disabled}
                                        value={gender}
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
                                    value={birthDay}
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
        </div>
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
        checkState: () => dispatch(actions.checkState()),
        logout: () => dispatch(actions.logout())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserDashboard))