#!/bin/bash

# Create necessary directories
mkdir -p assets/images
mkdir -p assets/icon
mkdir -p assets/adaptive-icon
mkdir -p assets/ios

# Copy original logo (if not already in assets/images)
if [ ! -f "assets/images/Logo.png" ]; then
    cp assets/images/Logo.png assets/images/logo.png
fi

# Generate app icon (1024x1024)
convert assets/images/Logo.png -resize 1024x1024 assets/icon.png

# Generate splash screen (2048x2048)
convert assets/images/Logo.png -resize 512x512 -background '#001F3F' -gravity center -extent 2048x2048 assets/splash.png

# Generate adaptive icon background (108x108)
convert assets/images/Logo.png -resize 108x108 -background '#001F3F' -gravity center -extent 108x108 assets/adaptive-icon/background.png

# Generate adaptive icon foreground (108x108)
convert assets/images/Logo.png -resize 108x108 -background none -gravity center -extent 108x108 assets/adaptive-icon/foreground.png

# Generate iOS specific icons
convert assets/images/Logo.png -resize 180x180 assets/ios/Icon-180.png
convert assets/images/Logo.png -resize 167x167 assets/ios/Icon-167.png
convert assets/images/Logo.png -resize 152x152 assets/ios/Icon-152.png
convert assets/images/Logo.png -resize 120x120 assets/ios/Icon-120.png
convert assets/images/Logo.png -resize 87x87 assets/ios/Icon-87.png
convert assets/images/Logo.png -resize 80x80 assets/ios/Icon-80.png
convert assets/images/Logo.png -resize 76x76 assets/ios/Icon-76.png
convert assets/images/Logo.png -resize 60x60 assets/ios/Icon-60.png
convert assets/images/Logo.png -resize 58x58 assets/ios/Icon-58.png
convert assets/images/Logo.png -resize 40x40 assets/ios/Icon-40.png
convert assets/images/Logo.png -resize 29x29 assets/ios/Icon-29.png
convert assets/images/Logo.png -resize 20x20 assets/ios/Icon-20.png

echo "Icons and splash screen generated successfully!" 