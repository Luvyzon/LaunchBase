//                          aula 6


// Desafio 1 - verificar se é maior de 18
const pessoa = 'matheus'
const idadePessoa = 22
console.log(idadePessoa >= 18)
if(idadePessoa >= 18){
    console.log(`O individuo ${pessoa} pode entrar`)
} else{
    console.log('bloquear entrada')
}
if(idadePessoa ===17){
    console.log(`O individuo ${pessoa} não é maior de idade, e só podera entrar quando completar 18 anos`)
}



//                         aula 7


// !- Nao .... &&- E ..... ||- ou
console.log(5 == 5 && 6 == 6) //true
console.log(5 == 5 && 6 != 6) //false

console.log(5 != 5 || 6 == 6) //true
console.log(5 == 5 || 6 != 6) //true

console.log(!(5>6)) // true
console.log(!(5<6)) // false

// operadores aritmeticos
console.log(2 * 2)    //4         multiplicação
console.log(2 / 2)    //1         divisão
console.log(2 % 1.5)  //0.5       resto da divisão
console.log(2 + 2)    //4         adição
console.log(2 - 1)    //1         subtração
