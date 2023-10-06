import React from 'react';
import { ACTIONS } from './Calculator';

const OperationButton = ({ operator, dispatch, className }) => {

    console.log(operator);

    return (
        <button
            className={className}
            onClick={() => { dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operator } }); }}
        >
            {operator}
        </button>
    )
}

export default OperationButton