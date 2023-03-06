export const SYSTEM = {
    WEB: "web",
    APP: "app",
    MARKETPLACE: "marketplace"
}
export const MAINTENANCE_CACHE_KEY = {
    WEB: {
        STATUS: "mtn_status_web",
        START_TIME: "mtn_startTime_web",
        END_TIME: "mtn_endTime_web",
        CRONJOB: "mtn_cronjob_web"
    },
    MARKETPLACE: {
        STATUS: 'mtn_status_marketplace',
        START_TIME: 'mtn_startTime_marketplace',
        END_TIME: 'mtn_endTime_marketplace',
        CRONJOB: 'mtn_cronjob_marketplace'
    }
}