import type { NextApiRequest, NextApiResponse } from 'next';
import ControleEditora from '../../../../classes/controle/ControleEditora'; 

export const controleEditora = new ControleEditora();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
    
      const editoras = await controleEditora.getEditoras();
      res.status(200).json(editoras);
    } else {
      
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    res.status(500).json({ message: 'Internal Server Error', error: errorMessage });
  }
};
