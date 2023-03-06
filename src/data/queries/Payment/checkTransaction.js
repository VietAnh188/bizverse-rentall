import { generateSignature, verifySignature } from '../../../libs/security';
import axios from 'axios';

export default async function checkTransaction (trxRefNo) {
    const messages = {
      merchantCode: process.env.MERCHANT_CODE,
      trxRefNo: trxRefNo
    }

    const signature = generateSignature(JSON.stringify(messages), process.env.MERCHANT_PRIVATE_KEY);

    try {
        const response = await axios({
            method: 'POST',
            url: process.env.PAYMENT_GATEWAY_CHECKTRANS_URL,
            headers: {
            'Content-Type': 'application/json'
            },
            data: {
            signature: signature,
            messages: JSON.stringify(messages)
            }
        });

        console.log("--------------------------- CHECk TRANSACTION RESPONSE --------------------------------------------------", JSON.parse(response.data.messages))
        
        if (!response.data.messages || !response.data.signature) {
            return null;
        }

        const verifySig = verifySignature(response.data.messages, response.data.signature, process.env.ONEFIN_PG_PUBLIC_KEY);
        
        if (verifySig)  {
            return JSON.parse(response.data.messages);
        } else {
            return null;
        }
       
    } catch (error) {
        console.log(error);
        return null
    }
  }