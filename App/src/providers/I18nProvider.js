import React from 'react';
import { useTranslation } from 'react-i18next';
import { useContext, useEffect } from 'react';
import { getData } from '../utils/asyncStore';
export const i18nContext = React.createContext();

function I18nProvider({ children }) {
    const { i18n, t } = useTranslation();



    useEffect(() => {
        const getLang = async () => {
            const language = await getData('lang');
            if (language) {
                i18n.changeLanguage(language);
            }
        }
        getLang();
    }, [])
    return <i18nContext.Provider value={{ i18n, t }}>{children}</i18nContext.Provider>;
}

export default I18nProvider;