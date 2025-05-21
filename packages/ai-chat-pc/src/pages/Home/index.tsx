import { Bubble, Sender } from '@ant-design/x'
import useBearStore from '@pc/store/useBearStore'
import { useTranslation } from 'react-i18next'

const messages = [
  {
    content: 'Hello, Ant Design X!',
    role: 'user'
  }
]

const Home = () => {
  const bears = useBearStore((state) => state.bears)
  const name = 'zs'

  const { t } = useTranslation()
  return (
    <div className="p-4">
      <div className="p-4 rounded-lg shadow">
        <h1 className="text-xl font-bold dark:text-white">{t('app.home')}</h1>
        <div className="mt-4">
          <Bubble.List items={messages} />
          <Sender placeholder={t('common.submit')} />
        </div>
      </div>
    </div>
  )
}

export default Home
