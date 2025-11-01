# 📋 Folder Reorganization Plan

## Step 1: Create Missing Folders

### 1.1 Create `common/` folder for shared components
Move these root files:
- `Footer.jsx`
- `Navbar.jsx`
- `LoadingScreen.jsx`
- `ProtectedRoute.jsx`
- `RoleSwitcher.jsx`

### 1.2 Create `landing/` folder for marketing pages
Move these root files:
- `DaraAbout.jsx`
- `DaraContact.jsx`
- `DaraHero.jsx`
- `DaraServices.jsx`
- `DaraTestimonials.jsx`
- `DaraWhyUs.jsx`

Merge with existing folders:
- `contact/` → `landing/contact/`
- `services/` → `landing/services/`
- `whyus/` → `landing/whyus/`
- `footer/` → `common/footer/`

## Step 2: Create Missing index.js Files

- `components/common/index.js`
- `components/landing/index.js`
- `components/contact/index.js` (before moving)
- `components/footer/index.js` (before moving)
- `components/services/index.js` (before moving)
- `components/trips/index.js`
- `components/whyus/index.js` (before moving)

## Step 3: Final Structure

```
components/
├── common/              ← NEW: Shared components
│   ├── footer/
│   ├── index.js
│   ├── Footer.jsx
│   ├── Navbar.jsx
│   ├── LoadingScreen.jsx
│   ├── ProtectedRoute.jsx
│   └── RoleSwitcher.jsx
│
├── landing/             ← NEW: Marketing/Landing pages
│   ├── contact/
│   ├── services/
│   ├── whyus/
│   ├── index.js
│   ├── DaraAbout.jsx
│   ├── DaraContact.jsx
│   ├── DaraHero.jsx
│   ├── DaraServices.jsx
│   ├── DaraTestimonials.jsx
│   └── DaraWhyUs.jsx
│
└── [all other existing folders remain]
```

## Execution Order

1. ✅ Create barrel exports for existing folders
2. ⏳ Create new folder structure
3. ⏳ Move files to new locations
4. ⏳ Update imports in affected files
5. ⏳ Test application

**Current Status: Step 1 Complete, Starting Step 2**
