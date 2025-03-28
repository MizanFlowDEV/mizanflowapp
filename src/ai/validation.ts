export const validateAICode = (code: string) => {
    const requirements = [
      { pattern: /useAppTheme\(\)/, message: 'Theme hook missing' },
      { pattern: /LocalizedText/, message: 'Localization missing' },
      { pattern: /interface Props/, message: 'TypeScript types missing' }
    ];
  
    return requirements.map(req => ({
      ...req,
      valid: req.pattern.test(code)
    }));
  };