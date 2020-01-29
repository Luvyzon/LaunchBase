// DESAFIO 01-3
//Usuarios e tecnologias
// criar usuarios com array e em cada usuario os atributos "nome" "tecnologias" em um novo array
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
        return usuario.tecnologias.includes("CSS")
        
    }   
    for (let i = 0; i < usuarios.length; i++) {
        const usuarioTrabalhaComCSS = verificarSeUsaCSS(usuarios[i])
      
        if(usuarioTrabalhaComCSS) {
          console.log(`O usuário ${usuarios[i].nome} trabalha com CSS`)
        }
      }

    

