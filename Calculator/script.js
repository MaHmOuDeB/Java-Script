class Calculator{
    constructor(previousOperandText, currentOperandText){
        this.previousOperandText = previousOperandText
        this.currentOperandText = currentOperandText
        this.clear()
    }

    clear(){
        this.currentOperand = '';
         this.previousOperand = '';
         this.currentOperand = this.currentOperand.toString().slice(0 , 10)
         this.operation = ' ';
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0 , -1)
    }

    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation){
        if(this.currentOperand === '') return;
        if (this.previousOperand !== ''){
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute(){
        let computation;
        const previous = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if(isNaN(previous) || isNaN(current)) return;
        switch (this.operation){
            case '+':
                computation = previous + current;
                break;
            case '*':
                computation = previous * current;
                break;
            case '-':
                computation = previous - current;
                break;
            case '÷':
                computation = previous / current;
                break;
            default:
                return
        }
        this.currentOperand = computation
         this.operation = ' '
        this.previousOperand = '';
    }


    getDisplayNumber(number){
        const floatNumber = parseFloat(number)
        if(isNaN(floatNumber)) return ''
        return floatNumber.toLocaleString('en')
    }

    updateDisplay(){
        this.currentOperandText.innerText = this.getDisplayNumber(this.currentOperand);
        if(this.operation !== null || this.operation !== '='){
            this.previousOperandText.innerText = 
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equal]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-clear-all]')
const previousOperandText = document.querySelector('[data-previous-operand]')
const currentOperandText = document.querySelector('[data-current-operand]')


const calculator = new Calculator(previousOperandText , currentOperandText);

numberButtons.forEach(button => {
    button.addEventListener('click' , () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})


operationButtons.forEach(button => {
    button.addEventListener('click' , () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click' , button => {
    calculator.compute();
    calculator.updateDisplay();

})

allClearButton.addEventListener('click' , button => {
    calculator.clear();
    calculator.updateDisplay();
    this.getDisplayNumber(this.previousOperand.value = 0);

})

deleteButton.addEventListener('click' , button => {
    calculator.delete();
    calculator.updateDisplay();
})