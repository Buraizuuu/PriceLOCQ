//Pre-requisite
NodeJS : https://github.com/coreybutler/nvm-windows
Playwright NodeJS : https://playwright.dev/docs/intro#installing-playwright
Visual Studio Code IDE : https://code.visualstudio.com/

//Installation Instructions - (Local) if you have the project folder file
1. Download and install the latest Node.js.
(Optional: I use Node Version Manager (nvm) to easily switch between Node versions.)
2. Install Visual Studio Code as your IDE.
3. Open Visual Studio Code, then open the project folder "LOCQ" via File > Open Folder.
4. Open the integrated terminal inside VS Code by selecting View > Terminal (or press Ctrl+`).
5. In the terminal, run the following command to install Playwright and initialize your testing setup:
npm init playwright@latest

//Cloning Project
1. Open Visual Studio Code > Terminal
2. Open the terminal and clone the project from GitHub by running: git clone https://github.com/Buraizuuu/PriceLOCQ.git
3. After cloning, open Visual Studio Code, then open the PriceLOCQ folder via File > Open Folder.

//To Run all script
npx playwright test test

//To Run the script individually
npx playwright test tests/home.spec.ts
npx playwright test tests/partners.spec.ts
npx playwright test tests/stations.spec.ts

//Challenges Encountered
-Maximizing screen during browser launched
-Encountered duplicate web objects, making it difficult to get unique results.
-Dropdown menus disappear when inspecting elements, making it consistently hard to find and reliably target their XPath locators.
-Use of dynamic IDs made it challenging to create stable and consistent locators.
