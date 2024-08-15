import type { NextApiRequest, NextApiResponse } from 'next';
import ControleLivro from '../../../../classes/controle/ControleLivros'; 

export const controleLivro = new ControleLivro();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try { 
        const response = await fetch('URL_DA_API');
        if (!response.ok) {
            throw new Error(`Erro na resposta da API: ${response.statusText}`);
        }
  
        const data = await response.json();

        if (req.method === 'GET') {
            const livros = await controleLivro.obterLivros();
            console.log('Livros:', livros); 
            res.status(200).json(livros);
        } else if (req.method === 'POST') {
            const livro = req.body;
            if (!livro || typeof livro !== 'object') {
                res.status(400).json({ message: 'Dados inválidos para inclusão de livro' });
                return;
            }
            console.log('Incluindo livro:', livro);
            await controleLivro.incluir(livro);
            res.status(200).json({ message: 'Livro incluído com sucesso!' });
        } else {
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
        console.error('Erro na API de livros:', errorMessage); 
        res.status(500).json({ message: 'Internal Server Error', error: errorMessage });
    }
};
