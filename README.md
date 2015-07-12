# angular-requirejs-bootstrap
一个利用angularjs，requirejs以及bootstrap实现的前端实例。

## 目录结构

    app/                    --> 所有文件
      index.html            --> HTML主文件
      css/                  --> css文件目录
        main.css            --> 公共样式目录
        **/*.css       
        ......
      img/                  --> 图片目录
        **/*.*       
        ......
      js/                   --> javascript文件目录
        main.js             --> requirejs配置以及angular启动脚本
        app.js              --> javascript主文件
        router.js           --> 页面路由
        routeResolve.js     --> 在路由加载模板之前加载当前模板所需(我想当进入某个功能点的时候才加载当前功能点所利用的javascript文件，所以利用这个方法实现javascript文件的按需加载)
        config              --> 配置文件目录
          appjs.js          --> 引入公共依赖javascript列表
          config.js         --> 全局配置
        controllers         --> 公共controller目录
          controllers.js    --> 主controller文件
          *.js              --> 其他公共controller文件
          ......
        directives          --> 公共directive目录
          directives.js     --> 主directive文件
          mainNavbar.js     --> 头部(header)切换指令脚本
          *.js              --> 其他公共directive文件
          ......
        filters             --> 公共filter目录
          filters.js        --> 主filter文件
          *.js              --> 其他公共filter文件
          ......
        services            --> 公共service目录
          services.js       --> 主service文件
          *.js              --> 其他公共service文件
          ......
        lib                 --> 自定义公共依赖脚本目录
          **/*.js
          ......
      partials              --> 公共HTML模板文件(比如：header.html/footer.html)目录
      template              --> angular-bootstrap模板文件目录
      vender                --> bowser定义公共依赖目录
      views                 --> 各个模块内容目录(我按业务功能点区分)
        title1              --> title1功能
          index.html        --> 当前模块主HTML文件
          style.css         --> 当前模块依赖css
          index.js          --> 当前模块依赖所有javascript引入列表
          controller.js     --> 当前模块控制器文件
          service.js        --> 当前模块服务文件
          **/*.*            --> 自定义其他文件
          ......
        title2              --> title2功能
          ......