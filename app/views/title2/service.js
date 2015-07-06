define([
    'app',
    'config'
], function (app, config) {
    /*
        服务
    */
    app.registerFactory('metaDataService', ['$http', '$q', function ($http, $q) {
        var service = {};

        /*分组操作*/
        service.group = {
            insert: function (params) {
                return $http.post(config.service_ip + '/group/insert', params);
            },
            update: function (params) {
                return $http.post(config.service_ip + '/group/update', params);
            },
            delete: function (params) {
                return $http.post(config.service_ip + '/group/delete', params);
            },
            query: function (params) {
                return $http.get(config.service_ip + '/group/select', {
                    params: params || {}
                });
            }
        };
        /*项目操作*/
        service.metadata = {
            insert: function (params) {
                return $http.post(config.service_ip + '/metadata/insert', params);
            },
            update: function (params) {
                return $http.post(config.service_ip + '/metadata/update', params);
            },
            delete: function (params) {
                return $http.post(config.service_ip + '/metadata/delete', params);
            },
            query: function (params) {
                return $http.get(config.service_ip + '/metadata/select', {
                    params: params || {}
                });
            }
        };
        /*项目详情操作*/
        service.field = {
            insert: function (params) {
                return $http.post(config.service_ip + '/datafield/insert', params);
            },
            update: function (params) {
                return $http.post(config.service_ip + '/datafield/update', params);
            },
            delete: function (params) {
                return $http.post(config.service_ip + '/datafield/delete', params);
            },
            query: function (params) {
                return $http.get(config.service_ip + '/datafield/select', {
                    params: params || {}
                });
            }
        };

        return service;
    }]);

});