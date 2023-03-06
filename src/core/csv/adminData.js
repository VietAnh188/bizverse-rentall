import {
    User,
    UserProfile,
    Listing,
    Reservation
} from '../../data/models';
import sequelize from '../../data/sequelize';
import moment from 'moment';

function getQuery(column, separator) {
    return sequelize.literal(`IF(${column} IS NULL OR ${column}="", "", CONCAT(${column},${separator}))`)
}

export async function users(keyword, userType) {
    let userTypeFilter = {}, keywordFilter = {};

    if (userType === '1') {
        userTypeFilter = {
            id: {
                $notIn: [sequelize.literal(`SELECT DISTINCT userId FROM Listing`)]
            }
        }
    } else if (userType === '2') {
        userTypeFilter = {
            id: {
                $in: [sequelize.literal(`SELECT DISTINCT userId FROM Listing`)]
            }
        }
    }

    if (keyword && keyword.length > 0 && keyword.toString().trim() != '') {
        let getDate = moment(keyword).format('YYYY-MM-DD');

        keywordFilter = {
            id: {
                $or: [{
                    $in: [sequelize.literal(`SELECT userId FROM UserProfile WHERE firstName like '%${keyword}%'`)]
                }, {
                    $in: [sequelize.literal(`SELECT userId FROM UserProfile WHERE lastName like '%${keyword}%'`)]
                }, {
                    $in: [sequelize.literal(`SELECT userId FROM UserProfile WHERE phoneNumber like '%${keyword}%'`)]
                }, {
                    $in: [sequelize.literal(`SELECT userId FROM UserProfile WHERE createdAt like '%${getDate}%'`)]
                }, {
                    $in: [sequelize.literal(`SELECT id FROM User WHERE email like '%${keyword}%'`)]
                }]
            }
        }
    }


    const dataItems = await User.findAll({
        attributes: [
            [sequelize.col('profile.profileId'), 'Profile ID'],
            [sequelize.col('profile.firstName'), 'First Name'],
            [sequelize.col('profile.lastName'), 'Last Name'],
            ['email', 'Email Address'],
            [sequelize.col('profile.phoneNumber'), 'Phone Number'],
            [sequelize.col('profile.createdAt'), 'Created Date'],
            [
                sequelize.literal(`
                    CASE WHEN userBanStatus=true
                        THEN 'Ban'
                    ELSE 
                        'UnBan'
                    END
                `),
                'Action']
        ],
        where: {
            $and: [
                { userDeletedAt: null },
                userTypeFilter,
                keywordFilter
            ]
        },
        include: [{
            model: UserProfile,
            as: 'profile',
            attributes: []
        }],
        raw: true,
        order: [['createdAt', 'ASC']]
    });

    return dataItems;
}

