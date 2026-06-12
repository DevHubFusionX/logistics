const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const srcDir = path.resolve(projectRoot, 'src');

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

const folderMoves = [
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

// Sort descending by length of old path
folderMoves.sort((a, b) => b.old.length - a.old.length);

const allSourceFiles = getAllFiles(srcDir).filter(f => 
  /\.(js|jsx|css)$/.test(f)
);

let updatedFilesCount = 0;

allSourceFiles.forEach(filePath => {
  const relFilePath = path.relative(projectRoot, filePath).replace(/\\/g, '/');
  
  // 1. Compute where the importing file will end up
  let newRelFilePath = relFilePath;
  for (const move of folderMoves) {
    if (relFilePath === move.old || relFilePath.startsWith(move.old + '/')) {
      const suffix = relFilePath.slice(move.old.length);
      newRelFilePath = move.new + suffix;
      break;
    }
  }

  const oldFileDir = path.dirname(filePath);
  const newFileDir = path.dirname(path.resolve(projectRoot, newRelFilePath));

  let content = fs.readFileSync(filePath, 'utf-8');
  const originalContent = content;

  // Regexes
  const importExportRegex = /((?:import|export)\b[^'"]*?\bfrom\s+['"])([^'"]+)(['"])/g;
  const simpleImportRegex = /(import\s+['"])([^'"]+)(['"])/g;

  function processImportPath(importPath) {
    let resolvedAbsPath = '';
    let isAbsoluteAlias = false;

    if (importPath.startsWith('@/')) {
      resolvedAbsPath = path.resolve(srcDir, importPath.slice(2));
      isAbsoluteAlias = true;
    } else if (importPath.startsWith('.') || importPath.startsWith('..')) {
      resolvedAbsPath = path.resolve(oldFileDir, importPath);
    } else {
      return importPath; // Package import
    }

    const relTargetFromRoot = path.relative(projectRoot, resolvedAbsPath).replace(/\\/g, '/');

    // 2. Compute where the target file will end up
    let newTargetRelFromRoot = relTargetFromRoot;
    for (const move of folderMoves) {
      if (relTargetFromRoot === move.old || relTargetFromRoot.startsWith(move.old + '/')) {
        const suffix = relTargetFromRoot.slice(move.old.length);
        newTargetRelFromRoot = move.new + suffix;
        break;
      }
    }

    const newTargetAbsPath = path.resolve(projectRoot, newTargetRelFromRoot);

    // 3. Construct the new import path
    if (isAbsoluteAlias) {
      const newRelFromSrc = path.relative(srcDir, newTargetAbsPath).replace(/\\/g, '/');
      return `@/${newRelFromSrc}`;
    } else {
      let newRelPath = path.relative(newFileDir, newTargetAbsPath).replace(/\\/g, '/');
      if (!newRelPath.startsWith('.') && !newRelPath.startsWith('..')) {
        newRelPath = './' + newRelPath;
      }
      return newRelPath;
    }
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
    console.log(`Updated imports in: ${relFilePath} -> ${newRelFilePath}`);
  }
});

console.log(`\nImports updated in ${updatedFilesCount} files.`);
