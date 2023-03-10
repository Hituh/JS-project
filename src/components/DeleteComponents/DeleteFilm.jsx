import React from 'react'
import axios from 'axios'
import styles from './DeleteFilm.module.css'

export default function DeleteFilm(props) {
    const handleSubmit = (e) => {
        e.preventDefault();
        // set configurations
        const configuration = {
            method: "post",
            url: "http://localhost:8080/routes/Film/delete",
            data: {
                Film_Id: props.Id
            },
        };
        axios(configuration)
            .then(() => {
                setTimeout(() => { window.location.href = "/movies" }, 1500);
            })
            .catch((error) => {
                error = new Error();
            });
    }

    return (
        <div className={styles.cont}>
            <div className={styles.form_container}>
                <h2>Are you sure?</h2>
                <button className={styles.Button2} onClick={(e) => handleSubmit(e)}>Yes</button>
                <button className={styles.Button2} >No</button>
            </div>
        </div>
    )
}