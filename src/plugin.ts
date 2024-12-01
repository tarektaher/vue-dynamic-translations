import { App } from "vue";
import { useGetTranslation } from "./useGetTranslation";

export default {
    install(app: App) {
        const { translate } = useGetTranslation();
        app.config.globalProperties.$translate = translate;
        app.provide("translate", translate);
    }
};
