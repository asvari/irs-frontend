import React from 'react'
import {withStyles} from '@material-ui/core/styles';
import Header from '../../header/Header';
import Typography from "@material-ui/core/Typography";
import {Container, Popover, Stack} from "@mui/material";
import logo1 from "../../../assets/img/Ikonka_4.png"
import logo2 from "../../../assets/img/Ikonka_3.png";
import axios from "axios";
import config from "../../../config";
import ThemeTable from "../../blocks/ThemeTable";
import Button from "@mui/material/Button";
import {Dropdown} from "react-bootstrap";
import DropdownItem from "react-bootstrap/DropdownItem";
import ArticlePage from "../articlePage/ArticlePage";
import styles from "./ThemePage.module.scss"
import {Link} from "react-router-dom";


const useStyles  = theme =>({
    root: {
        flexGrow: 1,
        margin: '50px'
    },
    button: {
        backgroundColor: ""
    },
    logo: {
        width: "16px",
        height: "16px"
    },
    menu: {
        width: "90%"
    }
})

class ThemePage extends React.Component{
    state = {
        currentUser: null,
        themes: [],
        program: null,
        anchorEl: null,
        themeData: {
            name: null
        },
        errorAlert: false,
        changingId: null,
        isStudent: false,
        openedArticle: null,
        findValue: null,
        addThemeBlockOpened: false
    }

    componentDidMount() {
        this.getUserInfo()
        this.getAllThemesById()
    }


    getUserInfo = () => {
        return axios
            .get(config.apiJavaUrl + '/user/info')
            .then(res => {
                this.setState({
                    currentUser: res.data,
                    isStudent: res.data.roleName === "Студент"
                })
            })
            .catch(e => {
                this.setState({
                    currentUser: null
                })
                this.getUserInfo()
            })
    }

    getAllThemesById = () => {
        axios
            .get(config.apiJavaUrl + '/header/all/subject/' + window.location.pathname.split("/")[2])
            .then(res => {
                this.setState({
                    themes: res.data.headerList,
                    program: res.data.subjectName
                })
            })
            .catch(e => {
                this.setState({
                    themes: null
                })
            })
    }

    onAddNewTheme = () => {
        this.setState({
            errorAlert: false,
            addThemeBlockOpened: false
        })
        axios
            .post(config.apiJavaUrl + '/header/add',
                {
                    name: this.state.themeData.name,
                    subjectId: window.location.pathname.split("/")[2]
                }).then(({ data }) => {
            this.setState({
                themes: [...this.state.themes, data]
            })
        })
            .catch(e => {
                this.setState({errorAlert: true})
            })
    }

    onChangeThemeInput = e => {
        console.log(this.state.themeData.name)
        this.setState({
            themeData: {
                ...this.state.themeData,
                [e.target.name]: e.target.value
            },
            error: ''
        })
    }

    onDelete = id => {
        console.log(id)
        const themes = this.state.themes
        themes.splice(id, 1)
        console.log(themes)
        this.setState({
            themes: themes
        })
    }

    onOpenArticle = (id) => {
        this.setState({
            isOpen: true,
            openedArticle: id
        })
        localStorage.setItem("isOpen", true)
        localStorage.setItem("openedArticle", id)

    }

    onCloseArticle = () => {
        this.setState({
            isOpen: false
        })
        localStorage.removeItem("isOpen")
        localStorage.removeItem("openedArticle")
    }

    onChangeFindInput = e => {
        console.log(e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    findByValue = () => {
        if(this.state.findValue !== null && this.state.findValue.length !== 0){
            axios
                .get(config.apiJavaUrl + '/header/all/' + window.location.pathname.split("/")[2] + '/' + this.state.findValue)
                .then(res => {
                    this.setState({
                        themes: res.data,
                    })
                })
                .catch(e => {
                    this.setState({
                        themes: null
                    })
                })
        }else{
            this.getAllThemesById()
        }

    }

    onChange = (i, name) => {
        const newThemes = this.state.themes
        newThemes[i].name = name
        this.setState({
            themes: newThemes
        })
    }

    onOpenCloseAddThemeBlock = () => {
        this.setState({
            addThemeBlockOpened: !this.state.addThemeBlockOpened
        })
    }


    render(){
        const { pageProps } = this.props
        return (
            <div className={styles.container}>
                <div >
                    <div>
                        <Header onLogout={this.props.onLogout}/>
                    </div>
                    <div>
                        <Stack className="user-info-div">
                            <div>
                                <img src={logo1} alt="Kitty Katty!" className="user-image image-block"/>
                                <Typography className="text-header image-block">Пользователь: {this.state.currentUser ? this.state.currentUser.fullName : ""}</Typography>
                            </div>
                            <div>
                                <img src={logo2} alt="Kitty Katty!" className="user-image image-block"/>
                                <Typography className="text-header image-block">Статус: {this.state.currentUser ? this.state.currentUser.roleName : ""}</Typography>
                            </div>
                        </Stack>
                        <div className={styles.breadcrumbs}>
                            <Link to="/programs" className={styles.breadcrumbsItem}>
                                программа
                            </Link>
                            <div className={styles.breadcrumbsSeparator}>
                                /
                            </div>
                            <div className={styles.breadcrumbsItem}>
                                содержание "{!!this.state.program ? this.state.program : ''}"
                            </div>
                        </div>
                        <div>
                            <Typography className="text-content">СОДЕРЖАНИЕ</Typography>
                        </div>
                        <div className={styles.searchBlock}>
                            <input
                                className={styles.searchInput}
                                required
                                placeholder="Введите ключевое слово, чтобы найти нужную лекцию"
                                id="findValue"
                                autoComplete="findValue"
                                name="findValue"
                                onChange={this.onChangeFindInput}
                                value={this.state.findValue}
                            />
                            <button
                                className={styles.searchButton}
                                onClick={this.findByValue}
                            >
                                поиск
                            </button>
                        </div>

                    </div>
                    {!this.state.isStudent ? (
                        <div className={styles.addThemeBlock}>
                            <button onClick={this.onOpenCloseAddThemeBlock} className={styles.addThemeButton}>
                                Добавить новую тему
                            </button>
                            {this.state.addThemeBlockOpened ? (
                                <div className={styles.newThemeInfo}>
                                    <input
                                        className={styles.addThemeInput}
                                        required
                                        id="name"
                                        autoComplete="name"
                                        name="name"
                                        value={this.state.themeData.name}
                                        onChange={this.onChangeThemeInput}
                                    />
                                    <button
                                        className={styles.saveThemeButton}
                                        onClick={this.onAddNewTheme}
                                        disabled={this.state.themeData.name === null || this.state.themeData.name.length <= 0}
                                    >
                                        Сохранить
                                    </button>
                                </div>
                            ) : ('')}
                        </div>
                    ): ("")}
                    <div>
                        <ThemeTable onChange={this.onChange} onOpenArticle={this.onOpenArticle} isStudent={this.state.isStudent} onDelete={this.onDelete} themes={this.state.themes}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(useStyles)(ThemePage);