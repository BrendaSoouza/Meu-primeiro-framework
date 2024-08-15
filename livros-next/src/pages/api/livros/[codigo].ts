import type { NextApiRequest, NextApiResponse } from 'next';
import { controleLivro } from './index'; 

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { codigo } = req.query;
  
    try {
      if (req.method === 'DELETE') {
        const cod = Array.isArray(codigo) ? Number(codigo[0]) : Number(codigo);
        console.log(`Tentando excluir o livro com código: ${cod}`); 
        await controleLivro.excluir(cod);
        res.status(200).json({ message: 'Livro excluído com sucesso!' });
      } else {
        res.setHeader('Allow', ['DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
      }
    } catch (error) {
      console.error('Erro ao excluir livro:', error); 
      const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
      res.status(500).json({ message: 'Internal Server Error', error: errorMessage });
    }
  }    