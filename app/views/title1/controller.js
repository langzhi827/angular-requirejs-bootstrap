define([
    'app',
    'config'
], function (app, config) {
    /*
        控制器
    */
    app.registerController('setDataController', ['$scope', '$modal', '$http', '$filter', function ($scope, $modal, $http, $filter) {

        /*
            分组操作
        */
        //分组列表
        $scope.groups = [{
            id: "2",
            name: "分组一"
        }, {
            id: "3",
            name: "分组二"
        }, {
            id: "4",
            name: "分组三"
        }];
        //默认当前分组
        $scope.currentGroup = {};
        //当前被编辑分组编号
        $scope.currentGroupIndex = null;
        //保存分组
        $scope.saveGroup = function (state) {
            if (state) {
                if ($scope.currentGroupIndex == null) {
                    $scope.groups.push($scope.currentGroup);
                    $scope.isAddGroup = false;
                    $scope.currentGroup = {};
                } else {
                    $scope.isAddGroup = false;
                    $scope.currentGroup = {};
                    $scope.currentGroupIndex = null;
                }
            } else {
                //$scope.groupFormState.name = true;
            }
        };
        //编辑分组
        $scope.editGroup = function (index, group) {
            $scope.currentGroup = group;
            $scope.currentGroupIndex = index;
            $scope.isAddGroup = true;
        };
        //删除分组
        $scope.removeGroup = function (index, group) {
            $scope.groups.splice(index, 1);
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

        //根据分组查询项目
        $scope.searchSetByGroupId = function (scope, group) {
            scope.toggle();
            if (!group.child) {
                group.child = [{
                    id: "",
                    name: "项目1"
                }, {
                    id: "",
                    name: "项目2"
                }];
            }
        };

        //默认项目
        $scope.currentSetData = {};
        //当前被编辑项目编号
        $scope.currentSetDataIndex = null;

        //保存项目
        $scope.saveSetData = function (state) {
            if (state) {
                if ($scope.currentSetDataIndex == null) {
                    angular.forEach($scope.groups, function (g) {
                        if (g.id == $scope.currentSetData.groupid) {
                            if (g.child) {
                                g.child.push($scope.currentSetData);
                            }
                        }
                    });
                    //重置数据集
                    $scope.currentSetData = {};
                    $scope.isAddSetData = false;
                } else {
                    $scope.isAddSetData = false;
                    $scope.currentSetData = {};
                    $scope.currentSetDataIndex = null;

                }
            }
        };
        //编辑项目
        $scope.editSetData = function (index, set) {
            $scope.currentSetData = set;
            $scope.currentSetDataIndex = index;
            $scope.isAddSetData = true;
        };
        //取消操作
        $scope.cancelSetData = function () {
            $scope.isAddSetData = false;
            $scope.currentSetData = {};
            $scope.currentSetDataIndex = null;
        };
        //删除项目
        $scope.removeSetData = function (index, meta, scope) {
            scope.remove();
        };

    }]);

});