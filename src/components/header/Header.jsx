import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import {Box} from "@mui/material";
import mainLogo from "../../assets/img/Group 43.png";
import {Link} from "react-router-dom";
import styles from './Header.module.scss'

const useStyles  = theme =>({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        fontSize: '30px'
    },
    contacts: {
        paddingLeft: '779px',
        fontSize: '24px'
    },
    about: {
        fontSize: '24px'
    },
    bar: {
        paddingLeft: "0px"
    }
})



class Header extends React.Component{
    state = {
        isOpenMenu: false,
        isOpenStats: false
    }

    onLogout = () => {
        this.props.onLogout();
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={styles.header}>
                <div>
                    <img src={mainLogo} alt="Kitty Katty!" className="user-image image-block"/>
                </div>
                <div>
                    <button
                        className={styles.logoutButton}
                        onClick={this.onLogout}
                    >
                        выйти из системы
                    </button>
                </div>
             </div>
        );
    }
}

export default withStyles(useStyles)(Header);