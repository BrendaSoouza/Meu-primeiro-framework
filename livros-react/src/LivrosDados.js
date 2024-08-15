import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ControleLivro from './controle/ControleLivros';  
import ControleEditora from './controle/ControleEditora'; 

const LivroDados = () => {

    const controleLivro = new ControleLivro();
    const controleEditora = new ControleEditora();

    const opcoes = controleEditora.getEditoras().map(editora => ({
        value: editora.codEditora,
        text: editora.nome,
    }));

    const [titulo, setTitulo] = useState('');
    const [resumo, setResumo] = useState('');
    const [autores, setAutores] = useState('');
    const [codEditora, setCodEditora] = useState(opcoes[0]?.value || '');

    const navigate = useNavigate();

    const tratarCombo = (event) => {
        setCodEditora(Number(event.target.value));
    };

    const incluir = (event) => {
        event.preventDefault(); 
        const novoLivro = {
            codigo: 0,
            codEditora: codEditora,
            titulo: titulo,
            resumo: resumo,
            autores: autores.split('\n')  
        };
        controleLivro.incluir(novoLivro);
        navigate('/'); 
    };

    return (
        <main>
          <h1>Dados do Livro</h1>
          <form onSubmit={incluir}>
            <div className="mb-3">
              <label htmlFor="titulo" className="form-label">Título</label>
              <input
                type="text"
                className="form-control"
                id="titulo"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="resumo" className="form-label">Resumo</label>
              <textarea
                className="form-control"
                id="resumo"
                rows="3"
                value={resumo}
                onChange={(e) => setResumo(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="autores" className="form-label">Autores (um por linha)</label>
              <textarea
                className="form-control"
                id="autores"
                rows="3"
                value={autores}
                onChange={(e) => setAutores(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="editora" className="form-label">Editora</label>
              <select
                className="form-select"
                id="editora"
                value={codEditora}
                onChange={tratarCombo}
              >
                {opcoes.map((editora) => (
                  <option key={editora.value} value={editora.value}>
                    {editora.text}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Salvar Dados</button>
          </form>
        </main>
      );
    }
    
    export default LivroDados;
    
    