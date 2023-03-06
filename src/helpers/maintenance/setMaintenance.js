import { Maintenance } from "../../data/models";
import { cache } from '../cache';
import { MAINTENANCE_CACHE_KEY, SYSTEM } from "../../constants/system";

/**
 * @param { { active?: string, startTime?: string, endTime?: string} } object
 * @param {"web"|"marketplace"} system
 */
export const setMaintenance = (system, { active, startTime, endTime, stopCronJob }) => {
    const { STATUS, START_TIME, END_TIME, CRONJOB } = system === SYSTEM.WEB ? MAINTENANCE_CACHE_KEY.WEB : MAINTENANCE_CACHE_KEY.MARKETPLACE;
    if(active !==undefined) cache.set(STATUS, active);
    if(startTime != undefined) cache.set(START_TIME, startTime);
    if(endTime != undefined) cache.set(END_TIME, endTime);
    if(stopCronJob) cache.set(CRONJOB, false)
};
