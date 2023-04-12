import React from 'react'
import {Container, Stack} from "@mui/material";
import DropdownItem from "react-bootstrap/DropdownItem";
import styles from "./ThemeChange.module.scss"


const ThemeChange = props => {
    const [name, setName] = React.useState(props.name)
    const [commentary, setCommentary] = React.useState(null)

    const onChangeNameInput = e => {
        console.log(name)
        setName(e.target.value)
    }

    const onChangeCommentaryInput = e => {
        console.log(commentary)
        setCommentary(e.target.value)
    }

    const onChange = () => {
        props.onChange(name)
    }

    const onAddComment = () => {
        props.onAddComment(commentary)
    }


    return (
        <div className={styles.themeChangeBlock}>
            {props.type ? (
                <div className={styles.changeThemeBlock}>
                    <input
                        className={styles.changeThemeInput}
                        required
                        id="name"
                        autoComplete="name"
                        name="name"
                        value={name}
                        onChange={onChangeNameInput}
                    />
                    <button
                        disabled={!props.type}
                        className={styles.changeThemeButton}
                        onClick={onChange}
                    >
                        Сохранить
                    </button>
                </div>
            ): (
                <div className={styles.changeThemeBlock}>
                    <input
                        className={styles.changeThemeInput}
                        required
                        id="name"
                        autoComplete="name"
                        name="name"
                        value={commentary}
                        onChange={onChangeCommentaryInput}
                    />
                    <button
                        disabled={props.type}
                        className={styles.changeThemeButton}
                        onClick={onAddComment}
                    >
                        Добавить
                    </button>
                </div>
            )}
        </div>
    );
}

export default ThemeChange;