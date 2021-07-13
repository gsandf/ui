# @gsandf/ui

> ⚡ A simple set of UI development helpers for React projects

## Install

Using [Yarn]:

```bash
$ yarn add @gsandf/ui react react-dom styled-components@^5.3.0
```

…or using [npm]:

```bash
$ npm i --save @gsandf/ui react react-dom styled-components@^5.3.0
```

### Setup Theme

If you plan to use the [components](#components), most require a `ThemeProvider` be set up.

You can do this easily using the default theme. For example:

```tsx
import { createTheme, defaultTheme } from '@gsandf/ui';
import { ThemeProvider } from 'styled-components';

const theme = createTheme({ ...defaultTheme });
const GlobalStyles = theme.styles;

export default function App({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />

      {children}
    </ThemeProvider>
  );
}
```

To see how to customize the theme, check out the [Theme](#theme) section.

## Components

### Controls

- [`<Button />`](https://github.com/gsandf/ui/blob/main/src/components/Button/index.tsx) - A simple button component with basic default styles

### Layout

- [`<AspectRatio />`](https://github.com/gsandf/ui/blob/main/src/components/Layout/AspectRatio.tsx) - A `<Box />` with a fixed width/height ratio
- [`<BasicGrid />`](https://github.com/gsandf/ui/blob/main/src/components/Layout/BasicGrid.tsx) - A basic grid component that distributes its children evenly
- [`<Box />`](https://github.com/gsandf/ui/blob/main/src/components/Layout/Box.tsx) - A simple box. By default, it renders a `<div />`.
- [`<Center />`](https://github.com/gsandf/ui/blob/main/src/components/Layout/Center.tsx) - A `<Flex />` with flex properties set to center content.
- [`<Container />`](https://github.com/gsandf/ui/blob/main/src/components/Layout/Container.tsx) - Constrains content width with a default max size
- [`<Flex />`](https://github.com/gsandf/ui/blob/main/src/components/Layout/Flex.tsx) - A box with `display: flex`
- [`<Hide />`](https://github.com/gsandf/ui/blob/main/src/components/Layout/Hide.tsx) - Helper to set `display: none` based on a media query
- [`<NoServerRender />`](https://github.com/gsandf/ui/blob/main/src/components/Layout/NoServerRender.tsx) - Renders its children only on the client after hydration.
- [`<ScreenReaderContent />`](https://github.com/gsandf/ui/blob/main/src/components/Layout/ScreenReaderContent.tsx) - Hides content visually but remains accessible to screen readers.
- [`<Stack />`](https://github.com/gsandf/ui/blob/main/src/components/Layout/Stack.tsx) - `Stack` is a `Flex` with helpers to add spacing between elements. The default direction is a column.
- [`<HStack />`](https://github.com/gsandf/ui/blob/main/src/components/Layout/Stack.tsx) - `HStack` is a `Flex` with helpers to add spacing between elements. It lays out its children horizontally and centers them vertically.
- [`<VStack />`](https://github.com/gsandf/ui/blob/main/src/components/Layout/Stack.tsx) - `VStack` is a `Flex` with helpers to add spacing between elements. It lays out its children vertically and centers them horizontally.

### Typography

- [`<Text />`](https://github.com/gsandf/ui/blob/main/src/components/Text/index.tsx) - Render text. It accepts all theme mixins as props, has helpers for truncating text, and by default retains newlines (for rendering text from an API response).

## Hooks

### [`useBreakpoint()`](https://github.com/gsandf/ui/blob/main/src/hooks/useBreakpoint.ts)

Returns the name of the current breakpoint. If `breakpointFilter` is given, returns the name of the largest breakpoint that matches the current window.

```tsx
function BasicUsage() {
  const breakpoint = useBreakpoint();

  return <div>The current breakpoint is {breakpoint}</div>;
}
```

```tsx
function WithFilteredBreakpoints() {
  const breakpoint = useBreakpoint(['md', 'xxl']);

  return (
    <div>
      Of `base`, `md`, and `xxl`, the current breakpoint is {breakpoint}
    </div>
  );
}
```

### [`useBreakpointValue()`](https://github.com/gsandf/ui/blob/main/src/hooks/useBreakpointValue.ts)

Returns a value based on the current window size.

```tsx
function BasicUsage() {
  const bgColor = useBreakpointValue({
    base: 'gray900',
    sm: 'gray700',
    md: 'gray600',
    lg: 'gray400',
    xl: 'gray200',
    xxl: 'gray100'
  });

  const fgColor = useBreakpointValue({
    base: 'black',
    lg: 'white'
  });

  return (
    <Center $bgColor={bgColor} $color={fgColor}>
      Adjust the screen size!
    </Center>
  );
}
```

### [`useClickedOutside()`](https://github.com/gsandf/ui/blob/main/src/hooks/useClickedOutside.ts)

Handles click events outside a DOM element, like a `div`. A handler function is invoked when a click or touch event happens outside the referenced element.

```tsx
function Example() {
  const containerRef = useRef(null);
  useClickedOutside(containerRef, () => alert('clicked outside'));

  return (
    <Center>
      <VStack>
        <Box ref={containerRef}>
          Click outside this box to trigger an alert!
        </Box>
      </VStack>
    </Center>
  );
}
```

### [`useDebouncedState()`](https://github.com/gsandf/ui/blob/main/src/hooks/useDebouncedState.ts)

Saves a value like `useState`, but delays setting the value until `delay` milliseconds has passed.

```tsx
function Example() {
  const [triggerCount, setTriggerCount] = useDebouncedState(0);

  const incrementTriggerCount = () => {
    setTriggerCount(n => n + 1);
  };

  useEffect(() => {
    document.addEventListener('mousemove', incrementTriggerCount);

    return () => {
      document.removeEventListener('mousemove', incrementTriggerCount);
    };
  });

  return <div>Times triggered: {triggerCount}</div>;
}
```

### [`useLocalStorage()`](https://github.com/gsandf/ui/blob/main/src/hooks/useLocalStorage.ts)

Saves a value in `localStorage` so it can be persisted between page refresh. This hook is used similar to `useState`, but the first argument is the key used to save/lookup the value in `localStorage`.

If `localStorage` isn't available - such as during a server render - the initial value will be returned.

```tsx
function Example() {
  const [value, setValue] = useLocalStorage('exampleKey', 0);

  return (
    <div>
      <Box>Value stored in localStorage: {value}</Box>

      <HStack>
        <Button onClick={() => setValue(value => value - 1)}>-</Button>
        <Button onClick={() => setValue(0)}>Reset</Button>
        <Button onClick={() => setValue(value => value + 1)}>+</Button>
      </HStack>
    </div>
  );
}
```

### [`useMediaQuery()`](https://github.com/gsandf/ui/blob/main/src/hooks/useMediaQuery.ts)

Detects when a media query matches the current window.

```tsx
function Example() {
  const isLargerThan1000 = useMediaQuery('(min-width: 1000px)');

  return (
    <Box>
      Is the screen at least 1000px wide? {isLargerThan1000 ? 'yes' : 'no'}
    </Box>
  );
}
```

### [`useModalCloseEvent()`](https://github.com/gsandf/ui/blob/main/src/hooks/useModalCloseEvent.ts)

Calls the given `onClose` function when a common event outside a modal should trigger a close. For example, this can handle when the Escape key is pressed and when the modal is clicked outside.

```tsx
function ExampleModal({ onClose }) {
  const containerRef = useRef(null);

  useModalCloseEvent(onClose, containerRef);

  return (
    <VStack ref={containerRef}>
      <Box>
        This modal will close if the escape key is pressed or if clicked outside
        of.
      </Box>
    </VStack>
  );
}
```

## Theme

A theme is an object that follows a certain shape. The idea for the shape was originally taken from the [System UI](https://system-ui.com/theme) theme specification. Most of the theme shouldn't rely on a certain build system, framework, etc.

For the most part, we've kept the same ideas, but we allow relying on certain styling ideas (e.g. media queries, global styles, component styles) that may rely on certain tools being available.

Here's the interface for a theme:

```ts
interface CustomTheme {
  borders?: Record<string, CSSProperties['border']>;
  breakpoints?: Record<string, number>;
  colors?: Record<string, CSSProperties['backgroundColor']>;
  components?: ComponentStyles;
  fonts?: Record<string, CSSProperties['fontFamily']>;
  fontSizes?: CSSProperties['fontSize'][];
  fontWeights?: Record<string, CSSProperties['fontWeight']>;
  lineHeights?: Record<string, CSSProperties['lineHeight']>;
  radii?: Record<string, CSSProperties['borderRadius']>;
  shadows?: Record<string, CSSProperties['boxShadow']>;
  sizes?: Record<string | number, string>;
  space?: (string | number)[] | Record<string | number, string>;
  styles?: GlobalStyleComponent<unknown, unknown> | (() => ReactElement);
  transitions?: GlobalStyleComponent<unknown, CSSProperties['transition']>;
  zIndices?: Record<string, CSSProperties['zIndex']>;
}

export type ComponentStyles = Record<
  string,
  {
    baseStyle?: CSSProp<unknown>;
    variants?: Record<string, CSSProp<unknown>>;
  }
>;
```

### `defaultTheme`

A base reference theme that can be expanded easily.

```ts
import { defaultTheme } from '@gsandf/ui';
```

### `createTheme(themeObject)`

Takes a theme object and extends it with `media` and `mixins` to it. `media` is a set of CSS breakpoint helpers. `mixins` are a set of utilities for making flexible styled components.

```ts
import { defaultTheme } from '@gsandf/ui';

const coolWebsiteTheme = {
  ...defaultTheme,
  colors: {
    primary: '#f00',
    onPrimary: '#fff',
    secondary: '#ff0',
    onSecondary: '#000',
    transparent: 'transparent',
    white: '#ffffff'
  },
  fonts: {
    body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    heading:
      'Roboto Condensed, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    monospace: 'IBM Plex Mono, Menlo, monospace'
  },
  lineHeights: {
    body: 1.7,
    control: 1.2,
    heading: 1.2
  },
  shadows: {
    default: `0 0 2px 0 #00000004`
  }
};

const theme = createTheme(coolWebsiteTheme);
```

## Utilities

- `isServer` / `isBrowser` - booleans for checking if the current rendering environment is on the server or in a browser.
- `ensureUnit(value, unit)` - Makes sure a given value has a unit at the end. The default unit is `px`. Also accepts an array of values.
- `noop()` - Empty function
- `omit(object, key)` - Shallow omit a property from an object
- `type StyledComponentProps<T>` - Helper to extract type of props from a Styled Component.

## Contributing

[Node.js] and [Yarn] are required to work with this project.

To install all dependencies, run:

```bash
yarn
```

Then, you can start Storybook to test changes:

```bash
yarn dev
```

See below for other scripts.

### Useful Commands

|                     |                                                                             |
| ------------------- | --------------------------------------------------------------------------- |
| `yarn build`        | Builds the project to `./dist`                                              |
| `yarn dev`          | Starts the Storybook server                                                 |
| `yarn test`         | Run project tests                                                           |
| `yarn test --watch` | Run project tests, watching for file changes                                |
| `yarn type-check`   | Check the project for TypeScript errors                                     |
| `yarn validate`     | Runs tests, checks formatting, lints code, and checks for TypeScript errors |

## License

UNLICENSED

[node.js]: https://nodejs.org/
[yarn]: https://yarnpkg.com/en/docs/
