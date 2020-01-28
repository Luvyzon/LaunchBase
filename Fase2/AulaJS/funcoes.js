//                                   aula 10
// Funções e metodos

const alunosDaTurmaA = [ 
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

const alunosDaTurmaB = [ 
    {
        nome: `Arthur`,
        nota: 9
    },
    {
        nome: `Carlos`,
        nota: 6
    },
    {
        nome: `Jonas`,
        nota: 8
    }
]

function calculaMedia(alunos){ // função
    return (alunos[0].nota + alunos[1].nota + alunos[2].nota) / 3
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

