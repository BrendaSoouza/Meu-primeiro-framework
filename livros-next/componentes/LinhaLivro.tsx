import React from 'react';
import ControleEditora from '../classes/controle/ControleEditora'; 
import { Livro } from '../classes/modelo/Livros'; 

const controleEditora = new ControleEditora();

interface LinhaLivroProps {
    livro: Livro;
    excluir: () => void;
  }
  
  export const LinhaLivro = (props: { livro: any; excluir: any; }) => {
    const { livro, excluir } = props;
    const nomeEditora = controleEditora.getNomeEditora(livro.codEditora);

    return (
        <tr>
            <td>{livro.titulo} 
                <td><button onClick={() => excluir(livro.codigo)} className="btn btn-danger">
                Excluir </button> </td>
            </td>
            <td>{livro.resumo}</td>
            <td>{nomeEditora}</td>
            <td>
                <ul>
                    {livro.autores.map((autor: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined, index: React.Key | null | undefined) => (
                        <li key={index}>{autor}</li>
                    ))}
                </ul>
            </td>
        </tr>
    );
}
const baseURL = "http://localhost:3000/api/livros";


  