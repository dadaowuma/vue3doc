# 其他的一些配置

## 禁止页面缩放

```html
<meta
  name="viewport"
  content="width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no, minimum-scale=1,maximum-scale=1"
/>
```

## iOS 刘海屏

```html
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta
  name="apple-mobile-web-app-status-bar-style"
  content="black-translucent"
/>

<style type="text/css">
  html {
    padding: constant(safe-area-inset-top) constant(safe-area-inset-right)
      constant(safe-area-inset-bottom) constant(safe-area-inset-left) !important; /* 兼容 iOS < 11.2 */
    padding: env(safe-area-inset-top) env(safe-area-inset-right) env(
        safe-area-inset-bottom
      ) env(safe-area-inset-left) !important; /* 兼容 iOS >= 11.2 */
  }
</style>

<script>
  function setStatusBar() {
    const StatusBar = window.Capacitor.Plugins.StatusBar

    // iOS only
    window.addEventListener('statusTap', function () {
      console.log('statusbar tapped')
    })

    // Display content under transparent status bar (Android only)
    StatusBar.setOverlaysWebView({ overlay: true })

    const showStatusBar = async () => {
      await StatusBar.show()
    }

    showStatusBar()
  }
  setStatusBar()
</script>
```

## 在配置文件中

```js
  ['script', {src: './libs/interact.min.js'}],
  ['script', {src: './libs/apply-interact.js'}],
  // 禁止页面缩放
  ['meta', {name: "viewport", content: 'width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no, minimum-scale=1,maximum-scale=1'}],
  // 刘海屏适配
  ['meta', {name: 'apple-mobile-web-app-capable', content: 'yes'}],
  ['meta', {name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent'}],
  ['style', {}, `html {
  padding: constant(safe-area-inset-top) constant(safe-area-inset-right)
    constant(safe-area-inset-bottom) constant(safe-area-inset-left) !important; /* 兼容 iOS < 11.2 */
  padding: env(safe-area-inset-top) env(safe-area-inset-right) env(
      safe-area-inset-bottom
    ) env(safe-area-inset-left) !important; /* 兼容 iOS >= 11.2 */
  }`],
  ['script', {}, `function setStatusBar() {
    const StatusBar = window.Capacitor.Plugins.StatusBar

    // iOS only
    window.addEventListener('statusTap', function () {
      console.log('statusbar tapped')
    })

    // Display content under transparent status bar (Android only)
    StatusBar.setOverlaysWebView({ overlay: true })

    const showStatusBar = async () => {
      await StatusBar.show()
    }

    showStatusBar()
  }
  setStatusBar()`],
```
