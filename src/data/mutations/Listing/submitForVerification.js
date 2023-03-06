// Graphql
import {
  GraphQLInt as IntType,
  GraphQLString as StringType
} from 'graphql';

// Sequelize models
import {
  Listing,
  ListingPermissionHistory,
  UserProfile
} from '../../models';

// GraphQL Type
import EditListingType from '../../types/EditListingType';
import { adminEmail } from '../../../config';
import { sendEmail } from '../../../core/email/sendEmail';
import checkUserAuthentication from '../../../core/auth/checkUserAuthentication';

const submitForVerification = {

  type: EditListingType,

  args: {
    id: { type: IntType },
    listApprovalStatus: { type: StringType },
  },

  async resolve({ request }, {
    id,
    listApprovalStatus,
  }) {
    try {
    
        // authentication request && check userBanStatus
        const { status: userStatus, errorMessage: userErrorMessage } = await checkUserAuthentication(request)

        if (userStatus !== 200) {
            return {
                status: userStatus,
                errorMessage: userErrorMessage
            }
        }

        const listStatus = listApprovalStatus.toString().trim().toLowerCase();

        if (listStatus === "submit" || listStatus === "cancelsubmit") {
            let userId = request.user.id;
            let where = {
                id
            }

            await Listing.update({
                listApprovalStatus: listStatus === "cancelsubmit" ? null : 'submit',
                isReady: true
            },
            {
                where
            })

            const targetListing = await Listing.findOne({
                where,
                raw: true
            })

            if (!targetListing) {
                return {
                    status: 400,
                    errorMessage: "Listing is not found"
                }
            }

            if (listStatus === 'submit') {
                const listDetails = await Listing.findOne({
                    attributes: ['title'],
                    where: {
                        id
                    },
                    raw: true
                });

                const userDetails = await UserProfile.findOne({
                    attributes: ['firstName'],
                    where: {
                        userId
                    },
                    raw: true
                });

                let content = {
                    listId: id,
                    listTitle: listDetails && listDetails.title,
                    hostName: userDetails && userDetails.firstName,
                }

                ListingPermissionHistory.create({
                    listId: id,
                    userId,
                    status: 'submitForverification'
                });

                sendEmail(adminEmail, 'listPublishRequest', content);
            }

            return {
                status: 200,
                results: targetListing
            }
        } else {
            return {
                status: 400,
                errorMessage: "listApprovalStatus is invalid"
            }
        }
    } catch (error) {
        return {
            errorMessage: `Something error ${error.message}`,
            status: 400
        }
    }
  },
};

export default submitForVerification;