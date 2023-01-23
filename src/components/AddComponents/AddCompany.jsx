import React, { useState,useEffect } from 'react'
import styles from './AddCompany.module.css'
import axios from 'axios'

export default function AddCompany() {
    const [Nazwa, setNazwa] = useState("");
    const [Siedziba, setSiedziba] = useState("");
    const [Companies, setCompanies] = useState()
    const [added, setAdded] = useState(false);

    useEffect(() => {
        const configuration = {
            method: "get",
            url: `http://localhost:8080/routes/Firma_Produkcyjna`,
        };

        axios(configuration).then((res) => {
            var kategorie = ''
            for(var i = 0; i < res.data.length; i++) {
                kategorie = kategorie + ' ' + res.data[i].Nazwa
            }
            setCompanies(kategorie)
        });
    }, [])

    const handleSubmit = (e) => {
        // prevent the form from refreshing the whole page
        e.preventDefault();

        // set configurations
        const configuration = {
            method: "post",
            url: "http://localhost:8080/routes/Firma_Produkcyjna",
            data: {
                Nazwa,
                Siedziba
            },
        };
        axios(configuration)
            .then(() => {
                setAdded(true)
            })
            .catch((error) => {
                error = new Error();

            });
    }

    return (
        <div className={styles.cont}>
            <div className={styles.form_container}>
                <h2>New company</h2>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div class="mb-3">
                        <label for="title" class="form-label" >Name</label>
                        <input type="text" class="form-control" name="Nazwa" onChange={(e) => setNazwa(e.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label for="title" class="form-label" >Headquarters</label>
                        <input type="text" class="form-control" name="Siedziba" onChange={(e) => setSiedziba(e.target.value)}/>
                    </div>
                    <p>Avaiable companies</p>
                    <p style={{ fontSize: "12px" }}>{Companies}</p>
                    {added ? (
                        <p className="text-success">Firm added succesfully</p>
                    ) : (
                        <></>
                    )}
                    <div>
                        <button className={styles.Button2} onClick={(e) => handleSubmit(e)}>Add</button>
                    </div>
                </form>
            </div>
        </div>
    )
}