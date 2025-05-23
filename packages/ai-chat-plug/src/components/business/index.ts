/**
 * 业务组件统一导出文件
 * 使用方式：
 * import { ChatView, ReadView } from '../business'
 */

// 导出普通聊天视图组件
export { ChatView } from './ChatView'

// 导出智读视图组件
export { ReadView } from './ReadView'

// 未来可以添加更多业务组件，比如：
// export { TranslateView } from './TranslateView'    // 翻译界面
// export { SummaryView } from './SummaryView'        // 摘要界面
// export { SettingsView } from './SettingsView'      // 设置界面
