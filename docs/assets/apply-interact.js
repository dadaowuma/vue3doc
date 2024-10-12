// 检测是否为iOS设备
var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
// 检测是否是Android设备
var isAndroid = /Android/.test(navigator.userAgent)

function noop() {}

/**
 * 生成一个ID值
 * @returns
 */
function initIdValue() {
  const id = (Math.random() * 10000) | 0

  return 't' + id
}

const id_value = initIdValue()

function initElement() {
  const ele = document.createElement('div')

  const style_def = `
    width: 60px;
    height: 60px;
    position: fixed;
    z-index:1000;
    right: 100px;
    bottom:100px;
    border-radius:50%;
    background-color: rgba(66, 184, 131, 1);
    color: #213547;
    touch-action: none;
    user-select: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 12px;
  `

  ele.setAttribute('style', style_def)
  ele.setAttribute('id', id_value)
  ele.innerHTML = `<span>双击</span><span>回首页</span>`

  return ele
}

/**
 * 响应双击事件
 * @param {DOMElement} target
 * @param {function} fn
 */
function triggerDblClick(target, fn) {
  let touchstart = 0 // 事件触发时的时间戳
  let touch_count = 0 // 事件被触发的次数

  /**
   * 响应iOS端的touchstart事件
   * @param {Event} event
   */
  function handleTouchStart(event) {
    if (touch_count === 0) {
      touch_count = touch_count + 1
      touchstart = Date.now()

      setTimeout(() => {
        touch_count = 0
      }, 300)
    } else if (touch_count === 1) {
      const cur = Date.now()

      if (cur - touchstart <= 300) {
        fn(event)
      }

      touch_count = 0
      touchstart = cur
    }
  }

  if (isIOS) {
    // 为了确保能够捕捉到双击事件，我们使用touch事件来模拟
    target.addEventListener('touchstart', handleTouchStart, false)
  } else {
    // 非iOS设备可以直接监听dblclick事件
    target.addEventListener('dblclick', fn, false)
  }
}

/**
 * 设置DOM
 */
function initDomSetting() {
  setTimeout(() => {
    const ele = initElement()
    document.body.appendChild(ele)

    triggerDblClick(ele, function () {
      window.location.href = '/'
    })

    const position = { x: 0, y: 0 }

    interact('#' + id_value).draggable({
      listeners: {
        start(event) {
          // console.log(event.type, event.target)
        },
        move(event) {
          position.x += event.dx
          position.y += event.dy

          event.target.style.transform = `translate(${position.x}px, ${position.y}px)`
        },
      },
    })
  }, 1000)

  if (isAndroid) {
    setTimeout(() => {
      var layout = document.querySelector('.Layout') // pinia/vuex/router的文档主要内容被此class包裹
      var vue3_doc = document.querySelector('.VPApp') // vue3文档的主要内容被此class包裹
      layout && layout.setAttribute('style', 'padding-top: 30px')
      vue3_doc && vue3_doc.setAttribute('style', 'padding-top: 30px')

      // 解决在Android端，点击右上角菜单时
      // 浮层位置偏高，会被状态栏遮挡的问题
      // 此处通过在Chrome浏览器中调试，手动硬编码设置尺寸值
      // 如果重新build的话，此处设置的值可能无效，需要重新调整
      // TODO: 需要使用更好的方式来解决此问题
      var style = document.createElement('style')
      style.innerHTML = `
        /**vue**/
        div.VPNavScreen[data-v-2f6f22e7]{
          top: calc(var(--vt-nav-height) + var(--vt-banner-height, 30px));
        }
        /**vue-router**/
        div.VPNavScreen[data-v-20ff7378]{
          top: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 30px));
        }
        /**pinia**/
        div.VPNavScreen[data-v-14caef3e]{
          top: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 30px) + 0px);
        }
        /**vuex**/
        div.VPNavScreen[data-v-3a7632b8]{
          top: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 30px) + 0px);
        }
      `

      document.head.appendChild(style)
    })
  }
}

/**
 * 获取Capacitor的插件
 * @param {string} plugin_name
 * @returns
 */
function getCapPluginNamespace(plugin_name) {
  if ('Capacitor' in window) {
    const cap = window.Capacitor

    if (cap && 'Plugins' in cap) {
      const plugs = cap.Plugins

      if (plugs && plugin_name in plugs) {
        return plugs[plugin_name]
      }
    }
  }

  return null
}

/**
 * 设置状态栏
 */
function setStatusBar() {
  const StatusBar = getCapPluginNamespace('StatusBar') || {
    show: noop,
    hide: noop,
    setOverlaysWebView: noop,
  }

  const showStatusBar = async () => {
    await StatusBar.show()
  }
  const hideStatusBar = async () => {
    await StatusBar.hide()
  }

  // iOS only
  window.addEventListener('statusTap', function () {
    console.log('statusbar tapped')
  })

  StatusBar.setOverlaysWebView({ overlay: true })

  showStatusBar()
}

initDomSetting()
setStatusBar()
