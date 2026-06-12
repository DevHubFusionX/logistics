const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const srcDir = path.resolve(projectRoot, 'src');

// Helper to get all files recursively
function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      getAllFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  });
  return fileList;
}

// Find all source files
const allSourceFiles = getAllFiles(srcDir).filter(f => 
  /\.(js|jsx|css|png|jpg|jpeg|svg|webp)$/.test(f)
);

const absoluteToRelative = (absPath) => path.relative(projectRoot, absPath);

// Find imports in a file
function getImports(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const imports = [];
  
  // RegEx patterns for imports
  const staticImportRegex = /import\s+(?:(?:\s*[^\s,{]+\s*,?)?(?:\s*\{(?:[^\}]+)\})?\s+from\s+)?['"]([^'"]+)['"]/g;
  const dynamicImportRegex = /import\s*\(\s*['"]([^'"]+)['"]\s*\)/g;
  const requireRegex = /require\s*\(\s*['"]([^'"]+)['"]\s*\)/g;
  const cssImportRegex = /@import\s+['"]([^'"]+)['"]/g;

  let match;
  while ((match = staticImportRegex.exec(content)) !== null) {
    imports.push(match[1]);
  }
  while ((match = dynamicImportRegex.exec(content)) !== null) {
    imports.push(match[1]);
  }
  while ((match = requireRegex.exec(content)) !== null) {
    imports.push(match[1]);
  }
  while ((match = cssImportRegex.exec(content)) !== null) {
    imports.push(match[1]);
  }

  return imports;
}

// Resolve import path to absolute file path
function resolveImport(importPath, currentFileDir) {
  let resolvedPath = '';
  
  if (importPath.startsWith('@/')) {
    resolvedPath = path.resolve(srcDir, importPath.slice(2));
  } else if (importPath.startsWith('.') || importPath.startsWith('..')) {
    resolvedPath = path.resolve(currentFileDir, importPath);
  } else {
    // Node modules or other external deps
    return null;
  }

  // Try extensions
  const extensions = ['', '.jsx', '.js', '.css', '/index.js', '/index.jsx', '.png', '.jpg', '.jpeg', '.svg', '.webp'];
  for (const ext of extensions) {
    const testPath = resolvedPath + ext;
    if (fs.existsSync(testPath) && fs.statSync(testPath).isFile()) {
      return testPath;
    }
  }

  return null;
}

// Map of file -> Set of imported files
const graph = {};
allSourceFiles.forEach(file => {
  graph[file] = new Set();
  const fileDir = path.dirname(file);
  const imports = getImports(file);
  
  imports.forEach(imp => {
    const resolved = resolveImport(imp, fileDir);
    if (resolved) {
      graph[file].add(resolved);
    }
  });
});

// Trace from entry point
const entryPoint = path.resolve(srcDir, 'main.jsx');
const visited = new Set();

function dfs(file) {
  if (visited.has(file)) return;
  visited.add(file);
  
  const imports = graph[file];
  if (imports) {
    imports.forEach(imp => {
      dfs(imp);
    });
  }
}

if (fs.existsSync(entryPoint)) {
  dfs(entryPoint);
} else {
  console.error('Entry point main.jsx not found!');
  process.exit(1);
}

// Find unused files
const unusedFiles = allSourceFiles.filter(file => !visited.has(file));

console.log('--- UNUSED FILES ---');
unusedFiles.forEach(file => {
  console.log(absoluteToRelative(file));
});
console.log(`Total source files: ${allSourceFiles.length}`);
console.log(`Used source files: ${visited.size}`);
console.log(`Unused source files: ${unusedFiles.length}`);
