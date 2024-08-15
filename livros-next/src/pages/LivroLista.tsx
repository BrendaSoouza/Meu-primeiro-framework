import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Menu } from '../../componentes/Menu';
import styles from '../Home.module.css';
import { LinhaLivro } from '../../componentes/LinhaLivro';
import { Livro } from '../../classes/modelo/Livros';

const baseURL: string = "http://localhost:3000/api/livros";

const obter = async (): Promise<Array<Livro>> => {
    try {
        const resposta = await fetch(baseURL);
        if (!resposta.ok) {
            throw new Error(`Erro na resposta da API: ${resposta.statusText}`);
        }
        const dados = await resposta.json();
        if (!Array.isArray(dados)) {
            throw new Error('A resposta da API não é um array');
        }
        return dados;
    } catch (error) {
        console.error('Erro ao obter livros:', error);
        throw error;
    }
};

const excluirLivro = async (codigo: number): Promise<boolean> => {
    try {
        const resposta = await fetch(`${baseURL}/${codigo}`, { method: 'DELETE' });
        if (!resposta.ok) {
            throw new Error(`Erro ao excluir livro: ${resposta.statusText}`);
        }
        return true;
    } catch (error) {
        console.error('Erro ao excluir livro:', error);
        return false;
    }
};

const LivroLista: React.FC = () => {
    const [livros, setLivros] = useState<Array<Livro>>([]);
    const [carregado, setCarregado] = useState<boolean>(false);
    const [erro, setErro] = useState<string | null>(null);
    const [carregando, setCarregando] = useState<boolean>(false);

    useEffect(() => {
        if (!carregado) {
            setCarregando(true);
            obter()
                .then((dados) => {
                    console.log('Livros recebidos:', dados);
                    setLivros(dados);
                    setCarregado(true);
                })
                .catch(error => {
                    setErro('Erro ao obter livros. Por favor, tente novamente mais tarde.');
                })
                .finally(() => {
                    setCarregando(false);
                });
        }
    }, [carregado]);

    const excluir = (codigo: number) => {
        excluirLivro(codigo).then((success) => {
            if (success) {
                setCarregado(false); 
            } else {
                setErro('Erro ao excluir livro. Por favor, tente novamente mais tarde.');
            }
        });
    };

    if (carregando) {
        return <div>Carregando...</div>;
    }

    if (erro) {
        return <div>Erro: {erro}</div>;
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Catálogo</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Menu />
            <main className={styles.main}>
                <h1 className={styles.title}>Catálogo de Livros</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Resumo</th>
                            <th>Editora</th>
                            <th>Autores</th>
                        </tr>
                    </thead>
                    <tbody>
                        {livros.length > 0 ? (
                            livros.map((livro) => (
                                <LinhaLivro
                                    key={livro.codigo}
                                    livro={livro}
                                    excluir={() => excluir(livro.codigo)}
                                />
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4}>Nenhum livro encontrado</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </main>
        </div>
    );
};

export default LivroLista;


