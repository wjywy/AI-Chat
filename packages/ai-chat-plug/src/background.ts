/**
 * Chrome扩展后台脚本

 */

// 扩展安装时初始化
chrome.runtime.onInstalled.addListener(() => {
  console.log('AI Chat扩展已安装')

  // TODO: 创建右键菜单
  // chrome.contextMenus.create({...})
})

// 处理右键菜单点击（待实现）
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  console.log('右键菜单被点击:', info.menuItemId)
})

// 处理其他组件的消息
chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  console.log('收到消息:', request.type)

  if (request.type === 'OPEN_POPUP') {
    // 打开弹窗
    await chrome.action.openPopup()
  }
})

// 打开弹窗并传递数据（预留接口）
async function openPopupWithData(data: any) {
  // 保存数据到Chrome存储
  await chrome.storage.local.set({
    pendingData: data,
    timestamp: Date.now()
  })

  // 打开弹窗
  await chrome.action.openPopup()
}

// TODO: 更多后台功能
// - 页面内容获取
// - 消息通信优化
// - 错误处理
