import React from 'react'
import {withStyles} from '@material-ui/core/styles';
import Header from '../../header/Header';
import Typography from "@material-ui/core/Typography";
import {Box, Container, Grid, ImageList, Input, Popover, Stack, styled} from "@mui/material";
import logo1 from "../../../assets/img/Ikonka_4.png"
import logo2 from "../../../assets/img/Ikonka_3.png";
import axios from "axios";
import config from "../../../config";
import Button from "@mui/material/Button";
import ArticleImage from "../../blocks/ArticleImage";
import styles from "./ArticlePage.module.scss"
import emptyImagesIcon from "../../../assets/img/EmptyListIcon.png"
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

const AddInput = styled('input')({
    display: 'none',
});

class ArticlePage extends React.Component{
    state = {
        article: null,
        currentUser: null,
        program: null

    }

    componentDidMount() {
        this.getAllThemesById()
        this.getUserInfo()
        const id = window.location.pathname.split("/")[4]
        axios
            .get(config.apiJavaUrl + '/article/get/' + id)
            .then(res => {
                this.setState({
                    article: res.data
                })
            })
            .catch(e => {
                this.setState({
                    article: null
                })
            })
    }

    getAllThemesById = () => {
        axios
            .get(config.apiJavaUrl + '/header/all/subject/' + window.location.pathname.split("/")[2])
            .then(res => {
                this.setState({
                    program: res.data.subjectName
                })
            })
            .catch(e => {
                this.setState({
                    themes: null
                })
            })
    }

    getUserInfo = () => {
        return axios
            .get(config.apiJavaUrl + '/user/info')
            .then(res => {
                this.setState({
                    currentUser: res.data,
                })
            })
            .catch(e => {
                this.setState({
                    currentUser: null
                })
                this.getUserInfo()
            })
    }

    onAddImage = (e) => {
        var file = document.getElementById("contained-button-file").files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = ((e) => {
            return (f) => {
                axios
                    .post(config.apiJavaUrl + '/image/add',
                        {
                            articleId: this.state.article.id,
                            imageBase64: reader.result
                        }).then(({ data }) => {
                            const article = this.state.article
                            article.images.push(data)
                            this.setState({
                                article: article
                            })
                })
                    .catch(e => {
                        this.setState({errorAlert: true})
                    })
            };
        })(file);
    }

    onDeleteImage = (index) => {
        const newArticle = this.state.article;
        newArticle.images.splice(index, 1)
        this.setState({
            article: newArticle
        })
    }

    onDeleteAll = () => {
        axios
            .get(config.apiJavaUrl + '/image/deleteAll/' + window.location.pathname.split("/")[4])
            .then(res => {
                const newArticle = this.state.article;
                newArticle.images = []
                this.setState({
                    article: newArticle
                })
            })
    }

    onSwapImages = (firstId, secondId) => {
        console.log("FirstId" + firstId + "SecondId" + secondId)
        if(firstId >= 0 && secondId >= 0 && firstId < this.state.article.images.length && secondId < this.state.article.images.length){
            const newArticle = this.state.article
            console.log(newArticle)
            const temp = newArticle.images[secondId]
            console.log(temp)
            newArticle.images[secondId] = newArticle.images[firstId]
            newArticle.images[firstId] = temp
            console.log(newArticle)
            this.setState({
                article: newArticle
            })
        }
    }


    render(){
        return (
            <div className={styles.container}>
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
                </div>
                <div className={styles.breadcrumbs}>
                    <Link to="/programs" className={styles.breadcrumbsItem}>
                        программа
                    </Link>
                    <div className={styles.breadcrumbsSeparator}>
                        /
                    </div>
                    <Link to={"/programs/" + window.location.pathname.split("/")[2]} className={styles.breadcrumbsItem}>
                        содержание "{!!this.state.program ? this.state.program : ''}"
                    </Link>
                    <div className={styles.breadcrumbsSeparator}>
                        /
                    </div>
                    <div className={styles.breadcrumbsItem}>
                        лекции по теме "{!!this.state.article ? this.state.article.headerTitle : ''}"
                    </div>
                </div>
                <div className={styles.textContent}>{this.state.article ? this.state.article.headerTitle.toUpperCase() : ""}</div>
                {!!this.state.currentUser && this.state.currentUser.roleName === "Преподаватель" ? (
                    <div className={styles.uploadBlock}>
                        <label htmlFor="contained-button-file">
                            <AddInput
                                accept="image/*"
                                id="contained-button-file"
                                multiple type="file"
                                onChange={this.onAddImage}
                            />
                            <Button
                                component="span"
                                type="submit"
                                className="add-theme-div"
                            >
                                <Typography className="text-theme">Загрузить фотографию</Typography>
                            </Button>

                        </label>
                        <div>
                            <Button
                                id="basic-button"
                                aria-haspopup="true"
                                className="add-theme-div"
                                onClick={this.onDeleteAll}
                            >
                                <Typography className="text-theme">Удалить все фотографии </Typography>
                            </Button>
                        </div>
                    </div>
                ): ("")}

                {this.state.article && this.state.article.images.length !== 0 ? (

                    <ImageList cols={4} gap={80}>
                        {this.state.article.images.map((image, index) => (
                            <ArticleImage onSwapImages={this.onSwapImages} onDelete={this.onDeleteImage} index={index} image={image}/>
                        ))}
                    </ImageList>
                ): (
                    <div className={styles.emptyImagesBlock}>
                        <div className={styles.emptyImages}>
                            {!!this.state.currentUser && this.state.currentUser.roleName === "Преподаватель" ? (
                                <div className={styles.emptyListTitle}>Вы еще ничего не загружали</div>
                            ) : (
                                <div className={styles.emptyListTitle}>В скором времени на этой странице  появится контент</div>
                            )}

                            <img src={emptyImagesIcon}/>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default withStyles(useStyles)(ArticlePage);