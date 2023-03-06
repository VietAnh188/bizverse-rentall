import { MultiLanguageCommonType } from '../../../types/siteadmin/MultiLanguageType';
import { MultiLanguage } from '../../../models';
import {
    GraphQLInt as IntType,
    GraphQLString as StringType,
    GraphQLBoolean as BooleanType,
    GraphQLID as ID,
    GraphQLNonNull as NonNull,
} from 'graphql';
import getLocaleMessage from '../../../../helpers/message/getLocaleMessage';

const createMultiLanguage = {
    type: MultiLanguageCommonType,
    args: {
        id: { type: new NonNull(IntType) },
        type: { type: new NonNull(StringType) },
        language: { type: new NonNull(StringType) },
        translation: { type: new NonNull(StringType) },
    },
    async resolve({ request }, {
        id,
        type,
        language,
        translation
    }) {

        try {
            if (request.user && !request.user.admin || !request.user) {
                return {
                    status: 400,
                    errorMessage: await getLocaleMessage({ locale: request.language, messageId: "error.noPermission"})
                }
            }
            const _translation = await MultiLanguage.findOne({
                where: {
                    typeId: id,
                    type,
                    language
                },
                raw: true
            });
            if(_translation){
                return {
                    status: 400,
                    errorMessage: await getLocaleMessage({ locale: request.language, messageId: "error.recordExist"})
                }
            }
            const translation = await MultiLanguage.create({
                typeId: id,
                type,
                language,
                translation
            });
            return {
                status: 200,
                errorMessage: null,
                results: translation
            }
        } catch (error) {
            return {
                status: 500,
                errorMessage: await getLocaleMessage({ locale: request.language, messageId: "error.something"}) + error.messge,
            }
        }
    },
};
export default createMultiLanguage;
