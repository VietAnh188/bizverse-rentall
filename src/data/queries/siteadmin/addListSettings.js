import ListSettingsType from '../../types/siteadmin/AdminListSettingsType';
import { ListSettings, MultiLanguage, ListSettingsTypes } from '../../../data/models';

import {
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLList as List, 
  GraphQLInputObjectType as InputType
} from 'graphql';
const translationInputType = new InputType({
  name: "translationInputType",
  fields: {
    language: {
      type: StringType
    },
    translation: {
      type: StringType
    }
  }
})
const addListSettings = {

  type: ListSettingsType,

  args: {
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

    if (request.user && request.user.admin == true) {

      const insertListSettings = await ListSettings.create({
        typeId,
        itemName,
        itemDescription,
        otherItemName,
        maximum,
        minimum,
        startValue,
        endValue,
        isEnable,
        image
      });
      // get typeName for listSetting
      const listSettingType = await ListSettingsTypes.findOne({
        where: {
          id: typeId
        }
      });
      if(translations && translations.length > 0){
        await Promise.all(translations.map(async translation => {
          return await MultiLanguage.create({
              type: listSettingType.typeName,
              typeId: insertListSettings.id,
              language: translation.language,
              translation: translation.translation
            })
        }))
      }
      return {
        status: 'success'
      }
    } else {
      return {
        status: 'failed'
      }
    }
  },
};

export default addListSettings;
