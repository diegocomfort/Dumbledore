# Dumbledore
Chat GTP Chrome Extension

## Instalation
You must have npm to install packages.
```
git clone https://github.com/diegocomfort/Dumbledore.git
cd Dumbledore/
npm install openai webpack webpack-cli lodash
```
Add your API key to background.js, and if you want the AI to be like Dumbledore, add the commented "Optional" object to `history`
Then, execute:
```
npx webpack
```
Go to chrome://extensions, turn on dev mode and click `Load unpacked` and upload this directory
Dumbledore should now be available in your extension menu

## Usage
Type in your message where you see "Promt away"
To send your message, click `ctrl+enter` or click on the quote in the top right corner
