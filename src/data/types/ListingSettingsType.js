import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLList as List,
  GraphQLBoolean as BooleanType,
} from 'graphql';
import { ListSettingsTypes, MultiLanguage, ListSettings as ListSettingsModel } from "../models"
const ListSettings = new ObjectType({
  name: 'listingSettings',
  description: "Represents listing field values for the frontend",
  fields: {
    id: { type: IntType },
    typeId: { type: IntType },
    itemName: { 
      type: StringType,
      async resolve(listSetting, args, request){
        try {
          if(request && request.language != 'en-US'){
            const listingType = await ListSettingsTypes.findOne({
              where: {
                id: listSetting.typeId
              },
              attributes: ['typeName'],
              raw: true
            });
            if(listingType){
              const _translation = await MultiLanguage.findOne({
                where: {
                  type: listingType.typeName,
                  typeId: listSetting.id
                },
                raw: true
              });
              if(_translation) return _translation.translation;
              return listSetting.itemName;
            }
            return listSetting.itemName;
          }
          return listSetting.itemName;
        } catch (error) {
          listSetting.itemName;
        }
      }
    },
    itemDescription: { type: StringType },
    otherItemName: { type: StringType },
    maximum: { type: IntType },
    minimum: { type: IntType },
    startValue: { type: IntType },
    endValue: { type: IntType },
    isEnable: { type: StringType },
    image: { type: StringType },
  }
});

const ListSettingsType = new ObjectType({
  name: 'listingSettingsTypes',
  description: "Represents listing field types for the frontend",
  fields: {
    id: { type: IntType },
    typeName: { type: StringType },
    typeLabel: { 
      type: StringType,
      async resolve(listSetting, arg, request){
        try{
          if(request && request.language != 'en-US'){
            const _translation = await MultiLanguage.findOne({
              where: {
                type: 'listSetting',
                typeId: listSetting.id
              }
            });
            if(_translation) return _translation.translation;
            return listSetting.typeLabel  
          }
          return listSetting.typeLabel;
        }catch(error){
          return listSetting.typeLabel;
        }
      }
    },
    step: { type: StringType },
    fieldType: { type: StringType },
    isMultiValue: { type: BooleanType },
    isEnable: { type: StringType },
    status: { type: StringType },
    listSettings: {
      type: new List(ListSettings),
      async resolve(listSetting){
        return await listSetting.getListSettings()
      } 
    },
  },
});

export default ListSettingsType;
