// DESAFIO 01-1
// CALCULAR IMC

const nome = 'Matheus'
const peso = 123
const altura = 1.78

const imc = peso / (altura * altura)

if(imc >= 30) {
    console.log(`${nome} você esta acima do peso! seu IMC é ${imc}`)
}else {
    console.log(`${nome} você nao esta acima do peso! seu IMC é ${imc}`)
}

// CALCULAR APOSENTADORIA

const nome2 = 'Matheus'
const sexo = 'M'
const idade = 22
const contribuicao = 22

if(sexo === 'M'){
    const somaM = idade + contribuicao
    if(somaM >= 95){
        console.log(`${nome2}, você pode se aposentar`)
    }else {
        console.log(`${nome2}, você nao pode se aposentar`)
    }
}
if (sexo === 'F') {
    const somaF = idade + contribuicao
    if(somaF >= 85){
        console.log(`${nome2}, você pode se aposentar`)
    }else {
        console.log(`${nome2}, você nao pode se aposentar`)
    }
}