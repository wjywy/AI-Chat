/**
 * 全局组件导出文件
 * 示例：
 * import { ChatInput, ChatView, ReadView } from '../components'
 */

// 导出所有UI组件 (从ui目录)
export * from './ui'

// 导出所有业务组件 (从business目录)
export * from './business'

// 这样外部就可以统一从这里导入所有组件了
// 不需要记住每个组件在哪个子目录里
