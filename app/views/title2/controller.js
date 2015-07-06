define([
    'app',
    'config'
], function (app, config) {
    /*
        项目控制器
    */
    app.registerController('metaDataController', ['$scope', '$modal', 'metaDataService', '$http', function ($scope, $modal, metaDataService, $http) {

        /*
                
            分组操作

        */

        //分组列表
        $scope.groups = [];
        metaDataService.group.query().success(function (result) {
            $scope.groups = result;
        });
        //默认当前分组
        $scope.currentGroup = {};
        //当前被编辑分组编号
        $scope.currentGroupIndex = null;
        //保存分组
        $scope.saveGroup = function (state) {
            if (state) {
                if ($scope.currentGroupIndex == null) {
                    metaDataService.group.insert($scope.currentGroup).success(function (result) {
                        $scope.groups.push(result);
                        $scope.isAddGroup = false;
                        //重置新分组
                        $scope.currentGroup = {};
                    });
                } else {
                    metaDataService.group.update($scope.currentGroup).success(function (result) {
                        $scope.isAddGroup = false;
                        //重置新分组
                        $scope.currentGroup = {};
                        $scope.currentGroupIndex = null;
                    });
                }
            } else {}
        };
        //编辑分组
        $scope.editGroup = function (index, group) {
            $scope.currentGroup = group;
            $scope.currentGroupIndex = index;
            $scope.isAddGroup = true;
        };
        //删除分组
        $scope.delGroups = {
            id: [],
            delmetadataids: []
        };
        $scope.removeGroup = function (index, group) {
            var data = {
                id: [group.id]
            };
            metaDataService.group.delete(data).success(function (result) {
                if (result.status == 1) {
                    $scope.groups.splice(index, 1);
                }
            });
        };
        //
        $scope.cancelGroup = function () {
            $scope.isAddGroup = false;
            $scope.currentGroup = {};
            $scope.currentGroupIndex = null;
        };

        /*
                    
            项目操作

        */
        //默认新项目
        $scope.currentMetaData = {};
        //当前被编辑项目编号
        $scope.currentMetaDataIndex = null;
        //根据分组查询项目
        $scope.searchMetaByGroupId = function (scope, group) {
            scope.toggle();
            if (!group.child) {
                metaDataService.metadata.query({
                    'groupid': group.id
                }).success(function (result) {
                    angular.forEach($scope.groups, function (g) {
                        if (g.id == group.id) {
                            g.child = result;
                        }
                    });
                });
            }
        };
        //保存项目
        $scope.saveMetaData = function (state) {
            if (state) {
                if ($scope.currentMetaDataIndex == null) {
                    metaDataService.metadata.insert($scope.currentMetaData).success(function (result) {
                        angular.forEach($scope.groups, function (g) {
                            if (g.id == result.groupid) {
                                if (g.child) {
                                    g.child.push(result);
                                }
                            }
                        });
                        //重置项目
                        $scope.currentMetaData = {};
                        $scope.isAddMetaData = false;
                    });
                } else {
                    metaDataService.metadata.update($scope.currentMetaData).success(function (result) {
                        $scope.isAddMetaData = false;
                        //重置新分组
                        $scope.currentMetaData = {};
                        $scope.currentMetaDataIndex = null;
                    });
                }
            }
        };
        //删除项目
        $scope.removeMetaData = function (index, meta) {
            var data = {
                id: [meta.id]
            };
            metaDataService.metadata.delete(data).success(function (result) {
                if (result.status == 1) {
                    angular.forEach($scope.groups, function (g) {
                        if (g.id == meta.groupid) {
                            g.child.splice(index, 1);
                        }
                    });
                }
            });
        };
        //编辑项目
        $scope.editMetaData = function (index, meta) {
            $scope.currentMetaData = meta;
            $scope.currentMetaDataIndex = index;
            $scope.isAddMetaData = true;
        };
        //
        $scope.cancelMetaData = function () {
            $scope.isAddMetaData = false;
            $scope.currentMetaData = {};
            $scope.currentMetaDataIndex = null;
        };

        /*
        
            项目详情操作
        
        */
        $scope.fieldModalData = {};
        $scope.fields = [];
        //根据项目id查询对应详情内容
        $scope.queryFieldByMetaId = function (meta) {
            $scope.fieldModalData.currentMetaId = meta.id;
            metaDataService.field.query({
                'id': $scope.currentMetaId
            }).success(function (result) {
                $scope.fields = result.data;
            });
        };
        //默认新详情
        $scope.newField = function (size) {
            var fieldModalInstance = $modal.open({
                templateUrl: 'views/title2/fieldModal.html',
                controller: 'fieldModalCtrl',
                size: size,
                resolve: {
                    fieldModalData: function () {
                        return $scope.fieldModalData;
                    }
                }
            });

            fieldModalInstance.result.then(function (field) {
                if (field) {
                    $scope.fields.push(field);
                }
            }, function () {
                console.info('newInfoModal dismissed at: ' + new Date());
            });
        };

        //编辑详情
        $scope.editField = function (index, field, size) {
            $scope.fieldModalData.currentFieldIndex = index;
            $scope.fieldModalData.currentField = field;
            $scope.newField(size);
        };

    }]);
    /*
        
        创建弹窗控制器
        
    */
    app.registerController('fieldModalCtrl', ['$scope', '$modalInstance', 'metaDataService', 'fieldModalData', function ($scope, $modalInstance, metaDataService, fieldModalData) {

        $scope.currentField = fieldModalData.currentField;
        $scope.metaId = fieldModalData.currentMetaId;
        $scope.currentFieldIndex = fieldModalData.currentFieldIndex;

        $scope.saveField = function (state) {
            var data = {
                metadataid: $scope.metaId,
                fields: [$scope.currentField]
            };

            if (state) {
                if ($scope.currentFieldIndex == undefined) {
                    metaDataService.field.insert(data).success(function (result) {
                        $modalInstance.close(result);
                        delete fieldModalData.currentFieldIndex;
                        delete fieldModalData.currentField;
                    });
                } else {
                    metaDataService.field.update(data).success(function (result) {
                        $modalInstance.close();
                        delete fieldModalData.currentFieldIndex;
                        delete fieldModalData.currentField;
                    });
                }
            } else {}
        };

        $scope.cancelField = function () {
            delete fieldModalData.currentFieldIndex;
            delete fieldModalData.currentField;
            $modalInstance.dismiss('cancel');
        };

    }]);

});