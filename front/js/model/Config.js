export default class Config {
    /**
     * Charge le ficher de configuration
     * @returns {Config} la configuration de l'application
     */
    static async getConfig() {
        let config = await fetch("/P5-Kanap/js/config.json");
        return Object.assign(new Config(), await config.json());
    }

    /**
     * Génère le chemin du server à partir des informations de configuration
     * @returns {string} le chemin de base du server
     */
    getServerPath() {
        let path = "http";
        if (this.ssl) {
            path += "s";
        }
        path += "://" + this.host;
        if (this.port) {
            path += ":" + this.port;
        }
        path += "/api/products";
        return path;
    }
}