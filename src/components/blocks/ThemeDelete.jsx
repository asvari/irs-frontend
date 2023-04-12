import React from 'react'
import {Container, Stack} from "@mui/material";
import DropdownItem from "react-bootstrap/DropdownItem";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import styles from "./ThemeDelete.module.scss"


const ThemeDelete = props => {

    return (
        <div className={styles.themeDeleteBlock}>
            <Stack direction="column" className="dropdown-container">
                <Container className="delete-theme-field-container">
                    <Typography className="text-title">Удалить "{props.name}"?</Typography>
                </Container>
                <Container className="delete-theme-button-container">
                    <Button
                        disableRipple
                        className="deleteButton"
                        onClick={props.onDelete}
                    >
                        Удалить
                    </Button>
                </Container>

            </Stack>
        </div>
    );
}

export default ThemeDelete;