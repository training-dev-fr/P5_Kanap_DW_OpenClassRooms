export default class Config {
    /**
     * Charge le ficher de configuration
     * @returns {Config} la configuration de l'application
     */
    static async getConfig() {
        let config = await fetch("/front/js/config.json");
        return Object.assign(new Config(), await config.json());
    }

    /**
     * Génère le chemin du server à partir des informations de configuration
     * @returns {string} le chemin de base du server
     */
    getServerPath() {
        return `${(this.ssl)?"https://":"http://"}${this.host}:${this.port}/api/products`;
    }
}