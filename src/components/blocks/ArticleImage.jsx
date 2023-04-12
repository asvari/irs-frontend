import * as React from "react";
import Menu from "@mui/material/Menu";
import {Box, IconButton, ImageListItem, ImageListItemBar, Modal, Stack} from "@mui/material";
import Typography from "@material-ui/core/Typography";
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import Button from "@mui/material/Button";
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import config from "../../config";
import styles from "./ArticleImage.module.scss"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


class ArticleImage extends React.Component{
    state = {
        open: false
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    }

    handleOpen = () => {
        this.setState({
            open: true
        })
    }

    onDelete = () => {
        axios
            .get(config.apiJavaUrl + '/image/delete/' + this.props.image.id)
            .then(res => {
                this.props.onDelete(this.props.index)
            })
    }

    onSwapRight = () => {
        this.props.onSwapImages(this.props.index, this.props.index + 1)
    }

    onSwapLeft= () => {
        this.props.onSwapImages(this.props.index, this.props.index - 1)
    }

    render() {
        return (
            <div>
                <ImageListItem className="image-item"  key={this.props.index}>
                    <img
                        className="image-list-item"
                        src={"http://localhost:8080/image/get/" + this.props.image.imagePath}
                        loading="lazy"
                    />
                    <Stack className="image-stack" direction="row">
                        <IconButton aria-label="delete" onClick={this.onSwapLeft}>
                            <ArrowCircleLeftOutlinedIcon fontSize="large" />
                        </IconButton>
                        <Button
                            onClick={this.handleOpen}
                            component="span"
                            className="full-display"
                        >
                            <Typography className="text-theme">в полный экран</Typography>
                        </Button>
                        <IconButton aria-label="delete" onClick={this.onSwapRight}>
                            <ArrowCircleRightOutlinedIcon fontSize="large"/>
                        </IconButton>
                        <ImageListItemBar
                            className="image-bar"

                            position="top"
                            actionIcon={
                                <IconButton
                                    sx={{ color: 'black' }}
                                    onClick={this.onDelete}
                                >
                                    <CloseIcon fontSize="medium"/>
                                </IconButton>
                            }
                            actionPosition="right"
                        />
                    </Stack>

                </ImageListItem>
                <Modal
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} className={styles.imageBlock}>
                        <img
                            className="full-image"
                            src={"http://localhost:8080/image/get/" + this.props.image.imagePath}
                            loading="lazy"
                        />
                    </Box>
                </Modal>
            </div>
        );
    }
}

export default ArticleImage;