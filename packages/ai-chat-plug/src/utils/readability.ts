import { Readability } from '@mozilla/readability'
import type { PageContent, PageImage } from '../types'

/**
 * 提取页面主要内容
 * @param document 当前文档对象
 * @returns 页面内容对象
 */
export const extractMainContent = (doc: Document): PageContent | null => {
  try {
    // 克隆文档以避免修改原始DOM
    const documentClone = doc.cloneNode(true) as Document

    // 使用Readability提取主要内容
    const reader = new Readability(documentClone)
    const article = reader.parse()

    if (!article) return null

    // 提取页面中的重要图片
    const images = extractImportantImages(doc)

    return {
      title: article.title || document.title,
      url: window.location.href,
      content: article.textContent || '',
      excerpt: article.excerpt || '',
      html: article.content || '',
      images: images
    }
  } catch (error) {
    console.error('提取页面内容时出错:', error)
    return null
  }
}

/**
 * 提取页面中的重要图片
 * @param document 当前文档对象
 * @returns 重要图片数组
 */
export const extractImportantImages = (doc: Document): PageImage[] => {
  // 从页面中获取所有图片
  const imgElements = Array.from(doc.querySelectorAll('img'))

  // 过滤掉小图标、小装饰图片等
  const significantImages = imgElements.filter((img) => {
    // 图片必须有src
    if (!img.src) return false

    // 排除数据URI（通常是图标或小装饰）
    if (img.src.startsWith('data:')) return false

    // 排除很小的图片（可能是图标或装饰元素）
    const minSize = 100 // 最小尺寸（像素）
    return (
      (img.naturalWidth || img.width) >= minSize && (img.naturalHeight || img.height) >= minSize
    )
  })

  // 最多返回10张图片，避免数据量过大
  return significantImages.slice(0, 10).map((img) => ({
    src: img.src,
    alt: img.alt || '',
    width: img.naturalWidth || img.width,
    height: img.naturalHeight || img.height
  }))
}

/**
 * 简化HTML内容，去除不必要的标签和属性
 * @param html 原始HTML
 * @returns 简化后的HTML
 */
export const simplifyHtml = (html: string): string => {
  // 创建临时元素
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = html

  // 移除脚本和样式标签
  const scripts = tempDiv.querySelectorAll('script, style')
  scripts.forEach((script) => script.remove())

  // 移除所有事件处理程序和一些不必要的属性
  const allElements = tempDiv.querySelectorAll('*')
  allElements.forEach((el) => {
    // 移除所有on*属性（事件处理程序）
    Array.from(el.attributes).forEach((attr) => {
      if (attr.name.startsWith('on') || ['id', 'class', 'style'].includes(attr.name)) {
        el.removeAttribute(attr.name)
      }
    })
  })

  return tempDiv.innerHTML
}
