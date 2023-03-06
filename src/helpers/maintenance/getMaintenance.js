import { Maintenance } from "../../data/models";
import { cache } from '../cache';
import { MAINTENANCE_CACHE_KEY, SYSTEM } from "../../constants/system";
/**
 * @returns { { active: Boolean, startTime: Date, endTime: Date} }
 * @param {"web"|"marketplace"} system
 */
export const getMaintenance = async (system) => {
        try {
            const {
                STATUS,
                START_TIME,
                END_TIME
            } = system === SYSTEM.WEB ? MAINTENANCE_CACHE_KEY.WEB : MAINTENANCE_CACHE_KEY.MARKETPLACE;
            if(cache.has(STATUS)){
                return {
                    active: cache.get(STATUS),
                    startTime: cache.get(START_TIME),
                    endTime: cache.get(END_TIME)
                }
            }else{
                const maintenance = await Maintenance.findOne({
                    where: {
                        type: system
                    },
                    order: [["id", "DESC"]]
                });
                if(!maintenance){
                    // case haven't set maintenance
                    cache.set(STATUS, false);
                    cache.set(START_TIME, null);
                    cache.set(END_TIME, null);
                    return {
                        active: false,
                        startTime: null,
                        endTime: null,
                    }
                    
                }else{
                    cache.set(STATUS, maintenance.active);
                    cache.set(START_TIME, maintenance.startTime);
                    cache.set(END_TIME, maintenance.endTime);
                    return {
                        active: maintenance.active,
                        startTime: maintenance.startTime,
                        endTime: maintenance.endTime,
                    }
                }
            }
        } catch (error) {
            return {
                active: false,
                startTime: null,
                endTime: null,
            }
        }
}
