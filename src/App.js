import React, { useReducer } from 'react'
import "./App.css"
import DigitButton from './DigitButton'
import OperationButton from './OperationButton'

export const ACTION = {
  ADD_DIGIT : 'add-digit',
  CHOOSE_OPR : 'choose-opr',
  CLEAR : 'clear',
  DELETE_DIGIT : 'delete-digit',
  EVALUATE : 'evaluate' 
}

function reducer(state, {type, payload}){
  switch(type){
    case ACTION.ADD_DIGIT:
      if(state.overwrite){
        return{
          ...state,
          currentOpr: payload.digit,
          overwrite: false,
        }
      }
      if(payload.digit === "0" && state.currentOpr === "0")return state
      if(payload.digit === "." && state.currentOpr.includes("."))return state
      return {
        ...state,
        currentOpr: `${state.currentOpr || ""}${payload.digit}`
      }
    case ACTION.CLEAR:
      return {};
    
    case ACTION.CHOOSE_OPR:
      if(state.currentOpr == null && state.previousOpr==null)return state;
      if(state.previousOpr == null ){
       return {
        ...state,
        opr : payload.opr,
        previousOpr : state.currentOpr,
        currentOpr : null
       } 
      }
      if(state.currentOpr == null){
        return{
          ...state,
          opr : payload.opr,
        }
          

      }
      return {
        ...state,
        previousOpr : evaluate(state),
        opr : payload.opr,
        currentOpr: null,
      };

    case ACTION.EVALUATE:
      if(state.previousOpr == null || state.currentOpr == null || state.opr == null)return state;
      return {
        ...state,
        previousOpr:null,
        currentOpr: evaluate(state),
        opr : null,
        overwrite : true,

      }
    case ACTION.DELETE_DIGIT:
      if(state.overwrite){
        return{
          ...state,
          overwrite : false,
          currentOpr : null,
        }
      }
      if(state.currentOpr==null)
        return state;
      
      if(state.currentOpr.length ===1)
        return {
          ...state,
          currentOpr : null,
        }
      
      return{
         ...state,
         currentOpr : state.currentOpr.slice(0,-1),
      }
  }

}

function evaluate({currentOpr, previousOpr, opr}) {
   const prev = parseFloat(previousOpr);
   const curr = parseFloat(currentOpr);

   if(isNaN(prev) || isNaN(curr))return "";

  let computation = ""
  
  switch(opr){
    case "+":
      computation = prev + curr;
      break;
    case "-":
      computation = prev - curr;
      break;
    case "*":
      computation = prev * curr;
      break;
    case "/":
      computation = prev / curr;
      break;
  }

  return computation.toString();
}

const INTERGER_FORMATTER = new Intl.NumberFormat("en-us",{
  maximumFractionDigits: 0,
})

function formatOperand(operand){
  if(operand==null)return

  const [integer, decimal] = operand.split(".")
  if(decimal==null)return INTERGER_FORMATTER.format(integer)
  return `${INTERGER_FORMATTER.format(integer)}.${decimal}`
}


function App() {

  const [{currentOpr, previousOpr, opr}, dispatch] = useReducer(reducer,{}) 


  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-opr">{formatOperand(previousOpr)}{opr}</div>
        <div className="current-opr">{formatOperand(currentOpr)}</div>
      </div>
    <button className='span-two' onClick={()=>dispatch({type:ACTION.CLEAR})}>AC</button>
    <button onClick={()=>dispatch({type:ACTION.DELETE_DIGIT})}>DEL</button>
    <OperationButton opr = "/" dispatch={dispatch}/>
    <DigitButton digit = "1" dispatch={dispatch}/>
    <DigitButton digit = "2" dispatch={dispatch}/>
    <DigitButton digit = "3" dispatch={dispatch}/>
    <OperationButton opr = "*" dispatch={dispatch}/>
    <DigitButton digit = "4" dispatch={dispatch}/>
    <DigitButton digit = "5" dispatch={dispatch}/>
    <DigitButton   digit = "6" dispatch={dispatch}/>
    <OperationButton opr = "+" dispatch={dispatch}/>
    <DigitButton digit = "7" dispatch={dispatch}/>
    <DigitButton digit = "8" dispatch={dispatch}/>
    <DigitButton digit = "9" dispatch={dispatch}/>
    <OperationButton opr = "-" dispatch={dispatch}/>
    <DigitButton digit = "0" dispatch={dispatch}/>
    <DigitButton digit = "." dispatch={dispatch}/>
    <button className='span-two' onClick={()=>dispatch({type : ACTION.EVALUATE})}>=</button>

    <div className='nameplate'>By &nbsp; <span> <a href="https://www.linkedin.com/in/kuldipgohil13621a/"> Kuldip Gohil </a></span></div>
    </div>
  )
}

export default App