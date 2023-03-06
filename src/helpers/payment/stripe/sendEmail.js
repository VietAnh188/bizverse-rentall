import axios from 'axios'

export async function sendEmail(to, type, mailContents, isLoggedIn, authToken, ) {
    let headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    };

    if (isLoggedIn) {
        headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            auth: authToken
        };
    }

    // Validation IsLoggedIn
    if (isLoggedIn && !authToken) {
        return {
            status: 400,
            errorMessage: 'Authentication Token Error!'
        }
    }
    
    const request = await axios({
        method: 'post',
        url: '/sendEmailTemplate',
        headers,
        data: ({
            to,
            type,
            content: mailContents
        })
    })

    return {
        status: request.data.status,
        errorMessage: request.data.errorMessage
    };
}

export default {
    sendEmail
}
