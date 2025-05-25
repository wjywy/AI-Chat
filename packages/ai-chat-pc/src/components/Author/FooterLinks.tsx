import { useTranslation } from 'react-i18next'

export default function FooterLinks() {
  const { t } = useTranslation()

  return (
    <div className="mt-8 text-center text-sm text-gray-500">
      <a href="#" className="text-emerald-500 hover:underline">
        {t('footer.terms')}
      </a>
      <span className="mx-2">|</span>
      <a href="#" className="text-emerald-500 hover:underline">
        {t('footer.privacy')}
      </a>
    </div>
  )
}
