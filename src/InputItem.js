import React, {Component} from 'react';

/*
    Cette classe va gérer les blocs d'inputs.
    On handle les events click, change et select.
    On map l'array currencies qui contient toutes les devises tirées de l'API fixer.io, et pour chacune d'entre elle on dipslay un option.
*/

class InputItem extends Component
{
    constructor(props)
    {
        super(props);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleInputClick = this.handleInputClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    /* Au change du select, on appelle la fonction "onCurrencyChange" passée en props par convertEngine, et on passe les attributs. */
    handleSelectChange(e)
    {
        this.props.onCurrencyChange(e.target.value, this.props.inputId);
    }

    /* Au click sur l'input, on appelle la fonction "onInputClick" passée en props par convertEngine, et on passe les attributs. */
    handleInputClick(e)
    {
        this.props.onInputClick(this.props.selected, e.target.value);
    }

    /* Au change sur l'input, on appelle la fonction "onInputChange" passée en props par convertEngine, et on passe les attributs. */
    handleInputChange(e)
    {
        this.props.onInputChange(e.target.value);
    }

    render()
    {
        const {currencies, selected, value} = this.props;
        return(
            <div className='input-grid-item'>
                <div className='input-item-content'>
                    <legend>{selected}</legend>
                    <div className='grid-2'>
                        <div className="input">
                             <input
                                 type='text'
                                 name='amount'
                                 value={value}
                                 onChange={this.handleInputChange}
                                 onClick={this.handleInputClick}
                             />
                            <label className='input-label'>
                                <span className='input-label-content'>Amount</span>
                            </label>
                        </div>
                        <select onChange={this.handleSelectChange} value={selected}>
                            {
                                currencies.map(
                                    currency => {
                                        return currency === selected ? (<option key={currency} value={currency}>{currency}</option>) : (<option key={currency} value={currency}>{currency}</option>);
                                    }
                                )
                            }
                        </select>
                    </div>
                </div>
            </div>
        );
    }
}

export default InputItem;