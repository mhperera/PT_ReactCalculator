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

const reducer = (state, { type, payload }) => {
    switch (type) {
        case ACTIONS.ADD_DIGIT:

            if (payload.digit === '0' && state.currentOperand === '0') return state;

            if (payload.digit === '.' && state.currentOperand.includes('.')) return state;

            return {
                ...state,
                currentOperand: `${state.currentOperand || ""}${payload.digit}`
            };

        case ACTIONS.CLEAR:
            return state;

        case ACTIONS.DELETE_DIGIT:
            return state;


        case ACTIONS.CHOOSE_OPERATION:
            return {
                ...state,
                operation: `${state.operation || ""}${payload.operator}`
            };

        case ACTIONS.EVALUATE:
            return state;

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

            <button className="span-two action" onClick={()=>{ dispatch({ type: ACTIONS.CLEAR }) }}>AC</button>
            <DigitButton digit="DEL" className="action" dispatch={dispatch} />
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
            <DigitButton digit="=" className="span-two" dispatch={dispatch} />

        </div>
    )
}

export default Calculator