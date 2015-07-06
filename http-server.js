var PORT = 3000;
var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');

var types = {
    "css": "text/css",
    "gif": "image/gif",
    "html": "text/html",
    "ico": "image/x-icon",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "js": "text/javascript",
    "json": "application/json",
    "pdf": "application/pdf",
    "png": "image/png",
    "svg": "image/svg+xml",
    "swf": "application/x-shockwave-flash",
    "tiff": "image/tiff",
    "txt": "text/plain",
    "wav": "audio/x-wav",
    "wma": "audio/x-ms-wma",
    "wmv": "video/x-ms-wmv",
    "xml": "text/xml"
};
/*如果想提供下载文件功能可以使其他扩展名的文件使用"application/octet-stream"来做返回类型。*/
var routerConfig = {
    "/": "/index.html",
    "/login": "/views/login/index.html",
    "/register": "/views/register/index.html"
}

var server = http.createServer(function (request, response) {
    var pathname = url.parse(request.url).pathname;

    pathname = routerConfig[pathname] ? routerConfig[pathname] : pathname;

    var realPath = path.join('app', pathname);

    console.log(realPath);

    var ext = path.extname(realPath);
    ext = ext ? ext.slice(1) : 'unknown';

    fs.exists(realPath, function (exists) {
        if (!exists) {
            response.writeHead(404, {
                'Content-Type': 'text/plain'
            });

            response.write("This request URL " + pathname + " was not found on this server.");
            response.end();
        } else {
            fs.readFile(realPath, "binary", function (err, file) {
                if (err) {
                    response.writeHead(500, {
                        'Content-Type': 'text/plain'
                    });
                    response.end(err);
                } else {
                    var contentType = types[ext] || "text/plain";
                    response.writeHead(200, {
                        'Content-Type': contentType
                    });
                    response.write(file, "binary");
                    response.end();
                }
            });
        }
    });

});

server.listen(PORT);
console.log("Server runing at port: " + PORT + ".");