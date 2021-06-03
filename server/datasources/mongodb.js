const { RESTDataSource } = require('apollo-datasource-rest');

class mongodb extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://api.spacexdata.com/v2/';
    }
}

module.exports = LaunchAPI;