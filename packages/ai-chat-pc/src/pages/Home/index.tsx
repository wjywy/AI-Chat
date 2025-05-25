import { useTranslation } from 'react-i18next'
import { Button } from 'antd'
import AIRichInput from '@pc/components/AIRichInput'

const Home = () => {
  const { t } = useTranslation()
  return (
    <div className="p-4">
      <div className="p-4 rounded-lg shadow">
        <h1 className="text-xl font-bold dark:text-white">{t('app.home')}</h1>
        <div className="mt-4">
          <AIRichInput />
        </div>
        <Button>theme chang test</Button>
      </div>
    </div>
  )
}

export default Home
