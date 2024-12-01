import { useGetTranslation } from "./useGetTranslation";
export default {
    install(app) {
        const { translate } = useGetTranslation();
        app.config.globalProperties.$translate = translate;
        app.provide("translate", translate);
    }
};
