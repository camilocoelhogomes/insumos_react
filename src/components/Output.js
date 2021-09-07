import { Typography } from '@material-ui/core';
import './Output.css'

const Output = ({ formula }) => {
    return (
        <div className='output-card'>
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
        </div>
    )
}

export default Output;