import React, { useState } from 'react'
import Navbar from '../componente/navbar/Navbar'
import Sidebar from '../componente/sidebar/Sidebar'
import "./setari.scss"
import sageata from './img/dreapta.png';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

function Setari() {

    const optiuni = [
        {
            header: {
                name: "Cont",
            },

            values: [

            ],

        },


        {
            header: {
                name: "Aplicatii",
            },

            values: [

            ],

        },

        {
            header: {
                name: "Produse",
            },

            values: [
                {
                    name: "Produse",
                    description: "Vezi produsele",
                    tags: ["credit cards"],
                },

            ],
        },

        {
            header: {
                name: "Comenzi",
            },

            values: [
                {
                    name: "Comenzi",
                    description: "Vezi comenzile",
                    tags: ["credit cards"],
                },

            ],
        },

        {
            header: {
                name: "Livrari",
            },

            values: [
                {
                    name: "Livrari",
                    description: "Vezi livrarile",
                    tags: ["credit cards"],
                },

            ],
        },

        {
            header: {
                name: "Statistici",
            },

            values: [
                {
                    name: "Statistici",
                    description: "Vezi statisticile",
                    tags: ["credit cards"],
                },

            ],
        },

        {
            header: {
                name: "Suport",
            },

            values: [
    
                {
                    name: "Contacteaza-ne",
                    description: "Contacteaza echipa noastra de suport",
                    tags: [],
                 
                },

            ],
        },
    ];

    const [OptiuniVizibile, seteazaOptiuniVizibile] = useState(optiuni);
    const navigate = useNavigate();
	const goBack = () => {
		navigate(-1);
	}
    const onChange = (e) => {
        e.preventDefault();
        const value = e.target.value;
        console.log('value', value);
        if (value.trim().length === 0) {
            seteazaOptiuniVizibile(optiuni);
            return;
        }
        const obiecteReturnate = [];
        OptiuniVizibile.forEach((optiune, index) => {
            const gasesteOptiuni = optiune.values.filter((obiect) => {
                return (
                    obiect.name.toLocaleLowerCase().search(value.trim().toLowerCase()) !== -1 || obiect.description.toLocaleLowerCase().search(value.trim().toLowerCase()) !== -1
                );
            });

            obiecteReturnate[index] = {
                header: {
                    name: optiune.header.name,
                },
                values: gasesteOptiuni,
            };

            if (optiune.header.name.toLocaleLowerCase().search(value.trim().toLowerCase()) !== -1) {

                obiecteReturnate[index] = {
                    header: {
                        name: optiune.header.name,
                    },
                    values: optiuni[index].values,
                };
            }
        });

        seteazaOptiuniVizibile(obiecteReturnate)
    }


    return (
        <div className='Setari'>
            <Sidebar />
            <div className='containerSetari'>
                <Navbar />
                <div className='continutSetari'>
                    <h1>
                        <span>
                            <button onClick={() => navigate(-1)} className='btnInapoi'>
                                {" "}
                                <span>&lt;</span>Inapoi{" "}
                            </button>{" "}
                            <div className='headerTitlu'>Setari</div>
                        </span>
                    </h1>
                    <input type="text" className='cautaresetari' onChange={onChange} placeholder='Cauta...'></input>
                    <div>
                        {OptiuniVizibile.map((optiuni) => (
                            <div key={optiuni.header.name} className="optiuniHeader"><h3>{optiuni.header.name}</h3>
                                <div>
                                    {optiuni.values.map((value) => (
                                        <div key={value.name}>
                                            <ul className='lista-grup'>
                                                <li className='lista-grupObiect'>
                                                    <h6 className="valoareNume">{value.name}</h6>
                                                    <p>{value.description}<img className="iconSetari" width="12px" src={sageata} alt="" /></p>
                                                </li>
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Setari