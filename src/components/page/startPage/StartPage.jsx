import React from 'react'
import mainLogo from "../../../assets/img/Group 43.png"
import mainImage from "../../../assets/img/MainImage.png"
import styles from './StartPage.module.scss'
import {Link} from "react-router-dom";

class StartPage extends React.Component{

    render(){
        return(
            <div className={styles.container}>
                <div className={styles.header}>
                    <img src={mainLogo} alt="Kitty Katty!" className="user-image image-block"/>
                </div>
                <div className={styles.content}>
                    <div className={styles.textBlock}>
                        <div className={styles.headerText}>Информационно-<br/>справочная система с элементами самоподготовки</div>
                        <div className={styles.titleText}>
                            для третьего курса прикладной информатики института вычислительной математики и информационных технологий с элементами самопроверки
                        </div>
                        <Link
                            to="/login"
                            className={styles.startButton}
                            onClick={this.props.onStart}
                        >
                            войти в систему
                        </Link>
                    </div>
                    <div className="main-image-container">
                        <img src={mainImage} alt="Kitty Katty!" className="user-image image-block"/>
                    </div>
                </div>

            </div>
        )
    }
}

export default StartPage;