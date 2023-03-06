import { getUserInfoByUniqueKey } from '../user/getUserInfoByUniqueKey';
import { sendServerEmail } from '../../core/email/sendServerEmail';
import { ZERO_WALLET } from '../../config'
export const sendMailTransfer = async ({ from, to, nft }) =>{
     try {
        // when from = zero wallet, nft minted
        if(from === ZERO_WALLET.toLowerCase()) return;
        const [fromInfo, toInfo, hostInfo] = await Promise.all([
            getUserInfoByUniqueKey({ wallet: from }),
            getUserInfoByUniqueKey({ wallet: to }),
            getUserInfoByUniqueKey({ userId: nft.hostId})
         ]);
         if(fromInfo && fromInfo.email){
            const transferNFTEmailContent = { fromInfo, toInfo, to, from, nft };
            await sendServerEmail(fromInfo.email, 'transferNFT', transferNFTEmailContent);
         }
         if(toInfo && toInfo.email){
            const receiveNFTEmailContent = { fromInfo, toInfo, from, to, nft }
            await sendServerEmail(toInfo.email, 'receiveNFT', receiveNFTEmailContent);
         }
         if(hostInfo){
            const hostEmailContent = { userName: hostInfo.displayName, from, to, nft, fromInfo, toInfo}
            await sendServerEmail(hostInfo.email, 'notifyHostNFTTransferred', hostEmailContent)
         }
     
     }catch (error) {
        console.log(`SendMailTransferred error:`, error)
     }
}