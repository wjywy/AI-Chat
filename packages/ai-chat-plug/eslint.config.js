import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

import rootConfig from '../../eslint.config.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// 扩展根配置，添加路径别名解析
const config = rootConfig.map((configItem) => {
  if (configItem.settings && configItem.settings['import/resolver']) {
    return {
      ...configItem,
      settings: {
        ...configItem.settings,
        'import/resolver': {
          ...configItem.settings['import/resolver'],
          typescript: {
            project: resolve(__dirname, './tsconfig.app.json')
          }
        }
      }
    }
  }
  return configItem
})

export default config
