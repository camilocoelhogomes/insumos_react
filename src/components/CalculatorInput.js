import React from 'react';
import { Input, Fab, InputAdornment, TextField } from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';

import './CalculatorInput.css'

const CalculatorInput = ({ input, name, hasSoloAnalisys, changeInput, decInput, accInput }) => {


    if (!hasSoloAnalisys && (name === 'phosphor' || name === 'potassium')) {
        return <></>
    }
    return (
        <li className='input'>
            <div className='input-area'>
                <TextField
                    fullWidth
                    label={input.label}
                    value={(input.value === 0) ? '' : input.value}
                    onChange={(event) => changeInput(event.target.value, name)}
                    type='number'
                    InputProps={{
                        endAdornment: < InputAdornment position="end">{input.unit}</InputAdornment>
                    }}
                    size='large'
                />
            </div>
            <div className='input-change-buttons'>
                <Fab onClick={() => decInput(name)} size='small' color='secondary'>
                    <Remove
                        style={{ color: '#FFFFFF' }}
                    />
                </Fab>
                <Fab onClick={() => accInput(name)} size='small' color='secondary'>
                    <Add
                        style={{ color: '#FFFFFF' }}
                    />
                </Fab>
            </div>
        </li>
    )
}

export default CalculatorInput;