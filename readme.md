# Vue Dynamic Translations

## Overview

Vue Dynamic Translations is a powerful Vue.js plugin that enables dynamic and flexible translation management for your applications. It provides an intuitive way to handle translations with support for runtime language switching, nested translations, and easy integration.

## Features

- 🌐 Dynamic language switching
- 🚀 Lightweight and performant
- 📦 Easy integration with Vue applications
- 🔍 Support for nested translation keys
- 💻 Compatible with Vue 2 and Vue 3
- 🌈 Flexible translation management

## Installation

### npm
```bash
npm install vue-dynamic-translations
```

### Yarn
```bash
yarn add vue-dynamic-translations
```

## Usage

### Basic Setup

```javascript
import Vue from 'vue'
import VueDynamicTranslations from 'vue-dynamic-translations'

const translations = {
  en: {
    greeting: 'Hello, {name}!',
    welcome: 'Welcome to our app'
  },
  es: {
    greeting: '¡Hola, {name}!',
    welcome: 'Bienvenido a nuestra aplicación'
  }
}

Vue.use(VueDynamicTranslations, {
  translations,
  defaultLanguage: 'en'
})
```

### In Component

```vue
<template>
  <div>
    {{ $t('greeting', { name: 'John' }) }}
    {{ $t('welcome') }}
  </div>
</template>
```

## API

### Global Methods

- `$t(key, params?)`: Translate a given key with optional parameters
- `$setLanguage(languageCode)`: Change the current language
- `$getCurrentLanguage()`: Get the current active language

### Configuration Options

| Option | Type | Description | Default |
|--------|------|-------------|---------|
| `translations` | Object | Translation dictionary | `{}` |
| `defaultLanguage` | String | Fallback language code | `'en'` |
| `fallbackLanguage` | String | Secondary fallback language | `'en'` |

## Advanced Usage

### Nested Translations

```javascript
const translations = {
  en: {
    user: {
      profile: {
        name: 'Name',
        email: 'Email Address'
      }
    }
  }
}

// Usage
{{ $t('user.profile.name') }}
```

### Dynamic Parameters

```vue
<template>
  {{ $t('welcome', { username: 'Alice', count: 5 }) }}
</template>
```

## Typescript Support

The package includes TypeScript definitions for enhanced type checking and IDE support.

## Browser Support

- Modern browsers
- Vue 2.6+
- Vue 3.x

## Contributing

Contributions are welcome! Please see our [Contributing Guidelines](CONTRIBUTING.md) for more details.

## License

MIT License

## Sponsors

[Your Company/Sponsor Logo]

## Star History

[Star History Chart]

## Author

[Your Name/Organization]

## Support

For issues, feature requests, or support, please open an issue on our GitHub repository.