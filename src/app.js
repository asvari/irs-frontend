import React from 'react'
import axios from 'axios'
import LoginPage from "./components/page/loginPage/LoginPage";
import MainPage from "./components/page/mainPage/MainPage";
import styles from "./components/page/mainPage/MainPage.module.scss";
import Header from "./components/header/Header";
import {Navigate, Route, Routes} from "react-router-dom";
import ProgramPage from "./components/page/programPage/ProgramPage";
import StartPage from "./components/page/startPage/StartPage";
import ThemePage from "./components/page/themePage/ThemePage";
import ArticlePage from "./components/page/articlePage/ArticlePage";

class App extends React.Component{
    state = {
        isAuth: true,
        isStarting: false,
        defaultPage: null
    }

    componentDidMount() {
        console.log("STAAAAAAART")
        if (localStorage.getItem("isStarting") === "true"){
            this.setState({
                isStarting: true
            }, () => {
                if(localStorage.getItem('access_token')){
                    console.log("TOOOOOKEN")
                    axios.defaults.headers.common['Authorization'] = localStorage.getItem('access_token')
                    this.setState({
                        isAuth: true,
                        defaultPage: 'programs'
                    })
                }else{
                    this.setState({
                        isAuth: false,
                        defaultPage: 'login'
                    })
                }
            })
        }else{
            this.setState({
                defaultPage: 'start'
            })
        }
    }

    onStart = () =>{
        this.setState({
            isStarting: true
        })
        localStorage.setItem("isStarting", "true")
    }

    onReturnToStart = () => {
        this.setState({
            isStarting: false
        })
        localStorage.removeItem("isStarting")
    }


    onLogin = () => {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('access_token');
        this.setState({
            isAuth: true
        })
    }

    onLogout = () =>{
        localStorage.removeItem("access_token")
        delete axios.defaults.headers.common['Authorization']
        this.setState({isAuth: false})
    }

    render(){
        return(
            <Routes>
                <Route exact path='/programs' element={this.state.isAuth ? <ProgramPage onLogout={this.onLogout}></ProgramPage> : <Navigate to='/login'/>}/>
                <Route exact path='/programs/:id' element={this.state.isAuth ? <ThemePage onLogout={this.onLogout}></ThemePage> : <Navigate to='/login'/>}/>
                <Route exact path='/programs/:id/article/:articleId' element={this.state.isAuth ? <ArticlePage onLogout={this.onLogout}></ArticlePage> : <Navigate to='/login'/>}/>
                <Route exact path='/login' element={this.state.isAuth ? <Navigate to='/programs'/> : <LoginPage onLogin={this.onLogin} onReturnToStart={this.onReturnToStart}></LoginPage>}/>
                <Route exact path='/start' element={<StartPage onStart={this.onStart} isStarting={this.state.isStarting}></StartPage>}/>
                <Route exact path='/' element={<Navigate to={this.state.defaultPage}/>}/>
                <Route exact path='*' element={<Navigate to={this.state.defaultPage}/>}/>
            </Routes>
        )
    }
}

export default App;