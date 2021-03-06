import React, { useState, useEffect } from 'react';
import axios from 'axios'

export default function CoronaData() {
    const [data, set] = useState(0);

    useEffect(() => {
        axios.get('https://coronavirusapifr.herokuapp.com/data/live/france').then((response) => {
            set(response.data[0])
        })
    }, []);

    const dateToday = () => {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();

        today = dd + '/' + mm + '/' + yyyy;

        return (<span>{today}</span>)

    };

    return (
        <div>

            <div className='titleOne'>
                <div>
                    <img className='imgLocation' src="./img/location.png" />
                </div>
                <div>
                    <h1 className='titre'>France</h1>
                </div>
            </div>
            <div className='dateDuJour'> Date : {dateToday()}</div>

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
        </div>
    );
}