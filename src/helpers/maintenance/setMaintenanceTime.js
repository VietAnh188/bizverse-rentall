const CronJob = require('cron').CronJob;
const { setMaintenance } = require('./setMaintenance');
import { Maintenance } from "../../data/models";
import { MAINTENANCE_CACHE_KEY, SYSTEM } from "../../constants/system";
import { cache } from '../cache';
  
const setStartTime  = (time, system) => {
    const job = new CronJob(new Date(time), 
    async function() {
        // check if cronjon can running, case admin stop maintenance before cronjob start
        const { CRONJOB } = system === SYSTEM.WEB ? MAINTENANCE_CACHE_KEY.WEB : MAINTENANCE_CACHE_KEY.MARKETPLACE;
        if(!cache.get(CRONJOB)) return;
        const maintenance = await Maintenance.findOne({
            where: {
                type: system
            },
            order: [["id", "DESC"]]
        });
        if(maintenance && maintenance.active == false){
            maintenance.active = true;
            await maintenance.save();
            setMaintenance(system, { active: true })
        }
        job.stop();
    },
    null,
    false,
    'UTC'
    ); 
    job.start();
}
const setEndTime = (time, system) => {
    const job = new CronJob(new Date(time),
    async function() {
         // check if cronjon can running, case admin stop maintenance before cronjob start
         const { CRONJOB } = system === SYSTEM.WEB ? MAINTENANCE_CACHE_KEY.WEB : MAINTENANCE_CACHE_KEY.MARKETPLACE;
         if(!cache.get(CRONJOB)) return;
        const maintenance = await Maintenance.findOne({
            where: {
                type: system
            },
            order: [["id", "DESC"]]
        });
        if(maintenance){
            maintenance.active = false;
            await maintenance.save();
        }
        setMaintenance(system, { active: false })
        job.stop();
    },
    null,
    false,
    'UTC'
    );  
    job.start();
}
/**
 * @param { "web"|"marketplace" } system
 * @param { "start"|"end"|"both"|"instance" } type 
 * @param { Array } times 
 */
export const setMaintenanceTime = (system, type=null, times=[]) =>{
    const { CRONJOB } = system === SYSTEM.WEB ? MAINTENANCE_CACHE_KEY.WEB : MAINTENANCE_CACHE_KEY.MARKETPLACE;
    // set cronjob can running
    cache.set(CRONJOB, true)
    if(type === "instance") {
        setMaintenance(system, { active: true, startTime: new Date(), endTime: null })
    }
    if(type === "start" ){
        setMaintenance(system, { startTime: times[0], endTime: null })
        setStartTime(times[0], system);
    }
    if(type === "end" ) {
        setMaintenance(system, { active: true, startTime: new Date(), endTime: times[0]});
        setEndTime(times[0], system);
    }
    if(type === "both") {
        setMaintenance(system, { startTime: times[0], endTime: times[1] });
        setStartTime(times[0], system);
        setEndTime(times[1], system);
    }
}