import fs from 'fs';
import path from 'path';

export const loadPromptTemplate = (templateName: string, params: object) => {
  const templatePath = path.join(
    __dirname,
    `../ai/prompt-templates/${templateName}.md`
  );
  
  let content = fs.readFileSync(templatePath, 'utf-8');
  Object.entries(params).forEach(([key, value]) => {
    content = content.replace(new RegExp(`{${key}}`, 'g'), value);
  });
  
  return content;
};