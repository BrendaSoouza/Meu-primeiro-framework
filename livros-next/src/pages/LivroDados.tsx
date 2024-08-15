import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Menu } from '../../componentes/Menu';
import styles from '../Home.module.css';
import { ControleEditora } from '../../classes/controle/ControleEditora';
import { Livro } from '../../classes/modelo/Livros';



    const controleEditora = new ControleEditora();
    const baseURL: string = "http://localhost:3000/api/livros";

    const incluirLivro = async (livro: Livro) => {
    const resposta = await fetch(baseURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(livro),
    });
    const resultado = await resposta.json();
    return resultado.ok;
};

    const LivroDados: React.FC = () => {
    const opcoes = controleEditora.getEditoras().map(editora => ({
        value: editora.codEditora,
        text: editora.nome
    }));

   
    const [titulo, setTitulo] = useState<string>('');
    const [resumo, setResumo] = useState<string>('');
    const [autores, setAutores] = useState<string>('');
    const [codEditora, setCodEditora] = useState<number>(opcoes.length > 0 ? opcoes[0].value : 0);
    const router = useRouter();

    const tratarCombo = (evento: React.ChangeEvent<HTMLSelectElement>) => {
        setCodEditora(Number(evento.target.value)); 
    };    

    const incluir = async (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();

        const livro = new Livro(0, titulo, resumo, autores.split('\n'), codEditora);

        const sucesso = await incluirLivro(livro);
        if (sucesso) {
            router.push('/LivroLista');
        }
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Novo</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Menu />
            <main className={styles.main}>
                <h1 className={styles.title}>Dados do Livro</h1>
                <form onSubmit={incluir}>
                    <div className="mb-3">
                        <label htmlFor="titulo" className="form-label">Título</label>
                        <input type="text" className="form-control" id="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="resumo" className="form-label">Resumo</label>
                        <textarea className="form-control" id="resumo" value={resumo} onChange={(e) => setResumo(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="autores" className="form-label">Autores (separados por linha)</label>
                        <textarea className="form-control" id="autores" value={autores} onChange={(e) => setAutores(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="editora" className="form-label">Editora</label>
                        <select className="form-select" id="editora" value={codEditora.toString()} onChange={tratarCombo} required>
                            {opcoes.map(opcao => (
                                <option key={opcao.value} value={opcao.value.toString()}>{opcao.text}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Incluir Livro</button>
                </form>
            </main>
        </div>
    );
};

export default LivroDados;