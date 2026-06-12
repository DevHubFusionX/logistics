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

// Moves map (old absolute path -> new absolute path relative to srcDir)
const moves = [
  { old: 'src/components/ui/advanced', new: 'src/components/ui' },
  { old: 'src/components/admin', new: 'src/features/admin/components/admin' },
  { old: 'src/components/users', new: 'src/features/admin/components/users' },
  { old: 'src/components/settings', new: 'src/features/admin/components/settings' },
  { old: 'src/components/fleet', new: 'src/features/fleet/components/fleet' },
  { old: 'src/components/drivers', new: 'src/features/fleet/components/drivers' },
  { old: 'src/components/shipments', new: 'src/features/shipments/components/shipments' },
  { old: 'src/components/trips', new: 'src/features/shipments/components/trips' },
  { old: 'src/components/warehouses', new: 'src/features/shipments/components/warehouses' },
  { old: 'src/components/temperature', new: 'src/features/shipments/components/temperature' },
  { old: 'src/components/orders', new: 'src/features/shipments/components/orders' },
  { old: 'src/components/payments', new: 'src/features/billing/components/payments' },
  { old: 'src/components/pricing', new: 'src/features/billing/components/pricing' },
  { old: 'src/components/clients', new: 'src/features/booking/components/clients' },
  { old: 'src/components/tracking', new: 'src/features/tracking/components/tracking' },
  { old: 'src/components/user', new: 'src/features/user/components/user' },
  { old: 'src/components/landing', new: 'src/features/landing/components/landing' },
  { old: 'src/components/reports', new: 'src/features/dashboard/components/reports' },
  { old: 'src/components/alerts', new: 'src/features/dashboard/components/alerts' },
  { old: 'src/components/tasks', new: 'src/features/dashboard/components/tasks' },
  { old: 'src/components/chat', new: 'src/features/dashboard/components/chat' },
];

// Sort moves by old path length descending to avoid partial matches (e.g. ui/advanced before ui)
moves.sort((a, b) => b.old.length - a.old.length);

const allSourceFiles = getAllFiles(srcDir).filter(f => 
  /\.(js|jsx|css)$/.test(f)
);

let updatedFilesCount = 0;

allSourceFiles.forEach(filePath => {
  const currentFileDir = path.dirname(filePath);
  let content = fs.readFileSync(filePath, 'utf-8');
  let originalContent = content;

  // Regex to match imports and exports with from:
  // e.g. import ... from '...' or export ... from '...'
  const importExportRegex = /((?:import|export)\b[^'"]*?\bfrom\s+['"])([^'"]+)(['"])/g;
  
  // Regex to match simple import '...'
  const simpleImportRegex = /(import\s+['"])([^'"]+)(['"])/g;

  // Function to process and update import path
  function processImportPath(importPath) {
    let resolvedAbsPath = '';
    let isAbsoluteAlias = false;

    if (importPath.startsWith('@/')) {
      resolvedAbsPath = path.resolve(srcDir, importPath.slice(2));
      isAbsoluteAlias = true;
    } else if (importPath.startsWith('.') || importPath.startsWith('..')) {
      resolvedAbsPath = path.resolve(currentFileDir, importPath);
    } else {
      // Third party modules or non-relative/non-alias imports
      return importPath;
    }

    // Convert resolvedAbsPath to relative path from projectRoot (matching the moves map keys)
    const relFromRoot = path.relative(projectRoot, resolvedAbsPath);

    // Check if it matches any moved path
    for (const move of moves) {
      if (relFromRoot === move.old || relFromRoot.startsWith(move.old + '/') || relFromRoot.startsWith(move.old + '\\')) {
        // Compute new absolute path
        const relativeSuffix = relFromRoot.slice(move.old.length);
        const newAbsPath = path.resolve(projectRoot, move.new + relativeSuffix);

        // Convert back to original style
        if (isAbsoluteAlias) {
          const newRelFromSrc = path.relative(srcDir, newAbsPath).replace(/\\/g, '/');
          return `@/${newRelFromSrc}`;
        } else {
          let newRelPath = path.relative(currentFileDir, newAbsPath).replace(/\\/g, '/');
          if (!newRelPath.startsWith('.') && !newRelPath.startsWith('..')) {
            newRelPath = './' + newRelPath;
          }
          return newRelPath;
        }
      }
    }

    return importPath;
  }

  content = content.replace(importExportRegex, (match, prefix, importPath, suffix) => {
    const newPath = processImportPath(importPath);
    return prefix + newPath + suffix;
  });

  content = content.replace(simpleImportRegex, (match, prefix, importPath, suffix) => {
    const newPath = processImportPath(importPath);
    return prefix + newPath + suffix;
  });

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf-8');
    updatedFilesCount++;
    console.log(`Updated: ${path.relative(projectRoot, filePath)}`);
  }
});

console.log(`\nImports updated in ${updatedFilesCount} files.`);
