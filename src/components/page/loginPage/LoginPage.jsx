import React from 'react'
import Button from "@material-ui/core/Button";
import Header from "../../header/Header";
import axios from "axios";
import config from "../../../config";
import {Box, Container, Grid, Paper, Stack} from "@mui/material";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";
import styles from './LoginPage.module.scss'

const useStyles = (theme) => ({
    root: {
        top: "50%",

    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 24,
    },
    error: {
        fontSize: 18,
    },
    pos: {
        marginBottom: 12,
    },
    field: {
        marginBottom: 15
    }
});

const headers = {
    'Content-Type': 'application/json',
}

class LoginPage extends React.Component{
    state = {
        data: {
            username: '',
            password: ''
        },
        error: '',
        token: '',
        errorAlert: false
    }

    onChangeLoginInput = e => {
        this.setState({
            data: {
                ...this.state.data,
                [e.target.name]: e.target.value
            },
            error: ''
        })
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({errorAlert: false});
    };



    onLogin = e => {
        e.preventDefault()
        this.setState({errorAlert: false})
        const file = new FormData()
        file.append("username", this.state.data.username)
        file.append("password", this.state.data.password)
        axios
            .post(config.apiJavaUrl + '/login',
                {
                username: this.state.data.username,
                password: this.state.data.password
            }).then(({ data }) => {
            this.setState({
                token: data.token
            })
            localStorage.setItem('access_token', data.token)
            this.props.onLogin()
        })
            .catch(e => {
                this.setState({error: 'Invalid username or password!'})
                this.setState({errorAlert: true})
            })
    }

    render(){
        const { classes } = this.props;
        return (
            <div className={styles.container}>
                <Header returnUri='/start' onLogout={this.props.onReturnToStart}/>
                <div className={styles.loginBlock}>
                    <div className={styles.fieldBlock}>
                        <div className={styles.fields}>
                            <Box>
                                <Typography className={classes.title}>Логин</Typography>
                                <input
                                    className="signUp-input"
                                    required
                                    id="username"
                                    autoComplete="username"
                                    autoFocus
                                    name="username"
                                    value={this.state.data.username}
                                    onChange={this.onChangeLoginInput}
                                />
                            </Box>
                            <Box>
                                <Typography className={classes.title}>Пароль</Typography>
                                <input
                                    className="signUp-input"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    name="password"
                                    value={this.state.data.password}
                                    onChange={this.onChangeLoginInput}
                                />
                            </Box>
                            <div className="signInButton-container">
                                <div className="signInButton-center">
                                    <button
                                        className={styles.loginButton}
                                        onClick={this.onLogin}
                                    >
                                        Войти
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.state.errorAlert ? (
                        <Paper className={styles.loginError}>
                            <Typography className={classes.error}>Проверьте правильность написания введенных данных</Typography>
                        </Paper>
                    ): (
                        <div>

                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default withStyles(useStyles)(LoginPage);