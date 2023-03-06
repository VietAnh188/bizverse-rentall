import { toastr } from 'react-redux-toastr';
import fetch from '../fetch';
import { PAYPAL_WITHOUT_DECIMAL } from '../../constants/currency';

export async function sendPayment(reservationId, amount, currency, description) {
    const targetAmount = PAYPAL_WITHOUT_DECIMAL.includes(currency.toUpperCase()) ? Math.ceil(amount) : amount;
    const resp = await fetch('/paynow', {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ reservationId, amount: targetAmount, currency, description }),
        credentials: 'include'
    });
    const { redirect, error } = await resp.json();

    if (redirect) {
        window.location = redirect;
    } else {
        toastr.error('Error Occured!', error);
    }
}
