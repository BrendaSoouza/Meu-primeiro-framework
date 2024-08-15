import { Livro } from "../modelo/Livros";

const livros: Array<Livro> = [
    { codigo: 1, codEditora: 1, titulo: "Use a Cabeça: Java", resumo: "Use a Cabeça! Java é uma experiência completa de aprendizado em programação orientada a objetos (OO) e Java.", autores: ["Bert Bates", "Kathy Sierra"] },
    { codigo: 2, codEditora: 2, titulo: "Java, como Programar", resumo: "Milhões de alunos e profissionais aprenderam programação e desenvolvimento de software com os livros Deitel.", autores: ["Paul Deitel","Harvey Deitel"] },
    { codigo: 3, codEditora: 3, titulo: "Core Java for the Impatient", resumo: "eaders familiar with Horstmann's original, two-volume Core Java books...", autores: ["Cay Horstmann"] }
];

export class ControleLivro {
    obterLivros(): Array<Livro> {
        return livros;
    }

    incluir(livro: Livro): void {
        const novoCodigo = Math.max(...livros.map(l => l.codigo)) + 1;
        livro.codigo = novoCodigo;
        livros.push(livro);
    }

    excluir(codigo: number): void {
        const index = livros.findIndex(l => l.codigo === codigo);
        if (index !== -1) {
            livros.splice(index, 1);
        }
    }
}
export default ControleLivro