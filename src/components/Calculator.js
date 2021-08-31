import CalculatorInput from './CalculatorInput';
import './Calculator.css';



const Calculator = ({ navigation, changeInput, decInput, accInput }) => {
    const calculatorInputs = navigation[1].subItens[0].inputs;

    return (
        <ul>
            {Object.keys(calculatorInputs).map((input) =>
                <CalculatorInput
                    input={navigation[1].subItens[0].inputs[input]}
                    name={input} hasSoloAnalisys={navigation[1].config.hasSoloAnalisys}
                    changeInput={changeInput}
                    decInput={decInput}
                    accInput={accInput}
                />)}
        </ul>
    )
}

export default Calculator;