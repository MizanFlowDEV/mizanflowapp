const vscode = require('cursor');
const supabase = require('@supabase/supabase-js');
const { getCurrentProjectContext } = require('./contexts/deepseek-context');
const { validateAICode } = require('../src/ai/validation');
const { hash } = require('./src/utils/hash');

function getCurrentUserId() {
  // TODO: Implement user authentication
  return 'anonymous';
}

function formatCodeForProject(code) {
  // Enforce project-specific patterns
  return code
    .replace(/StyleSheet.create/g, 'useAppTheme()')
    .replace(/'@components'/g, "'@/components'")
    .replace(/<Text>/g, '<LocalizedText>');
}

module.exports = {
  activate(context) {
    // Shift Component Generator
    const shiftComponentCmd = vscode.commands.registerCommand(
      'deepseek.generateShiftComponent',
      async () => {
        const activeFile = vscode.window.activeTextEditor.document.fileName;
        const projectContext = getCurrentProjectContext();
        
        try {
          const response = await fetch('https://api.deepseek.com/v1/codegen', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${process.env.DEEPSEEK_KEY}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              prompt: `Generate React Native component for shift management with:
              - Bilingual support (${projectContext.i18n.currentLang})
              - RTL compatibility
              - Navy/gold theme integration
              Current project structure: ${JSON.stringify(projectContext)}`
            })
          });

          const { code } = await response.json();
          
          if (validateAICode(code)) {
            await vscode.window.activeTextEditor.edit(editBuilder => {
              editBuilder.insert(
                new vscode.Position(0, 0),
                formatCodeForProject(code)
              );
            });

            // Log to Supabase
            await supabase
              .from('code_generations')
              .insert({
                file_path: activeFile,
                type: 'shift_component',
                language: projectContext.i18n.currentLang
              });

            await logGeneration(activeFile, code);
          } else {
            vscode.window.showErrorMessage('AI code failed validation');
          }
        } catch (error) {
          vscode.window.showErrorMessage(`Error: ${error.message}`);
        }
      }
    );

    // Shift Pattern Analyzer
    const shiftAnalysisCmd = vscode.commands.registerCommand(
      'deepseek.analyzeShiftPattern',
      async () => {
        try {
          const selectedCode = vscode.window.activeTextEditor.document.getText(
            vscode.window.activeTextEditor.selection
          );

          const analysis = await fetch('https://api.deepseek.com/v1/analyze', {
            method: 'POST',
            body: JSON.stringify({
              code: selectedCode,
              context: {
                shiftRotation: '14/7',
                financialFeatures: true,
                targetLocale: getCurrentProjectContext().i18n.currentLang
              }
            })
          });

          vscode.window.showInformationMessage(
            `Shift Analysis: ${analysis.summary}`
          );
        } catch (error) {
          vscode.window.showErrorMessage(`Error: ${error.message}`);
        }
      }
    );

    const logGeneration = async (filePath, codeSnippet) => {
      try {
        const { error } = await supabase
          .from('ai_code_generations')
          .insert({
            file_path: filePath,
            generated_code: codeSnippet,
            prompt_hash: hash(codeSnippet),
            user_id: getCurrentUserId(),
            project_version: process.env.APP_VERSION
          });
        
        if (error) {
          vscode.window.showErrorMessage('Failed to log AI generation');
        }
      } catch (error) {
        vscode.window.showErrorMessage(`Error logging generation: ${error.message}`);
      }
    };

    context.subscriptions.push(shiftComponentCmd, shiftAnalysisCmd);
  }
};