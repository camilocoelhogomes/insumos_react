import React from 'react';
import { Fab, InputAdornment, TextField } from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';
import styled from 'styled-components';

const CalculatorInput = ({ input, name, hasSoloAnalisys, changeInput, decInput, accInput }) => {


    if (!hasSoloAnalisys && (name === 'phosphor' || name === 'potassium')) {
        return <></>
    }
    return (
        <StyledInput>
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
                    size='medium'
                />
            </div>
            <div className='input-change-buttons'>
                <Fab onClick={() => decInput(name)} size='small' color='secondary'>
                    <Remove
                        style={{ color: '#FFFFFF' }}
                    />
                </Fab>
                <Fab onClick={() => accInput(name)} size='small' color='primary'>
                    <Add
                        style={{ color: '#FFFFFF' }}
                    />
                </Fab>
            </div>
        </StyledInput>
    )
}

export default CalculatorInput;

const StyledInput = styled.li`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .input-area{
        width: 60%
    }
    .input-change-buttons{
        display: flex;
        justify-content: space-between;
        gap: 8px;
    }
`;