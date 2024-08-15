import type { NextApiRequest, NextApiResponse } from 'next';
import { controleEditora } from './index'; // Importar a instância

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { codEditora } = req.query;
  
  try {
    if (req.method === 'GET') {
      const cod = Array.isArray(codEditora) ? Number(codEditora[0]) : Number(codEditora);
      
      const nomeEditora = await controleEditora.getNomeEditora(cod);
      if (nomeEditora) {
        res.status(200).json({ nome: nomeEditora });
      } else {
        res.status(404).json({ message: 'Editora não encontrada' });
      }
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    res.status(500).json({ message: 'Internal Server Error', error: errorMessage });
  }
};

