import React from 'react';
import { Input, Fab, InputAdornment } from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';

import './CalculatorInput.css'

const CalculatorInput = ({ input, name, hasSoloAnalisys, changeInput, decInput, accInput }) => {


    if (!hasSoloAnalisys && (name === 'phosphor' || name === 'potassium')) {
        return <></>
    }
    return (
        <li className='input'>
            <div className='input-area'>
                <p className='input-label'>{input.label}</p>
                <Input
                    fullWidth
                    value={(input.value === 0) ? '' : input.value}
                    onChange={(event) => changeInput(event.target.value, name)}
                    type='number'
                    endAdornment={<InputAdornment position="end">{input.unit}</InputAdornment>}
                />
            </div>
            <div className='input-change-buttons'>
                <Fab size='small' color='secondary'>
                    <Remove
                        style={{ color: '#FFFFFF' }}
                        onClick={() => decInput(name)}
                    />
                </Fab>
                <Fab size='small' color='secondary'>
                    <Add
                        style={{ color: '#FFFFFF' }}
                        onClick={() => accInput(name)}
                    />
                </Fab>
            </div>
        </li>
    )
}

export default CalculatorInput;