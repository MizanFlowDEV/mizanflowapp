import { config } from 'dotenv';
import { OpenAI } from 'openai';
import * as fs from 'fs';
import * as path from 'path';

config();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const userQuestion = process.argv[2] || "Explain this project.";

async function getFiles(dir: string): Promise<string[]> {
  let files = fs.readdirSync(dir);
  let codeFiles: string[] = [];

  for (let file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory() && !fullPath.includes('node_modules')) {
      codeFiles = codeFiles.concat(await getFiles(fullPath));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      codeFiles.push(fullPath);
    }
  }

  return codeFiles.slice(0, 5); // Limit to 5 files for speed
}

async function run() {
  const files = await getFiles('src'); // or 'app' if using app/
  const snippets = files.map(file => {
    const code = fs.readFileSync(file, 'utf8');
    return `// File: ${file}\n${code.slice(0, 1500)}\n\n`;
  });

  const prompt = `You're an assistant helping with a React Native + Supabase app. Here's part of the codebase:\n\n${snippets.join('\n')}\n\nNow answer:\n${userQuestion}`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
  });

  console.log('\n--- GPT Answer ---\n');
  console.log(completion.choices[0].message.content);
}

run();