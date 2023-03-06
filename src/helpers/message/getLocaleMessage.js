const vi_error = require("../../messages/vi_error.json");
const en_error = require("../../messages/en-US_error.json");
const vi_message = require("../../messages/vi.json");
const en_message = require("../../messages/en-US.json");

function ClosureLocales () {
    const _vi_error = new Map();
    const _vi_message = new Map();
    const _en_error = new Map();
    const _en_message = new Map();
    //other language
    
    //initial
    vi_error.forEach(({id, message})=> _vi_error.set(id, message));
    vi_message.forEach(({id, message})=> _vi_message.set(id, message))
    en_error.forEach(({id, message})=> _en_error.set(id, message));
    en_message.forEach(({id, message})=> _en_message.set(id, message));

    return {
        /**
         * 
         * @param {string} id 
         * @param {string} language 
         * @returns 
         */
        getLocalesError(id, language){
            try {
                if(language ==='vi') return _vi_error.get(id) || "";
                if(language ==='en-US') return _en_error.get(id) || "";
                // other language
            } catch (error) {
                return "";
            }
        },

         /**
         * 
         * @param {string} id 
         * @param {string} language 
         * @returns 
         */
        getLocalesMessage(id, language){
            try {
                if(language ==='vi') return _vi_message.get(id) || "";
                if(language ==='en-US') return _en_message.get(id) || "";
                // other language
            } catch (error) {
                return "";
            }
        }
    }
}
const makeLocales = ClosureLocales();

export const getLocalesError = makeLocales.getLocalesError;
export const getLocalesMessage = makeLocales.getLocalesMessage;

const getLocaleMessage = async ({ locale, messageId, isError = true }) => {
    const getMessage = isError ? getLocalesError : getLocaleMessage

    return getMessage(messageId, locale)
}

export default getLocaleMessage;
