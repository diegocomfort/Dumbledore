# Dumbledore
Chat GTP Chrome Extension

## Installation
You must have npm to install packages.
```
git clone https://github.com/diegocomfort/Dumbledore.git
cd Dumbledore/
npm install openai webpack webpack-cli lodash
```
Add your API key to background.js\
Then, execute:
```
npx webpack
```
Go to [chrome://extensions](chrome://extensions), turn on dev mode and click `Load unpacked` and upload this directory.\
Dumbledore should now be available in your extension menu

## Usage
Type in your message where you see "Prompt away!"\
To send your message, click `ctrl+enter` or click on the quote in the top right corner
