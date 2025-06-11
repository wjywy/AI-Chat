/**
 * 根据文件扩展名判断是否为图片
 * @param fileName 文件名或文件路径
 * @returns 是否为图片文件
 */
export function isImageByExtension(fileName: string): boolean {
  const imageExtensions = [
    '.jpg',
    '.jpeg',
    '.png',
    '.gif',
    '.bmp',
    '.webp',
    '.svg',
    '.ico',
    '.tiff',
    '.tif'
  ]

  const extension = fileName.toLowerCase().substring(fileName.lastIndexOf('.'))
  return imageExtensions.includes(extension)
}
