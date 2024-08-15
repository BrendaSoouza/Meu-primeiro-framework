import Head from 'next/head';
import styles from '../Home.module.css'; 
import { Menu } from '../../componentes/Menu'; 
import 'bootstrap/dist/css/bootstrap.css';

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Loja Next</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Menu />
      <main className={styles.main}>
        <h1 className={styles.title}>Página Inicial</h1>
      </main>
    </div>
  );
};

export default Home;
