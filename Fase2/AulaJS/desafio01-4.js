// DESAFIO 01-4
// Aplicação: Operaçoes Bancarias

const user = {
    name: 'Matheus',
    transactions: [],
    balance: 0
}
const counter = {
    credit: 0,
    debit:0
}

function createTransaction (transaction){
    user.transactions.push(transaction)
    if(transaction.type === 'credit'){
        user.balance += transaction.value
    }  else if(transaction.type === 'debit'){
        user.balance -= transaction.value
    } else {
        
        user.transactions.pop()
        user.transactions.push({type:'invalid', value:0})
    }
    
}

function getHigherTransactionByType (type){
    let higher = 0
    let higherTransaction = {}
    higherTransaction.value = 0
    for (let transaction of user.transactions) {

        if (transaction.type == type) {
            
            higher = transaction.value
            
            if (higher > higherTransaction.value){
                higherTransaction = transaction   
            }
        }
    }

    console.log(higherTransaction)
}

function getAverageTransactionValue(){
    let soma = 0
    for(let i = 0; i < user.transactions.length; i++){
        soma = soma + user.transactions[i].value
    }
    const average = soma / user.transactions.length
    console.log(average)
}

function getTransactionCount(){
    
   for (let i = 0; i < user.transactions.length; i++) {
        
        if (user.transactions[i].type === 'credit') {
            counter.credit += 1
        }else if(user.transactions[i].type === 'debit'){
            counter.debit += 1
        }
    }
    
    
    console.log(counter)
}

createTransaction({ type: 'credit', value: 50 })
createTransaction({ type: 'credit', value: 120 })
createTransaction({ type: 'debit', value: 80 })
createTransaction({ type: 'debit', value: 30 })
createTransaction({ type: 'teste', value: 30 })

console.log(user.balance)
console.table(user.transactions)

getHigherTransactionByType('credit')
getHigherTransactionByType('debit') 

getAverageTransactionValue()

getTransactionCount()



