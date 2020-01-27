//                                     aula 2
const nome = 'matheus' // string com aspas simples
console.log(nome)

//                                     aula 3
const nome2 = "antonio" //string com aspas duplas
const nome3 = ` meu nome é ${nome} ${nome2} luvison ` // string com variaveis
console.log(nome2)
console.log(nome3)

const aluno1 = 'matheus'
const aluno2 = 'carlos'
const aluno3 = 'andreia'
const notaAluno1 = 10
const notaAluno2 = 7.5
const notaAluno3 = 9.2

//                                   aula 4
const media = (notaAluno1+notaAluno2+notaAluno3) / 3
console.log(media)

//                                    aula 5
if(media > 5) {
    console.log(`Parabens a turma! a media foi ${media}`)
} else {
    console.log('a turma precisa melhorar, a media foi menor que 5')
}