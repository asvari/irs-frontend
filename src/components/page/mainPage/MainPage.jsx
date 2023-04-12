import React from 'react'
import styles from './MainPage.module.scss'
import Header from "../../header/Header";
import {Navigate, Route, Routes} from "react-router-dom";
import ProgramPage from "../programPage/ProgramPage";
import ThemePage from "../themePage/ThemePage";

export default class MainPage extends React.Component{

    render(){
        return(
            <div className={styles.container}>
                <Header onLogout={this.props.onLogout}></Header>
                <Routes>
                    <Route exact path='/programs' element={<ProgramPage></ProgramPage>}/>
                    <Route exact path='/' element={<Navigate to='programs'/>}/>
                    <Route exact path='*' element={<Navigate to='programs'/>}/>
                </Routes>
            </div>
        )
    }
}