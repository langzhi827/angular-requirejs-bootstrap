define([], function () {
    return function (dependencies) {
        // 返回路由的 resolve 定义，
        var definition = {
            // resolver 是一个函数， 返回一个 promise 对象；
            resolver: ['$q', '$rootScope', function ($q, $rootScope) {
                // 创建一个延迟执行的 promise 对象
                var defered = $q.defer();
                // 使用 requirejs 的 require 方法加载的脚本
                require(dependencies, function () {
                    $rootScope.$apply(function () {
                        // 加载完脚本之后， 完成 promise 对象；
                        defered.resolve();
                    });
                });
                //返回延迟执行的 promise 对象， route 会等待 promise 对象完成
                return defered.promise;
            }]
        };
        return definition;
    }
});