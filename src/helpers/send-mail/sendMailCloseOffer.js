import { getUserInfoByUniqueKey } from '../user/getUserInfoByUniqueKey';
import { sendServerEmail } from '../../core/email/sendServerEmail';
import { getLogo } from './getLogo';
export const sendMailCloseOffer = async ({ seller, buyer, nft, price, currency }) =>{
     try {
         const [sellerInfo, buyerInfo, hostInfo] = await Promise.all([
             getUserInfoByUniqueKey({ wallet: seller }),
             getUserInfoByUniqueKey({ wallet: buyer }),
             getUserInfoByUniqueKey({ userId: nft.hostId })
         ]);
         if(sellerInfo && buyerInfo){
            const sellEmailContent = { seller, buyer, nft, price, currency, sellerInfo, buyerInfo };
            const buyEmailContent = { seller, buyer, nft, price, currency, sellerInfo, buyerInfo };

            await Promise.all([
                sendServerEmail(sellerInfo.email, 'sellNFT', sellEmailContent),
                sendServerEmail(buyerInfo.email, 'buyNFT', buyEmailContent),
            ]);
            if(hostInfo && sellerInfo.id !== hostInfo.id){
                const hostEmailContent = { userName: hostInfo.displayName, seller, buyer, nft, price, currency, sellerInfo, buyerInfo }
                await sendServerEmail(hostInfo.email, 'notifyHostNFTSold', hostEmailContent)
            }
        }
     }catch (error) {
        console.log(`SendMailCloseOffer error:`, error)
     }
}