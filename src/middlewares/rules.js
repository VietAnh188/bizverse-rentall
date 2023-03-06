import { getMaintenance } from "../helpers/maintenance/getMaintenance";
import { SYSTEM } from '../constants/system';
export const isMaintenanceWeb = async () => {
        try {
            const { active } = await getMaintenance(SYSTEM.WEB);
            return active
        } catch (error) {
            return true
        }
}
export const isMaintenanceMarketplace = async () => {
        try {
            const { active } = await getMaintenance(SYSTEM.MARKETPLACE);
            return active;
        } catch (error) {
            return true
        }
}
export const allow = async () => false;