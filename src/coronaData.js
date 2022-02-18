import React, { useState, useEffect } from 'react';
import axios from 'axios'

export default function CoronaData() {
    const [data, set] = useState(0);

    useEffect(() => {
        axios.get('https://coronavirusapifr.herokuapp.com/data/live/france').then((response) => {
            console.log(response.data[0])
            set(response.data[0])
        })
    }, []);

    return (
        <div className='container'>
            <div className='contenu'>
                <div className='card'>
                    <div className='infos'>
                        <div className='logo'>
                            <img src="./img/virus.png" />
                        </div>
                        <div className='chiffre'>
                            <b>{data.conf_j1}</b>
                        </div>
                        <div className='libelle'>
                            Nouveaux cas confirmés
                        </div>
                    </div>
                </div>
                <div className='card'>
                    <div className='infos'>
                        <div className='logo'>
                            <img src="./img/hospital.png" />
                        </div>
                        <div className='chiffre'>
                            <b>{data.rea}</b>
                        </div>
                        <div className='libelle'>
                            Patients actuellement en réanimation ou en soins intensifs
                        </div>
                    </div>
                </div>

            </div>
            <div className='contenu'>
                <div className='card'>
                    <div className='infos'>
                        <div className='logo'>
                            <img src="./img/building.png" />
                        </div>
                        <div className='chiffre'>
                            <b>{data.incid_hosp}</b>
                        </div>
                        <div className='libelle'>
                            Nouveaux patients hospitalisés au cours des dernières 24h
                        </div>
                    </div>
                </div>
                <div className='card'>
                    <div className='infos'>
                    <div className='logo'>
                            <img src="./img/bed.png" />
                        </div>
                        <div className='chiffre'>
                            <b>{data.hosp}</b>
                        </div>
                        <div className='libelle'>
                            Patients actuellement hospitalisés pour COVID-19
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}