# 使用官方的Node.js基础镜像
FROM node:14

# 设置工作目录
WORKDIR /app

# 复制您的静态文件到容器内
COPY app/ /app

# 暴露端口，通常HTTP使用80端口
EXPOSE 80

# 启动静态文件服务器
CMD ["sh", "-c", "node cors-server.js"]

#docker build -t land007/node-static-server:latest ./
#> docker buildx build --platform linux/amd64,linux/arm64/v8,linux/arm/v7 -t land007/node-static-server:latest --push .
