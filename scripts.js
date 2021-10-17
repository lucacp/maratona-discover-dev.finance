const Modal = {
  toggle(){
    document
      .querySelector('.modal-overlay')
      .classList
      .toggle('active')
  }
}

const Storage = {
  get(){
    return JSON.parse(localStorage.getItem("dev.finances:transation")) || []
  },

  set(transation){
    localStorage.setItem("dev.finances:transation",
                        JSON.stringify(transation))
  }
}

const Transaction = {
  all: Storage.get(),
  
  add(transaction){
    Transaction.all.push(transaction)
    App.reload()
  },

  remove(index){
    Transaction.all.splice(index,1)
    App.reload()
  },
  
  income(){
    let income = 0
    Transaction.all.forEach((transaction)=>{
      income+= transaction.amount > 0 ? transaction.amount : 0
    })
    return income
  },
  
  expenses(){
    let expenses = 0
    Transaction.all.forEach((transaction)=>{
      expenses+= transaction.amount < 0 ? transaction.amount : 0
    })
    return expenses
  },
  
  total(){
    return Transaction.income() + Transaction.expenses()
  }
}

const DOM = {
  transactionContainer: document.querySelector('#data-table tbody'),

  addTransaction(transaction,index){
    const tr = document.createElement("tr")
    tr.innerHTML = DOM.innerHTMLTransaction(transaction,index)
    tr.dataset = index
    DOM.transactionContainer.appendChild(tr)
  },

  innerHTMLTransaction(transaction,index){
    const CSSClass = transaction.amount < 0 ? "expense":"income"
    const amount = Utils.formatCurrency(transaction.amount)
    const html = `
                <td class="description">${transaction.description}</td>
                <td class="${CSSClass}">${amount}</td>
                <td class="date">${transaction.date}</td>
                <td>
                  <img onclick="Transaction.remove(${index})" src="assets/minus.svg" alt="Imagem Remover" />
                </td>
                `
    return html
  },

  updateBalance(){
    document
      .getElementById('incomesDisplay')
      .innerHTML = Utils.formatCurrency(Transaction.income())
    document
      .getElementById('expensesDisplay')
      .innerHTML = Utils.formatCurrency(Transaction.expenses())
    document
      .getElementById('totalDisplay')
      .innerHTML = Utils.formatCurrency(Transaction.total())
  },

  clearTransactions(){
    DOM.transactionContainer.innerHTML = ""
  }
}
const Utils = {
  formatAmount(value){
    value = Number(value) * 100
    return value
  },

  formatDate(date){
    const splittedDate = date.split("-")
    return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
  },

  formatCurrency(value){
    const signal = Number(value) < 0 ? "-":""
    value = String(value).replace(/\D/g,"")
    value = Number(value) / 100
    value = value.toLocaleString("pt-BR",{
      style: "currency",
      currency: "BRL"
    })
    return signal + value
  }  
}

const Form = {
  description: document.querySelector("input#description"),
  amount: document.querySelector("input#amount"),
  date: document.querySelector("input#dias"),
  
  getValues(){
    return {
      description: Form.description.value,
      amount: Form.amount.value,
      date: Form.date.value
    }
  },
  
  validadeFields(){
    const {description,amount,date} = Form.getValues()
    if(description.trim() === "" ||
            amount.trim() === "" ||
              date.trim() === ""){
                throw new Error("Por favor, preencha todos os campos")
              }
  },

  formatValues(){
    let { description, amount, date } = Form.getValues()
    amount = Utils.formatAmount(amount)
    date   = Utils.formatDate(date)
    return {
      description,
      amount,
      date
    }
  },

  clearFields(){
    this.description.value = ""
    this.amount.value = ""
    this.date.value = ""
  },

  submit(event){
    event.preventDefault()
    try{
      Form.validadeFields()
      const transaction = Form.formatValues()
      Transaction.add(transaction)
      Form.clearFields()
      Modal.toggle()
    } catch(error){
      console.log(error)
      alert(error.message)
    }
  }
}

const App = {
  init(){
    Transaction.all.forEach(DOM.addTransaction)
    
    DOM.updateBalance()
    
    Storage.set(Transaction.all)
  },
  reload(){
    DOM.clearTransactions()
    App.init()
  }
}

App.init()
