// DESAFIO 01-3
//Usuarios e tecnologias
// criar usuarios com array e em cada usuario os atributos "nome" "tecnologias" em um novo array

/*
const usuarios = [
    {
        nome: 'Matheus',
        tecnologias:['HTML' , "CSS"]
    },
    {
        nome: 'Jonathan',
        tecnologias:['Ruby' , 'Javascript']
    },
    {
        nome: 'Arthur',
        tecnologias:['Javascript' , 'SQL']
    }
]


for(let i = 0; i < usuarios.length; i++){
    console.log(`${usuarios[i].nome} trabalha com ${usuarios[i].tecnologias[0]}, ${usuarios[i].tecnologias[1]}`)   
}


    // BUSCA POR TECNOLOGIA
    // usar mesma lista de usuarios para buscar se um usuario trabalha 
    // com determinada linguagem retornando parametro boolean

function verificarSeUsaCSS(usuario){
    /* for (let i = 0; i < usuarios.length; i++){
        
            console.log((usuarios[i].tecnologias[0] || usuarios[i].tecnologias[1]) == "CSS")
    
            
        }*/
        /*
        return usuario.tecnologias.includes("CSS")
        
    }   
    for (let i = 0; i < usuarios.length; i++) {
        const usuarioTrabalhaComCSS = verificarSeUsaCSS(usuarios[i])
      
        if(usuarioTrabalhaComCSS) {
          console.log(`O usuário ${usuarios[i].nome} trabalha com CSS`)
        }
      }
*/
      //   SOMA DE DESPESAS E RECEITAS
      const usuarios = [
        {
          nome: 'Salvio',
          receitas: [115.3, 48.7, 98.3, 14.5],
          despesas: [85.3, 13.5, 19.9]
        },
        {
          nome: 'Marcio',
          receitas: [24.6, 214.3, 45.3],
          despesas: [185.3, 12.1, 120.0]
        },
        {
          nome: 'Lucia',
          receitas: [9.8, 120.3, 340.2, 45.3],
          despesas: [450.2, 29.9]
        }
      ]

function somaNumeros(numeros){
    let soma = 0
    for (let i = 0; i < numeros.length; i++) {
        const numero = numeros[i]
        soma = soma + numero
        
        
    }
    return soma
    
}   


function calculaSaldo(receitas, despesas) {
            const totalReceita = somaNumeros(receitas)
            const totalDespesa = somaNumeros(despesas)
            const saldo = totalReceita - totalDespesa
            return saldo
}
for(let i = 0; i < usuarios.length; i++){
  const usuario = usuarios[i]
  const saldoFinal = calculaSaldo(usuario.receitas, usuario.despesas)

  if(saldoFinal < 0){
    console.log(`${usuario.nome} possui saldo POSITIVO de ${saldoFinal.toFixed(2)}`)
  }else {
    console.log(`${usuario.nome} possui saldo NEGATIVO de ${saldoFinal.toFixed(2)}`)
  }
}


