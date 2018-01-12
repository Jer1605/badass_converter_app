import React, {Component} from 'react';
import {convert} from './Services';
import InputItem from './InputItem';

class ConverterEngine extends Component
{

    constructor(props)
    {
        super(props);
        this.state = {
            currencies: [],
            rate: 0,
            value: '',
            firstCurrency: 'EUR',
            secndCurrency: 'JPY',
            inCurrency: '?',
            outCurrency: '?'
        }
        this.obtainRateAndSetInOutCurrencies = this.obtainRateAndSetInOutCurrencies.bind(this);
        this.setNewCurrency = this.setNewCurrency.bind(this);
        this.setNewValue = this.setNewValue.bind(this);
    }

    /*
    On appelle cette fonction dès que le component est monté.
    Cette fonction va faire un appel à l'API pour obtenir les différentes devises qu'on va utiliser dans notre Application et les push dans un tableau.
    On enregistre ce tableaud e devises dans le state currencies.
    */
    componentDidMount()
    {
        fetch('https://api.fixer.io/latest')
            .then(data => data.json())
            .then(data => {
                const currencies = [];
                currencies.push(data.base, ...Object.entries(data.rates).map(rates => rates[0]));
                currencies.sort();
                this.setState({currencies});
            })
            .catch(err => console.log(err));
    }

    /*
    On appelle cette fonction au clic event sur un input.
    Cette fonction va faire un appel à l'API pour obtenir le taux de change entre la monnaie d'entrée {inCurrency} et la monnaie de sortie {outCurrency}
    Elle met aussi à jour les state concernant les monnaies d'entrée, de sortie ainsi que la valeur à convertir.

    Pour les curieux : On voit ici que j'ai utilisé la methode fetch pour récupérer mes données, en voici ici la documentation
        => https://developer.mozilla.org/fr/docs/Web/API/Fetch_API/Using_Fetch
    */

    obtainRateAndSetInOutCurrencies(inCurrency, value)
    {
        const {firstCurrency, secndCurrency} = this.state;
        const outCurrency = inCurrency === firstCurrency ? secndCurrency : firstCurrency;
        fetch(`https://api.fixer.io/latest?base=${inCurrency}`)
            .then(data => data.json())
            .then(data => {
                    this.setState(
                    {
                        inCurrency,
                        outCurrency,
                        rate: data.rates[outCurrency] || 1,
                        value
                    }
                )
            })
            .catch(err => console.log(err))
    }

    /*
    On appelle cette fonction au change event sur un input.
    Cette fonction va récupérer la valeur à convertir et modifier le state correspondant.
    */
    setNewValue(value)
    {
        this.setState({value});
    }

    /*
    On appelle cette fonction au change event du select de la monnaie.
    Cette fonction va réinitialiser les states de la valeur, du taux, ainsi que des monnaies d'entrée et sortie.
    Ensuite, elle va enregistrer la nouvelle monnaie sélectionnée dans le state correspondant.
    */
    setNewCurrency(currency, inputId)
    {
        this.setState({value: '', rate: 0, inCurrency: '', outCurrency: ''});
        inputId === 1 ? this.setState({firstCurrency: currency}) : this.setState({secndCurrency: currency});
    }

    render()
    {
        const {currencies, firstCurrency, secndCurrency, inCurrency, rate, value} = this.state;
        const formatedValue = value.replace('.', ',');
        const value1 = firstCurrency === inCurrency ? formatedValue : convert(value, rate);
        const value2 = secndCurrency === inCurrency ? formatedValue : convert(value, rate);

        return(
            <main className='app-container'>
                <section className='grid-2'>
                    <InputItem
                        inputId={1}
                        onCurrencyChange={this.setNewCurrency}
                        onInputClick={this.obtainRateAndSetInOutCurrencies}
                        onInputChange={this.setNewValue}
                        currencies={currencies}
                        selected={firstCurrency}
                        value={value1}
                    />
                    <InputItem
                        inputId={2}
                        onCurrencyChange={this.setNewCurrency}
                        onInputClick={this.obtainRateAndSetInOutCurrencies}
                        onInputChange={this.setNewValue}
                        currencies={currencies}
                        selected={secndCurrency}
                        value={value2}
                    />
                </section>
                <section className='app-rate'>
                    <p>Rate: {rate}</p>
                </section>
            </main>
        );
    }
}

export default ConverterEngine;
