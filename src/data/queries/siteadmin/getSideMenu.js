import SideMenuType from '../../types/siteadmin/SideMenuType';
import { SideMenu, MultiLanguage } from '../../../data/models';
import {
    GraphQLList as List,
    GraphQLString as StringType,
} from 'graphql';

const getSideMenu = {

    type: new List(SideMenuType),

    args: {
        name: { type: StringType },
    },

    async resolve({ request }, { name }) {

        let staticBlockData = name ? await SideMenu.findAll({
            where: {
                name
            },
            attributes: [
                'id',
                'title',
                'description',
                'name',
                'step',
                'page',
                'isEnable'
            ],
            raw: true
        }) : await SideMenu.findAll({
            attributes: [
                'id',
                'title',
                'description',
                'name',
                'step',
                'page',
                'isEnable'
            ],
            raw: true
        });
        if(request && request.language !== 'en-US'){
            staticBlockData = staticBlockData.map(async data => {
                const [title, description] = await Promise.all([
                    MultiLanguage.findOne({
                        where: {
                            type: 'sideMenu.title',
                            typeId: data.id
                        },
                        raw: true
                    }),
                    MultiLanguage.findOne({
                        where: {
                            type: 'sideMenu.description',
                            typeId: data.id
                        },
                        raw: true
                    }),
                ]);
                if(title && description){
                    data.title = title.translation;
                    data.description = description.translation;
                    return data;
                }
                return data;
            })
        }

        return staticBlockData;

    },
};

export default getSideMenu;
