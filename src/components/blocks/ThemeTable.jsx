import React from 'react'
import Typography from "@material-ui/core/Typography";
import ThemeRow from "./ThemeRow";
import styles from "./ThemeTable.module.scss"

const ThemeTable  = props => {
    const [changingId, setChangingId] = React.useState(null);
    const [deletingId, setDeletingId] = React.useState(null);
    const [update, setUpdate] = React.useState(false);

    const handleChanging = (id) => {
        setDeletingId(null)
        setChangingId(id);
        console.log(changingId)
    };

    const handleDeleting = (id) => {
        setDeletingId(id);
        setChangingId(null)
        console.log(deletingId)
    };

    const onUpdate = () => {
        setUpdate(!update)
    }

    return (
        <div className={styles.container}>
            <div className="table">
                <div className={styles.tableHeader}>
                    <div className="header__item trow-id"><Typography className="text-header tdata-id">№</Typography></div>
                    <div className="header__item trow-theme"><Typography className="text-header">Тема</Typography></div>
                    <div className="header__item trow-com"><Typography className="text-header">Заметки</Typography></div>
                    <div className="header__item trow-date"><Typography className="text-header">Дата</Typography></div>
                    {!props.isStudent ? (
                        <div className="header__item trow-action"><Typography className="text-header">Действия</Typography></div>
                    ): ("")}
                </div>
                <div className="table-content">
                    {props.themes.map((theme, i) => (
                        <ThemeRow
                            onOpenArticle={props.onOpenArticle}
                            isStudent={props.isStudent}
                            onChange={props.onChange}
                            update={update}
                            changingId={changingId}
                            deletingId={deletingId}
                            handleDeleting={handleDeleting}
                            handleChanging={handleChanging}
                            onDelete={props.onDelete}
                            key={i}
                            index={i + 1}
                            theme={theme} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ThemeTable;