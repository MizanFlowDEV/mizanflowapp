import { loadPromptTemplate } from '../utils/template-loader';
import { useTranslation } from 'react-i18next';

export const generateBilingualComponent = async (componentName: string) => {
  const { t } = useTranslation();
  
  const template = await loadPromptTemplate('shift-component', {
    componentName,
    lang: t('currentLanguage'),
    themeColors: JSON.stringify(useAppTheme().colors)
  });

  const response = await fetch('https://api.deepseek.com/v1', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.DEEPSEEK_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      prompt: template,
      max_tokens: 1000
    })
  });

  return response.json();
};