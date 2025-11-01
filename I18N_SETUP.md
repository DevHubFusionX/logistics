# Internationalization (i18n) Setup

## Structure

```
src/i18n/
├── index.js       # i18n utility functions
└── en.json        # English translations
```

## Usage

```javascript
import { t } from '../i18n'

// Use in components
<option>{t('common.allLocations')}</option>
```

## Adding New Languages

1. Create new translation file: `src/i18n/fr.json`
2. Import in `src/i18n/index.js`:
   ```javascript
   import fr from './fr.json'
   const translations = { en, fr }
   ```
3. Switch language: `setLocale('fr')`

## Example Implementation

PageHeader.jsx has been updated as a reference implementation.

## Next Steps

1. Extract all hardcoded strings to translation files
2. Add more language files (fr.json, es.json, etc.)
3. Add language switcher component
4. Store user language preference in localStorage
5. Consider using react-i18next for advanced features
