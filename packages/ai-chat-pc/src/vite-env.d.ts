/// <reference types="vite/client" />

declare module 'dayjs/locale/*' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const locale: any
  export default locale
}
