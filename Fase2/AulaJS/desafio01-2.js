// Desafio 01-2 
//Construçao e impressao de objetos

const empresa = {
    nome : 'Rocketseat',
    cor : 'Roxo',
    foco : 'Programação',
    endereco : {
        rua : 'Rua Guilherme Gembala',
        numero : '260'
    }
}
console.log(`A empresa ${empresa.nome} esta localizada em ${empresa.endereco.rua}, ${empresa.endereco.numero}.`)


// vetores e objetos

const programador = {
    nome: 'Jonathan',
    idade: 24,
    tecnologias:[
        {
            nome: 'C++',
            especialidade: 'Desktop'
        },
        {
            nome: 'Python',
            especialidade: 'Data Science'
        },
        {
            nome: 'Javascript',
            especialidade: 'Web/Mobile'
        }
    ]
}
console.log(`O Programador ${programador.nome} tem ${programador.idade} anos e usa a tecnologia ${programador.tecnologias[0].nome} com especialidade em ${programador.tecnologias[0].especialidade}`)

    
    
