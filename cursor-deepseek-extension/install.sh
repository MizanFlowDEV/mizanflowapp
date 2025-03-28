#!/bin/bash

# Check if DEEPSEEK_KEY is set
if [ -z "$DEEPSEEK_KEY" ]; then
    echo "Error: DEEPSEEK_KEY environment variable is not set"
    echo "Please set it with: export DEEPSEEK_KEY=your_key_here"
    exit 1
fi

# Install dependencies
echo "Installing dependencies..."
npm install

# Package the extension
echo "Packaging extension..."
vsce package

# Install the extension
echo "Installing extension..."
cursor --install-extension deepseek-mizanflow-1.0.0.vsix

# Set environment variable
echo "Setting environment variable..."
export DEEPSEEK_KEY=$DEEPSEEK_KEY

echo "Installation complete! You can now use the DeepSeek extension."
echo "To use the extension:"
echo "1. Open a TypeScript React file"
echo "2. Use Ctrl+Shift+S to generate a shift component"
echo "3. Use Ctrl+Shift+A to analyze shift patterns" 