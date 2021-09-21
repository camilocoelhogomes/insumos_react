import { Typography } from '@material-ui/core';
import styled from 'styled-components';

const Output = ({ formula }) => {
    return (
        <StyledOutput>
            <h2 className='output-title'>Correção Nescessária</h2>
            <ul>
                <li className='output-line'>
                    <Typography variant='subtitle2' color='primary'>
                        Formulado
                    </Typography>
                    <span className='output-qtd-min'>
                        {formula.formula.N}-{formula.formula.P}-{formula.formula.K}
                    </span>
                </li>
                <li className='output-line'>
                    <span className='output-label'>
                        Quantidade por Hectare:
                    </span>
                    <span className='output-qtd'>
                        <span className='output-qtd-min'>
                            {formula.qtdArea[0].toFixed(0)} Kg - {formula.qtdArea[1].toFixed(0)} kg
                        </span>
                    </span>
                </li>
                <li className='output-line'>
                    <span className='output-label'>
                        Quantidade por planta:
                    </span>
                    <span className='output-qtd-min'>
                        {formula.qtdPlants[0].toFixed(0)} g - {formula.qtdPlants[1].toFixed(0)} g
                    </span>
                </li>
            </ul>
        </StyledOutput>
    )
}

export default Output;

const StyledOutput = styled.div`

    width: 100%;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25), 0px -1px 4px #CDCDD0;
    border-radius: 10px;
    padding: 12px 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 32px;


.output-title {
    font-family: 'Roboto',sans-serif;
    font-weight: 500;
    font-size: 18px;
}

.output-line {
    margin: 20px 0;
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    font-family: 'Roboto', sans-serif;
    border-bottom: 1px solid #CDCDD044;
}

.output-label {
    width: 45%;
    color: #FE5E31;
    font-size: 16px;
    font-family: 'Roboto',sans-serif;
    font-weight: bold;
}

.output-qtd{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-family: 'Roboto',sans-serif;
}

.output-qtd-min{
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: 500;
}

`;