import React, { useState } from 'react'
import HistoryPanel from './HistoryPanel'
import './Calculator.css'

const Calculator = () => {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState(null)
  const [operation, setOperation] = useState(null)
  const [waitingForNewValue, setWaitingForNewValue] = useState(false)
  const [history, setHistory] = useState([])
  const [showHistory, setShowHistory] = useState(false)

  const inputNumber = (num) => {
    if (waitingForNewValue) {
      setDisplay(String(num))
      setWaitingForNewValue(false)
    } else {
      setDisplay(display === '0' ? String(num) : display + num)
    }
  }

  const inputDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.')
      setWaitingForNewValue(false)
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.')
    }
  }

  const clear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForNewValue(false)
  }

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      if (!waitingForNewValue) {
        const currentValue = previousValue || 0
        const newValue = calculate(currentValue, inputValue, operation)

        // Add to history
        const historyEntry = {
          id: Date.now(),
          expression: `${formatNumber(currentValue)} ${getOperationSymbol(operation)} ${formatNumber(inputValue)}`,
          result: formatNumber(newValue)
        }
        setHistory(prev => [historyEntry, ...prev])

        setDisplay(String(newValue))
        setPreviousValue(newValue)
      }
    }

    setWaitingForNewValue(true)
    setOperation(nextOperation)
  }

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue
      case '-':
        return firstValue - secondValue
      case '*':
        return firstValue * secondValue
      case '/':
        return secondValue !== 0 ? firstValue / secondValue : 0
      case '=':
        return secondValue
      default:
        return secondValue
    }
  }

  const getOperationSymbol = (op) => {
    switch (op) {
      case '+':
        return '+'
      case '-':
        return '−'
      case '*':
        return '×'
      case '/':
        return '÷'
      default:
        return op
    }
  }

  const formatNumber = (num) => {
    // Format large numbers and decimals
    if (num.toString().length > 10) {
      return num.toExponential(5)
    }
    return num.toString()
  }

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const inputValue = parseFloat(display)
      const newValue = calculate(previousValue, inputValue, operation)

      // Add to history
      const historyEntry = {
        id: Date.now(),
        expression: `${formatNumber(previousValue)} ${getOperationSymbol(operation)} ${formatNumber(inputValue)}`,
        result: formatNumber(newValue)
      }
      setHistory(prev => [historyEntry, ...prev])

      setDisplay(String(newValue))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForNewValue(true)
    }
  }

  const clearHistory = () => {
    setHistory([])
  }

  const clearEntry = () => {
    setDisplay('0')
  }

  const deleteLast = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1))
    } else {
      setDisplay('0')
    }
  }

  const toggleSign = () => {
    if (display !== '0') {
      setDisplay(display.charAt(0) === '-' ? display.slice(1) : '-' + display)
    }
  }

  return (
    <div className="calculator-container">
      <div className="calculator">
        <div className="calculator-header">
          <h2>Calculator</h2>
          <button 
            className="history-toggle"
            onClick={() => setShowHistory(!showHistory)}
            title="History"
          >
            {showHistory ? '✕' : '☰'}
          </button>
        </div>

        <div className="display">
          <div className="display-value">{display}</div>
        </div>

        <div className="button-grid">
          <button className="button function" onClick={clearEntry}>CE</button>
          <button className="button function" onClick={clear}>C</button>
          <button className="button function" onClick={deleteLast}>⌫</button>
          <button className="button operator" onClick={() => performOperation('/')}>÷</button>

          <button className="button number" onClick={() => inputNumber(7)}>7</button>
          <button className="button number" onClick={() => inputNumber(8)}>8</button>
          <button className="button number" onClick={() => inputNumber(9)}>9</button>
          <button className="button operator" onClick={() => performOperation('*')}>×</button>

          <button className="button number" onClick={() => inputNumber(4)}>4</button>
          <button className="button number" onClick={() => inputNumber(5)}>5</button>
          <button className="button number" onClick={() => inputNumber(6)}>6</button>
          <button className="button operator" onClick={() => performOperation('-')}>−</button>

          <button className="button number" onClick={() => inputNumber(1)}>1</button>
          <button className="button number" onClick={() => inputNumber(2)}>2</button>
          <button className="button number" onClick={() => inputNumber(3)}>3</button>
          <button className="button operator" onClick={() => performOperation('+')}>+</button>

          <button className="button function" onClick={toggleSign}>+/−</button>
          <button className="button number" onClick={() => inputNumber(0)}>0</button>
          <button className="button number" onClick={inputDecimal}>.</button>
          <button className="button operator equals" onClick={handleEquals}>=</button>
        </div>
      </div>

      {showHistory && (
        <HistoryPanel 
          history={history} 
          onClearHistory={clearHistory}
          onClose={() => setShowHistory(false)}
        />
      )}
    </div>
  )
}

export default Calculator
