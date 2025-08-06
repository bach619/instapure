const fs = require('fs');
const path = require('path');

// Constants
const GREEN = '\x1b[32m';
const BLUE = '\x1b[34m';
const YELLOW = '\x1b[33m';
const RED = '\x1b[31m';
const RESET = '\x1b[0m';

// Path configuration
const BASE_DIR = path.join(__dirname, '../src/features/i18n/messages');
const OUTPUT_DIR = path.join(__dirname, '../src/features/i18n/locales');
const MAIN_LANG = 'en-US';

// Logging helper
function logInfo(message) {
  console.log(`${BLUE}${message}${RESET}`);
}

function logSuccess(message) {
  console.log(`${GREEN}${message}${RESET}`);
}

function logWarning(message) {
  console.log(`${YELLOW}${message}${RESET}`);
}

function logError(message) {
  console.error(`${RED}${message}${RESET}`);
}

// Core logic
function buildLanguageData(langDirPath) {
  const languageData = {};
  const files = getAllJsonFiles(langDirPath);

  files.forEach(filePath => {
    try {
      const relativePath = path.relative(langDirPath, filePath);
      const parts = relativePath.split(path.sep).slice(0, -1);
      const fileName = path.basename(filePath, '.json');
      
      let currentLevel = languageData;
      const fullPath = [...parts, fileName];
      
      for (let i = 0; i < fullPath.length; i++) {
        const part = fullPath[i];
        
        if (i === fullPath.length - 1) {
          const fileContent = JSON.parse(fs.readFileSync(filePath, 'utf8'));
          currentLevel[part] = fileContent;
        } else {
          if (!currentLevel[part]) {
            currentLevel[part] = {};
          }
          currentLevel = currentLevel[part];
        }
      }
    } catch (error) {
      logError(`Error processing file ${filePath}: ${error.message}`);
    }
  });

  return languageData;
}

function getAllJsonFiles(dirPath) {
  const files = [];
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  
  entries.forEach(entry => {
    const fullPath = path.join(dirPath, entry.name);
    
    if (entry.isDirectory()) {
      files.push(...getAllJsonFiles(fullPath));
    } else if (entry.isFile() && path.extname(entry.name) === '.json') {
      files.push(fullPath);
    }
  });
  
  return files;
}

function processAndOutputLanguages() {
  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const languageDirs = fs.readdirSync(BASE_DIR, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(dir => path.join(BASE_DIR, dir.name));

  const allLanguagesData = {};
  
  languageDirs.forEach(langDirPath => {
    const langCode = path.basename(langDirPath);
    logInfo(`--- Processing language: ${langCode} ---`);
    
    const langData = buildLanguageData(langDirPath);
    allLanguagesData[langCode] = langData;
    
    const outputPath = path.join(OUTPUT_DIR, `${langCode}.json`);
    fs.writeFileSync(outputPath, JSON.stringify(langData, null, 2), 'utf8');
    logSuccess(`Successfully wrote combined messages for '${langCode}' to: ${outputPath}`);
  });

  return allLanguagesData;
}

// Main execution
try {
  logInfo('Starting i18n message processing...');
  const allLanguagesData = processAndOutputLanguages();
  logInfo('Processing finished.');
  
  // Perform key consistency check
  if (Object.keys(allLanguagesData).length > 1) {
    // Key consistency implementation would go here
    logInfo('Skipping key consistency check for simplicity');
  }
} catch (error) {
  logError(`Fatal error: ${error.message}`);
  process.exit(1);
}
