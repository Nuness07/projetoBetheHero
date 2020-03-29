import React,{ useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './style.css';

import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

export default function NewIncident() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const history = useHistory();

    const ongId = localStorage.getItem('ongId');

    async function handleNewIncident(e){
        e.preventDefault();

        const data ={
            title,
            description,
            value,
        }

        try{
            await api.post('incidents', data, {
                headers:{
                    Authorization: ongId,
                }
            })

            history.push('/profile');
        }catch(erro){
            alert('Erro ao cadastrar seu caso, tente novamente!')
        }
    }
    return (
        <div className="newincident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Logo-BeTheHero"></img>
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrarum herói
                    para resolver isso.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#e02041" />
                        Voltar para home
                    </Link>
                </section>

                <form onSubmit={handleNewIncident}>
                    <input 
                        placeholder="Título do caso"
                         value={title}
                         onChange={e => setTitle(e.target.value)}   
                    />

                    <textarea 
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}  
                    />

                    <input 
                        placeholder="Valor em reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}     
                    />
                    
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}