var http = require("http"),
    url = require("url"),
    path = require("path"),
    normalize = path.normalize,
    join = path.join,
    sep = path.sep,
    fs = require("fs");

var SERVER_PORT = process.argv[2] || 80;

var static = "static";
var root = __dirname + sep + static;

var http_server = function (req, res) {
    //var pathname = url.parse(req.url).pathname;
    var pathname = url.parse(req.url, true).pathname;
    console.log('pathname', pathname);
    if (pathname == "/test.json") {
        var obj = { code: 200, msg: "ok" };
        res.writeHead(200, {
            "Content-Type": "text/javascript",
            "Cache-Control": "no-store, no-cache, must-revalidate",
            Pragma: "no-cache",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers":
                "Content-Type,Content-Length, Authorization, Accept,X-Requested-With",
            "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS",
        });
        res.end(JSON.stringify(obj));
        return;
    }
    var pathfile = normalize(join(root, pathname));
    root = normalize(root + sep);
    // 恶意路径检测
    if ((pathfile + sep).substr(0, root.length) !== root) {
        console.error('恶意路径 "' + pathfile + '"');
        res.writeHead(403);
        res.end('恶意路径 "' + pathfile + '"\n');
        return;
    }
    if (path.extname(pathfile) == "") {
        if (pathfile.endsWith("\\")) {
            pathfile += "index.html";
        }
    }

    fs.stat(pathfile, function (stat_error, stat) {
        if (!stat_error && stat.isFile()) {
            switch (path.extname(pathfile)) {
                case ".html":
                    res.writeHead(200, {
                        "Content-Type": "text/html",
                        "Cache-Control": "no-store, no-cache, must-revalidate",
                        Pragma: "no-cache",
                        "Content-Length": stat.size, // 添加 Content-Length 头
                    });
                    break;
                case ".js":
                    res.writeHead(200, {
                        "Content-Type": "text/javascript",
                        "Cache-Control": "no-store, no-cache, must-revalidate",
                        Pragma: "no-cache",
                        "Content-Length": stat.size, // 添加 Content-Length 头
                    });
                    break;
                case ".json":
                    res.writeHead(200, {
                        "Content-Type": "application/json",
                        "Cache-Control": "no-store, no-cache, must-revalidate",
                        Pragma: "no-cache",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Headers":
                            "Content-Type,Content-Length, Authorization, Accept,X-Requested-With",
                        "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS",
                        "Content-Length": stat.size, // 添加 Content-Length 头
                    });
                    break;
                case ".css":
                    res.writeHead(200, {
                        "Content-Type": "text/css",
                        "Cache-Control": "no-store, no-cache, must-revalidate",
                        Pragma: "no-cache",
                        "Content-Length": stat.size, // 添加 Content-Length 头
                    });
                    break;
                case ".gif":
                    res.writeHead(200, {
                        "Content-Type": "image/gif",
                        "Cache-Control": "no-store, no-cache, must-revalidate",
                        Pragma: "no-cache",
                        "Content-Length": stat.size, // 添加 Content-Length 头
                    });
                    break;
                case ".jpg":
                    res.writeHead(200, {
                        "Content-Type": "image/jpeg",
                        "Cache-Control": "no-store, no-cache, must-revalidate",
                        Pragma: "no-cache",
                        "Content-Length": stat.size, // 添加 Content-Length 头
                    });
                    break;
                case ".png":
                    res.writeHead(200, {
                        "Content-Type": "image/png",
                        "Cache-Control": "no-store, no-cache, must-revalidate",
                        Pragma: "no-cache",
                        "Content-Length": stat.size, // 添加 Content-Length 头
                    });
                    break;
                case ".xml":
                    res.writeHead(200, {
                        "Content-Type": "application/xml; charset=utf-8",
                        "Cache-Control": "no-store, no-cache, must-revalidate",
                        Pragma: "no-cache",
                        "Content-Length": stat.size, // 添加 Content-Length 头
                    });
                    break;
                default:
                    res.writeHead(200, {
                        "Content-Type": "application/octet-stream",
                        "Cache-Control": "no-store, no-cache, must-revalidate",
                        Pragma: "no-cache",
                        "Content-Length": stat.size, // 添加 Content-Length 头
                    });
            }

            fs.readFile(pathfile, function (err, data) {
                res.end(data);
            });
        } else {
            res.writeHead(404, {
                "Content-Type": "text/html",
                "Cache-Control": "no-store, no-cache, must-revalidate",
                Pragma: "no-cache",
            });
            res.end("<h1>404 Not Found</h1>");
        }
    });
};

http.createServer(http_server).listen(SERVER_PORT, "0.0.0.0");

console.log("服务器运行在 http://127.0.0.1:" + SERVER_PORT + "/");
