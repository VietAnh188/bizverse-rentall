export const getOrderAndById = (items = [], mainProperty = 'id') => {
    const byId = {};
    const order = items.map(item => {
        byId[item[mainProperty]] = item

        return item[mainProperty]
    })
    return {
        order,
        byId
    }
}