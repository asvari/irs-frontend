import React from 'react'
import styles from './ProgramPage.module.scss'
import Header from "../../header/Header";
import ProgramItem from "./ProgramItem";
import axios from "axios";
import config from "../../../config";
import ThemeRow from "../../blocks/ThemeRow";

export default class ProgramPage extends React.Component{
    state = {
        subjects: []
    }

    componentDidMount() {
        this.getSubjects()
    }

    getSubjects = () => {
        axios
            .get(config.apiJavaUrl + '/subject/all')
            .then(res => {
                this.setState({
                    subjects: res.data,
                })
            })
            .catch(e => {
                this.setState({
                    subjects: null
                })
            })
    }

    render(){
        return(
            <div className={styles.container}>
                <Header onLogout={this.props.onLogout}></Header>
                <div className={styles.programTitle}>ПРОГРАММА</div>
                <div className={styles.themesInfo}>
                    <div className={styles.themeInfo}>
                        <div className={styles.courseTitle}>3 курс - 5 семестр</div>
                        <div className={styles.themeList}>
                            {this.state.subjects.filter(e => e.semester === 5).map((subject, i) => (
                                <ProgramItem subject={subject} key={i}/>
                            ))}
                        </div>
                    </div>
                    <div className={styles.themeInfo}>
                        <div className={styles.courseTitle}>3 курс - 6 семестр</div>
                        <div className={styles.themeList}>
                            {this.state.subjects.filter(e => e.semester === 6).map((subject, i) => (
                                <ProgramItem subject={subject} key={i}/>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}