//                                   aula 10 e 11
// Funções e metodos   // estrutura de repetição

const alunosDaTurmaA = [ 
    {
        nome: 'Matheus',
        nota: 10
    },
    {
        nome: 'Diego',
        nota: 9.8
    },
    {
        nome: 'Maik',
        nota: 3
    }
    ,// adição aula 11
    {
        nome: 'cledesvaldo',
        nota: 4
    }
]

const alunosDaTurmaB = [ 
    {
        nome: 'Arthur',
        nota: 9
    },
    {
        nome: 'Carlos',
        nota: 6
    },
    {
        nome: 'Jonas',
        nota: 8
    }
    ,// adicao aula 11
    {
        nome: 'carlito',
        nota: 10
    }
]

function calculaMedia(alunos){ // função
    //return (alunos[0].nota + alunos[1].nota + alunos[2].nota) / 3
    
    // conteuno aula 11
    let soma = 0
    for(let i = 0; i < alunos.length; i++){
        console.log(i)
        soma = soma + alunos[i].nota

    }
    const media = soma / alunos.length
    
    return media
}
const media1 = calculaMedia(alunosDaTurmaA)
const media2 = calculaMedia(alunosDaTurmaB)

function enviaMensagem(media, turma){
    if(media > 5) {
        console.log(`Parabens a turma ${turma}! a media foi ${media}`)
    } else {
        console.log(`a turma ${turma} precisa melhorar, a media foi menor que 5`)
    }
}
enviaMensagem (media1, 'turma A')
enviaMensagem (media2, 'turma B')

//                                12
// escopos

