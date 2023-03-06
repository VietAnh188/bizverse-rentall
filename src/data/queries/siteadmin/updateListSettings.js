import ListSettingsType from '../../types/siteadmin/AdminListSettingsType';
import { ListSettings, ListSettingsTypes, MultiLanguage } from '../../../data/models';

import {
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLList as List, 
  GraphQLInputObjectType as InputType
} from 'graphql';
const translationInputType = new InputType({
  name: "updateTranslationInputType",
  fields: {
    language: {
      type: StringType
    },
    translation: {
      type: StringType
    }
  }
})

import checkListSettingsActivity from '../../../helpers/checkListSettingsActivity';

const updateListSettings = {

  type: ListSettingsType,

  args: {
    id: { type: IntType },
    typeId: { type: IntType },
    itemName: { type: StringType },
    itemDescription: { type: StringType },
    otherItemName: { type: StringType },
    maximum: { type: IntType },
    minimum: { type: IntType },
    startValue: { type: IntType },
    endValue: { type: IntType },
    isEnable: { type: StringType },
    image: { type: StringType },
    translations: {
      type: new List(translationInputType)
    }
  },

  async resolve({ request }, {
    id,
    typeId,
    itemName,
    itemDescription,
    otherItemName,
    maximum,
    minimum,
    startValue,
    endValue,
    isEnable,
    image,
    translations
  }) {
    try {
      if (request.user && request.user.admin == true) {
        let isListSettingsUpdated = false;

        if (Number(isEnable) === 0) { 
          const status = await checkListSettingsActivity(typeId, id);
          if (status) {
            return {
              status
            };
          }
        }

        const modifyListSettings = await ListSettings.update(
          {
            itemName,
            itemDescription,
            otherItemName,
            maximum,
            minimum,
            startValue,
            endValue,
            isEnable,
            image
          },
          {
            where: {
              id,
              typeId
            }
          }
        )
          .then(function (instance) {
            // Check if any rows are affected
            if (instance > 0) {
              isListSettingsUpdated = true;
            }
          });
        
        // update translation
        if(translations && translations.length > 0){
          const listSettingType = await ListSettingsTypes.findOne({
            where: {
              id: typeId
            }
          });
          const updatedResults = await Promise.all(translations.map(async translation => {
            return await MultiLanguage.update({
              translation: translation.translation
            },
            {
              where: {
                type: listSettingType.typeName,
                typeId: id,
                language: translation.language
              }
            })
          }));

          // set listSettingUpdate status
          for(const result of updatedResults){
            if(result) isListSettingsUpdated = true;
            else{
              isListSettingsUpdated = false;
              break;
            }
          }
        }

        
        if (isListSettingsUpdated) {
          return {
            status: 'success'
          }
        } else {
          return {
            status: 'failed'
          }
        }
        } else {
          return {
            status: 'failed'
          }
        }
    }catch(error){
      return {
        status: 'failed'
      }
    }
  },
};

export default updateListSettings;
