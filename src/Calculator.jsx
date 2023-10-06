import React, { useReducer } from 'react'
import DigitButton from './DigitButton';
import OperationButton from './OperationButton';

export const ACTIONS = {
    ADD_DIGIT: 'add-digit',
    CLEAR: 'clear',
    DELETE_DIGIT: 'delete-digit',
    CHOOSE_OPERATION: 'choose-operation',
    EVALUATE: 'evaluate',
}

const evaluate = ({ currentOperand, previousOperand, operation }) => {
    const previous = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(previous) || isNaN(current)) return ""
    let computation = '';
    switch (operation) {
        case "+":
            computation = previous + current;
            break;
        case "-":
            computation = previous - current;
            break;
        case "*":
            computation = previous * current;
            break;
        case "÷":
            computation = previous / current;
            break;
        default:
    }
    return computation.toString();
}

const reducer = (state, { type, payload }) => {

    switch (type) {

        case ACTIONS.ADD_DIGIT:

            if (state.override) {
                return {
                    ...state,
                    currentOperand: payload.digit,
                    override: false
                };
            }

            if (payload.digit === '0' && state.currentOperand === '0') {
                return state;
            }

            if (payload.digit === '.' && state.currentOperand.includes('.')) {
                return state;
            }

            return {
                ...state,
                currentOperand: `${state.currentOperand || ""}${payload.digit}`
            };

        case ACTIONS.CLEAR:
            return {};

        case ACTIONS.DELETE_DIGIT:

            if(state.override){
                return {
                    ...state,
                    override: false,
                    currentOperand: null
                }
            }

            if(!state.currentOperand){
                return state;
            }

            if(state.currentOperand.length === 1){
                return {
                    ...state,
                    override: false,
                    currentOperand: null
                }
            }

            return {
                ...state,
                override: false,
                currentOperand: state.currentOperand.slice(0, -1)
            };

        case ACTIONS.CHOOSE_OPERATION:

            if (!state.previousOperand && !state.currentOperand) {
                return state
            };

            if (!state.previousOperand && state.currentOperand) {
                return {
                    ...state,
                    operation: payload.operator,
                    previousOperand: state.currentOperand,
                    currentOperand: null
                }
            }

            if (state.previousOperand && !state.currentOperand) {
                return {
                    ...state,
                    operation: payload.operator
                }
            }

            return {
                ...state,
                previousOperand: evaluate(state),
                currentOperand: null,
                operation: payload.operator
            };

        case ACTIONS.EVALUATE:

            if (!state.previousOperand || !state.currentOperand || !state.operation) {
                return state;
            }

            return {
                ...state,
                previousOperand: null,
                currentOperand: evaluate(state),
                operation: null,
                override: true
            };

        default:
            return state;
    }
}

const Calculator = () => {

    const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {});

    // dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: 1 } });

    return (
        <div className='calculator-grid'>

            <div className="output">
                <div className="previous-operand">{previousOperand} {operation}</div>
                <div className="current-operand">{currentOperand}</div>
            </div>

            <button className="span-two action" onClick={() => { dispatch({ type: ACTIONS.CLEAR }) }}>AC</button>
            <button className="action" onClick={() => { dispatch({ type: ACTIONS.DELETE_DIGIT }) }}>DEL</button>
            <OperationButton operator="÷" className="action" dispatch={dispatch} />

            <DigitButton digit="1" dispatch={dispatch} />
            <DigitButton digit="2" dispatch={dispatch} />
            <DigitButton digit="3" dispatch={dispatch} />
            <OperationButton operator="*" className="action" dispatch={dispatch} />

            <DigitButton digit="4" dispatch={dispatch} />
            <DigitButton digit="5" dispatch={dispatch} />
            <DigitButton digit="6" dispatch={dispatch} />
            <OperationButton operator="+" className="action" dispatch={dispatch} />

            <DigitButton digit="7" dispatch={dispatch} />
            <DigitButton digit="8" dispatch={dispatch} />
            <DigitButton digit="9" dispatch={dispatch} />
            <OperationButton operator="-" className="action" dispatch={dispatch} />

            <DigitButton digit="." dispatch={dispatch} />
            <DigitButton digit="0" dispatch={dispatch} />
            <button className="span-two" onClick={() => { dispatch({ type: ACTIONS.EVALUATE }) }}>=</button>

        </div>
    )
}

export default Calculator