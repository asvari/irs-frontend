import React from 'react'
import styles from './ProgramItem.module.scss'
import arrow from '../../../assets/img/ArrowIcon.png'
import kpoIcon from '../../../assets/img/KPOIcon.png'
import omoIcon from '../../../assets/img/OMOIcon.png'
import piapsIcon from '../../../assets/img/PIAPSIcon.png'
import riatIcon from '../../../assets/img/RIATIcon.png'
import taifuIcon from '../../../assets/img/TAIFYIcon.png'
import tsisaIcon from '../../../assets/img/TSISAIcon.png'
import tpoIcon from '../../../assets/img/TPOIcon.png'
import fIcon from '../../../assets/img/FIcon.png'
import ctIcon from '../../../assets/img/CTIcon.png'
import bdIcon from '../../../assets/img/BDIcon.png'
import bjdIcon from '../../../assets/img/BJDIcon.png'
import vflIcon from '../../../assets/img/VFLIcon.png'
import gsIcon from '../../../assets/img/GSIcon.png'
import iatIcon from '../../../assets/img/IATIcon.png'
import ripIcon from '../../../assets/img/RIPIcon.png'
import {Link} from "react-router-dom";

export default class ProgramItem extends React.Component{



    render(){
        return(
            <Link to={"/programs/" + this.props.subject.id} className={styles.container}>
                <div className={styles.content}>
                    <img src={`/./img/${this.props.subject.icon}.png`}/>
                    <img className={styles.arrow} src={arrow}/>
                </div>
                <div>
                    <div className={styles.themeTitle}>{this.props.subject.name}</div>
                </div>
            </Link>
        )
    }
}