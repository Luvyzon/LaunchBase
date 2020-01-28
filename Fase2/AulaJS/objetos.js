//                      aula 8
// objetos

const aluno01 = { // objeto
    nome: `Matheus`, //atributo-funcionalidade
    nota: 9.8        //atributo-funcionalidade
}
const aluno02 = {
    nome: `Diego`,
    nota: 10
}
const aluno03 = {
    nome: `Mayk`,
    nota: 2
}

const media = (aluno01.nota + aluno02.nota + aluno03.nota) / 3 // objeto.funcionalidade-atributo( atributo do objeto)
console.log(media)

//                              aula 9
//vetores ARRAY

const alunos = [ // uma variavel que armazena varios valores valendo por varias variaveis
    {
        nome: `Matheus`,
        nota: 10
    },
    {
        nome: `Diego`,
        nota: 9.8
    },
    {
        nome: `Maik`,
        nota: 3
    }
]
console.log(alunos)
const media2 = (alunos[0].nota + alunos[1].nota + alunos[2].nota) / 3 // posicoes no array
console.log(media2)