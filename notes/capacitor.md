# capcitor

## 相关链接

- https://capacitorjs.com/

## 操作记录

参考：https://capacitorjs.com/docs/getting-started#add-capacitor-to-your-web-app

```bash
# Install Capacitor 在项目中安装capacitor
# https://capacitorjs.com/docs/getting-started#install-capacitor
$ npm i @capacitor/core
$ npm i -D @capacitor/cli

# Initialize your Capacitor config 初始化capacitor配置文件
# https://capacitorjs.com/docs/getting-started#initialize-your-capacitor-config
$ npx cap init # 初始化

# Create your Android and iOS projects 创建Android和iOS项目
# https://capacitorjs.com/docs/getting-started#create-your-android-and-ios-projects
$ npm i @capacitor/android @capacitor/ios
$ npx cap add android
$ npx cap add ios

# Sync your web code to your native project 同步资源文件到Android和iOS项目中
# https://capacitorjs.com/docs/getting-started#sync-your-web-code-to-your-native-project
$ npx cap sync

# 安装浏览器插件
# https://capacitorjs.com/docs/apis/browser
$ npm install @capacitor/browser --save
$ npx cap sync

# https://capacitorjs.com/docs/apis/status-bar
$ npm install @capacitor/status-bar --save
$ npx cap sync
```
