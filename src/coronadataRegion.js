import React, { useState, useEffect } from 'react';
import axios from 'axios'

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { makeStyles } from '@mui/styles';


export default function CoronaData(props) {
    const [data, set] = useState(0);
    const [region, setRegion] = useState("");
    const [departementChoisi, setDepartementChoisi] = useState('');


    const useStyles = makeStyles({
        select: {
            '&:before': {
                borderColor: 'white',
            },
            '&:after': {
                borderColor: 'white',
            },
            'color': 'white',
            'text-overflow': 'ellipsis',
            'width':'10em'
        },
        icon: {
            fill: 'white',
        },
    })

    const classes = useStyles()


    useEffect(() => {
        console.log(props)
    }, []);

    const handleChange = (event) => {

        setDepartementChoisi(event.target.value.departement);

        axios.get('https://coronavirusapifr.herokuapp.com/data/live/departement/' + event.target.value.departement).then((response) => {
            console.log(response)
            set(response.data[0])

        })

    };

    const dateToday = () => {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();

        today = dd + '/' + mm + '/' + yyyy;

        return (<span>{today}</span>)

    };


    return (
        <div className='container'>

            <div className='titleOne'>
                <div>
                    <img className='imgLocation' src="./img/location.png" />
                </div>
                <div>
                    <div className='contentRegionHeader'>
                        <div>
                            <h1 className='titre'>Département</h1>
                        </div>
                        <div className='selectRegion'>
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label" className='label'>Choisir</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        defaultValue=""
                                        className={classes.select}
                                        value={departementChoisi.departement}
                                        label="Département"
                                        onChange={handleChange}
                                        inputProps={{
                                            classes: {
                                                icon: classes.icon,
                                                root: classes.root,
                                            },
                                        }}

                                    >
                                        {props.listeDepartement.map((departement, i) =>
                                            <MenuItem key={i} value={departement}>{departement.departement}</MenuItem>
                                        )
                                        }

                                    </Select>
                                </FormControl>
                            </Box>
                        </div>
                    </div>
                </div>
            </div>
            <div className='dateDuJour'> Date : {dateToday()}</div>


            <div className='container'>
                <div className='contenu'>
                    <div className='card'>
                        <div className='infos'>
                            <div className='logo'>
                                <img src="./img/dead.png" />
                            </div>
                            <div className='chiffre'>
                                <b>{data.incid_dchosp}</b>
                            </div>
                            <div className='libelle'>
                                Décès à l’hôpital au cours des dernières 24h
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