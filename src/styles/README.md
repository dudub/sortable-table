# Color System Documentation

This directory contains the centralized color management system for the Sortable Table application.

## Files

### `colors.css`
The main color system file that defines all color variables used throughout the application.

## Usage

### Importing Colors
The color system is automatically imported in `src/index.css` and available throughout the application:

```css
@import './styles/colors.css';
```

### Color Categories

#### Primary Colors
- `--color-primary`: Main brand color (#646cff)
- `--color-primary-hover`: Hover state for primary color (#535bf2)
- `--color-primary-light`: Light variant for light mode (#747bff)

#### Secondary Colors
- `--color-secondary`: React logo color (#61dafb)
- `--color-secondary-alpha`: React logo with transparency

#### Warning/Alert Colors
- `--color-warning`: Warning color (#ffc107)
- `--color-warning-hover`: Warning hover state (#e0a800)
- `--color-warning-light`: Light warning background (#fff3cd)

#### Gray Scale
- `--color-gray-50` to `--color-gray-900`: Complete gray scale palette
- Use for backgrounds, borders, and neutral elements

#### Text Colors
- `--color-text-primary`: Main text color (adapts to light/dark mode)
- `--color-text-primary-dark`: Dark mode text color
- `--color-text-muted`: Muted text color

#### Background Colors
- `--color-bg-primary`: Main background (adapts to light/dark mode)
- `--color-bg-primary-dark`: Dark mode background
- `--color-bg-info`: Information card background
- `--color-bg-info-light`: Light information background

### Semantic Color Aliases

For better maintainability, use semantic aliases instead of raw color variables:

#### Buttons
```css
.my-button {
  background-color: var(--color-button-primary);
}

.my-button:hover {
  background-color: var(--color-button-primary-hover);
}
```

#### Links
```css
.my-link {
  color: var(--color-link);
}

.my-link:hover {
  color: var(--color-link-hover);
}
```

#### Tables
```css
.table-header {
  background-color: var(--color-table-header);
}

.table-cell {
  border: 1px solid var(--color-table-border);
}
```

#### Cards/Panels
```css
.info-card {
  background-color: var(--color-card-info);
}

.warning-card {
  background-color: var(--color-card-warning);
}
```

## Dark Mode Support

The color system automatically adapts to the user's preferred color scheme:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-text-primary: rgba(255, 255, 255, 0.87);
    --color-bg-primary: #242424;
  }
}
```

## Adding New Colors

When adding new colors:

1. Add the base color to the appropriate section in `colors.css`
2. Create semantic aliases if the color will be used for specific UI elements
3. Consider dark mode variants if necessary
4. Update this documentation

### Example:
```css
/* Add to colors.css */
:root {
  /* Success Colors */
  --color-success: #28a745;
  --color-success-hover: #218838;
  --color-success-light: #d4edda;
}

/* Semantic aliases */
:root {
  --color-button-success: var(--color-success);
  --color-button-success-hover: var(--color-success-hover);
  --color-card-success: var(--color-success-light);
}
```

## Best Practices

1. **Always use CSS variables** instead of hardcoded color values
2. **Use semantic aliases** when possible for better maintainability
3. **Consider accessibility** - ensure sufficient contrast ratios
4. **Test in both light and dark modes** when adding new colors
5. **Group related colors** logically in the CSS file
6. **Document new color additions** in this README

## Migration from Inline Styles

When refactoring components that use inline styles:

1. Identify all color values used in the component
2. Map them to existing CSS variables or create new ones if needed
3. Create a dedicated CSS file for the component
4. Replace inline styles with CSS classes
5. Import the CSS file in the component

This approach improves maintainability, performance, and enables better theming support.