export async function reservations(search) {
    try {
        let isRefunded = `SELECT id FROM Transaction WHERE reservationId=Reservation.id AND paymentType='cancellation'`,
            refundAmount = `SELECT refundToGuest FROM CancellationDetails WHERE reservationId=Reservation.id`,
            isPaidOut = `SELECT id FROM TransactionHistory WHERE reservationId=Reservation.id`,
            payoutAmount = `SELECT payoutToHost FROM CancellationDetails WHERE reservationId=Reservation.id`;

        let paymentStateFilter = { paymentState: 'completed' }, searchFilter = {};

        if (search) {
            searchFilter = {
                $or: [
                    { confirmationCode: { $like: '%' + search + '%' } },
                    { reservationState: { $like: '%' + search + '%' } },
                    { id: { $like: '%' + search + '%' } },
                    { listId: { $in: [sequelize.literal(`SELECT id FROM Listing WHERE title like '%${search}%'`)] } }
                ]
            };
        }

        const result = await Reservation.findAll({
            attributes: [
                ['id', 'Reservation ID'],
                ['confirmationCode', 'Code'],
                ['reservationState', 'Status'],
                [sequelize.literal(`(SELECT title FROM Listing WHERE id=Reservation.listId)`), 'List Title'],
                [
                    sequelize.literal(`
                        CASE WHEN reservationState='expired' OR reservationState='declined'
                            THEN IF((${isRefunded}) IS NULL,'Proceed Refund','Completed')
                        ELSE 
                            CASE WHEN reservationState='cancelled'
                                THEN IF((${isRefunded}) IS NULL, (IF((${refundAmount}) > 0,'Proceed Refund','Not Eligible')),'Completed')
                            ELSE
                                'Not Eligible'
                            END
                        END
                    `),
                    'Refund to Guest'
                ],
                ['currency', 'Currency'],
                [sequelize.literal(`total+guestServiceFee`), 'Sub Total'],
                [
                    sequelize.literal(`
                        CASE WHEN (
                            SELECT 
                                id 
                            FROM 
                                Payout AS P 
                            WHERE 
                                userId=Reservation.hostId 
                            AND 
                                (
                                    (P.default=true AND Reservation.payoutId IS NULL) 
                                    OR 
                                    (id=Reservation.payoutId AND id=Reservation.payoutId AND Reservation.payoutId IS NOT NULL)
                                )
                        ) is NULL
                            THEN "No Payout method"
                        ELSE 
                            CASE WHEN reservationState='expired' OR reservationState='declined'
                                THEN "Closed"
                            ELSE
                                CASE WHEN reservationState='cancelled'
                                    THEN IF((${isPaidOut}) IS NULL, (IF((${payoutAmount}) > 0,'Ready To Pay','Closed')),'Completed')
                                ELSE
                                    IF((${isPaidOut}) IS NULL, IF((DATEDIFF(Reservation.checkIn, NOW()) + 1) < 0,'Ready To Pay','Pending'), 'Completed')
                                END
                            END
                        END
                    `),
                    'Payout'
                ],
            ],
            where: {
                $and: [
                    paymentStateFilter,
                    searchFilter
                ]
            },
            order: [['createdAt', 'DESC']],
            raw: true,
        });

        return result;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function listings(search) {
    try {
        let searchFilter = {};
        if (search) {
            let getDate = moment(search).format('YYYY-MM-DD');
            searchFilter = {
                $or: [
                    { title: { $like: '%' + search + '%' } },
                    { city: { $like: '%' + search + '%' } },
                    { state: { $like: '%' + search + '%' } },
                    { country: { $like: '%' + search + '%' } },
                    { street: { $like: '%' + search + '%' } },
                    { buildingName: { $like: '%' + search + '%' } },
                    { createdAt: { $in: [sequelize.literal(`SELECT createdAt FROM Listing WHERE createdAt like '%${getDate}%'`)] } },
                    {
                        userId: {
                            $in: [
                                sequelize.literal(`
                                    SELECT 
                                        id 
                                    FROM 
                                        User AS user LEFT OUTER JOIN UserProfile AS profile 
                                    ON 
                                        user.id=profile.userId 
                                    WHERE 
                                        profile.firstName like '%${search}%' 
                                    OR 
                                        user.email like '%${search}%'
                                `)
                            ]
                        }
                    }
                ]
            }
        }
        const result = await Listing.findAll({
            attributes: [
                ['id', 'ID'],
                ['title', 'Title'],
                [
                    sequelize.literal(`(SELECT firstName FROM UserProfile WHERE userId=Listing.userId)`),
                    'Host Name'
                ],
                [
                    sequelize.literal(`(SELECT email FROM User WHERE id=Listing.userId)`),
                    'Host Email'
                ],
                [
                    sequelize.fn(
                        "concat",
                        getQuery('street', '", "'),
                        getQuery('buildingName', '", "'),
                        getQuery('city', '", "'),
                        getQuery('state', '", "'),
                        getQuery('country', '", "'),
                        getQuery('zipcode', '""')
                    ),
                    'Address'
                ],
                ['city', 'City'],
                ['state', 'State'],
                ['country', 'Country'],
                ['createdAt', 'Created Date'],
                [
                    sequelize.literal(`
                        CASE WHEN (select id FROM Recommend where listId=Listing.id limit 1) IS NULL
                            THEN 'No'
                        ELSE 
                            'Yes'
                        END
                    `),
                    'Recommend'
                ],
                [
                    sequelize.literal(`
                        CASE WHEN isPublished=true 
                            THEN 'Yes'
                        ELSE 
                            'No'
                        END
                    `),
                    'Published'
                ],
                [
                    sequelize.literal(`
                        CASE WHEN isReady=true 
                            THEN 'Yes'
                        ELSE 
                            'No'
                        END
                    `),
                    'Ready'
                ]
            ],
            where: { $and: [searchFilter] },
            order: [['id', 'ASC']],
            raw: true,
        });

        return result;
    } catch (error) {
        console.error(error);
        return [];
    }
}