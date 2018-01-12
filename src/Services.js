
/* COMMON FUNCTIONS */
/* Contient toutes les fonctions globales que j'utilise dans mon application */

function mult(variable, coefficient)
{
    return (Math.round((variable * coefficient) * 1000000) / 1000000).toString();
}

/* On exporte cette fonction qui va tout simplement multiplier une valeur par un coefficient */
export function convert(value, rate)
{
    const val = parseFloat(value.replace(',', '.'));
    const coefficient = parseFloat(rate);
    return Number.isNaN(val) ? '' : (mult(val, coefficient)).replace('.', ',');
}