import { supabase } from '../config/supabase';

export const logAIGeneration = async (
  filePath: string,
  code: string,
  userId: string
) => {
  const { error } = await supabase
    .from('ai_code_generations')
    .insert({
      file_path: filePath,
      generated_code: code,
      prompt_hash: hash(code),
      user_id: userId,
      project_version: process.env.APP_VERSION
    });

  if (error) throw new Error('AI logging failed');
};