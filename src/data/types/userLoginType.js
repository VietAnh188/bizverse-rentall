import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLInt as IntType,
  GraphQLBoolean as BooleanType
} from 'graphql';


import UserVerifiedInfoType from './UserVerifiedInfoType';
import UserType from './UserType';

import { UserVerifiedInfo, User, Listing, UserToken } from '../models';

const UserAccountLogin = new ObjectType({
  name: 'UserAccountLogin',
  fields: {
    token: {type: StringType},
    userId: { type: ID },
    profileId: { type: IntType },
    firstName: { type: StringType },
    lastName: { type: StringType },
    displayName: { type: StringType },
    gender: { type: StringType },
    dateOfBirth: { type: StringType },
    iosDOB:{
      type: StringType,
      async resolve(account) {
        var array = account.dateOfBirth.split("-");
        return array[0] + '-' + array[2] + '-' + array[1];
      }
    },
    email: { type: StringType },
    userBanStatus: { type: IntType },
    phoneNumber: { type: StringType },
    preferredLanguage: { type: StringType },
    preferredLanguageName: { type: StringType },
    preferredCurrency: { type: StringType },
    location: { type: StringType },
    info: { type: StringType },
    createdAt: { type: StringType },
    userDeletedAt: { type: StringType },
    status: { type: StringType },
    picture: { type: StringType },
    verification: {
      type: UserVerifiedInfoType,
      async resolve(userProfile) {
        return await UserVerifiedInfo.findOne({ where: { userId: userProfile.userId } });
      }
    },
    userData: {
      type: UserType,
      async resolve(userProfile) {
        return await User.findOne({ where: { id: userProfile.userId } });
      }
    },
    country: { type: IntType },
    verificationCode: { type: IntType },
    countryCode: { type: StringType },
    status: { type: IntType },
    errorMessage: { type: StringType },
    loginUserType: {
      type: StringType,
      async resolve(userProfile, { }, request) {
        let userId = (request && request.user) ? request.user.id : undefined;
        let count = await Listing.count({
          where: {
            userId
          },
        });
        return (count) ? 'Host' : 'Guest';
      }
    },
    isAddedList: {
      type: BooleanType,
      async resolve(userProfile, { }, request) {
        let userId = (request && request.user) ? request.user.id : undefined;
        let count = await Listing.count({
          where: {
            userId
          },
        });
        return (count) ? true : false;
      }
    },
    wallet: {
        type: StringType,
        async resolve (userProfile, {}, request) {
            return userProfile.wallet
        }
    }
  },
});


const UserLogin = new ObjectType({
  name: 'userLogin',
  fields: {
    result: {
      type: UserAccountLogin,
    },
    status: { type: IntType },
    errorMessage: { type: StringType }
  },
});
export default UserLogin;
