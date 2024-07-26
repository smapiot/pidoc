# `pidoc` Changelog

## 0.18.3 (July 26, 2024)

- Updated to latest version of Piral
- Added `imageClass` prop to `ImageCard`

## 0.18.2 (April 26, 2024)

- Fixed usage of `error.stack`
- Reverted to use Flexsearch 0.6 release

## 0.18.1 (April 25, 2024)

- Updated dependencies

## 0.18.0 (March 8, 2024)

- Updated dependencies
- Removed support for Node.js 14 (min version is now 16)
- Added support for most recent version of `typedoc`

## 0.17.0 (June 2, 2023)

- Updated dependencies
- Fixed issue with markdown links using hash properties (#12)
- Added support for reStructuredText (#7)

## 0.16.3 (May 25, 2023)

- Updated dependencies

## 0.16.2 (January 23, 2023)

- Fixed SPA mode on example page
- Fixed issue with `__generated__` folder in npm package
- Updated to Piral 0.15

## 0.16.1 (November 16, 2022)

- Fixed exclude filter
- Added support for AsciiDoc (#6)

## 0.16.0 (September 20, 2022)

- Fixed handling of file extensions (ignore case)
- Improved initial scaffolding of new doclets
- Changed the exported doclet API to be more explicit
- Added new `teardownDoclet` API for doclets

## 0.15.1 (September 19, 2022)

- Fixed issue with shared dependencies on auto doclets via `@pidoc/core`
- Fixed handling of `@pidoc/core` as empty documentation shell

## 0.15.0 (August 31, 2022)

- Fixed issue with no JS robot not showing
- Fixed issue in layout with long version number
- Added adjustable images for dark mode (#8) [@RishiKumarRay]
- Added versioned output as default via `--versioned` (#2)
- Added multi language support (#4)
- Improved `useMenuItems` (#11) [@carvinlo]
- Improved change handlers (#3)

## 0.14.3 (June 23, 2022)

- Fixed missing types in type renderer
- Updated dependencies

## 0.14.2 (January 20, 2022)

- Fixed issue with most recent TypeDoc not showing types
- Removed previously unused styling

## 0.14.1 (January 20, 2022)

- Fixed issue with `publicPath` in Markdown links
- Improved styling of header section

## 0.14.0 (December 22, 2021)

- Added optional dark mode (with auto detection)

## 0.13.4 (December 13, 2021)

- Added `getPageLayout` for backwards compatibility

## 0.13.3 (December 13, 2021)

- Added backwards compatibility support
- Improved exported typings of `pidoc`

## 0.13.2 (December 7, 2021)

- Improved doclet quick fix
- Improved debugging in monorepo
- Added support for `doclet` in *package.json*

## 0.13.1 (December 6, 2021)

- Added `sdk-raw` subcommand
- Fixed issue with long section navigation

## 0.13.0 (November 15, 2021)

- Improved CLI commands (support for flags etc.)
- Added support for templates
- Added types of config
- Added support for `Header` and `SectionNav` component
- Added automatic redirect to first chapter for `/`
- Added option for static files (`staticDir`)
- Added support for Markdown task lists
- Added support for Markdown (arbitrary) file inclusions
- Added dedicated components package `@pidoc/components`
- Renamed `piral-docs-tools` to `@pidoc/core`
- Introduced new `pidoc` package

## 0.12.6 (November 5, 2021)

- Fixed relative paths in Windows

## 0.12.5 (November 5, 2021)

- Fixed checking for `container`
- Added HTML modification during debug

## 0.12.4 (November 4, 2021)

- Fixed missing `relative` import
- Fixed codegen paths on Windows to use posix
- Handle SPA / relative links in Markdown correctly

## 0.12.3 (October 29, 2021)

- Support for webpack with SASS variables
- Improved docs generation
- Added ability to configure the bundler

## 0.12.2 (October 26, 2021)

- Fixed the pilet watch command
- Added aliases for the build commands

## 0.12.1 (October 26, 2021)

- Fixed HTML transformation in emulator build
- Added error output when commands fail

## 0.12.0 (October 24, 2021)

- Removed dependency on `piral-cli-parcel` (now works with any bundler)
- Improved codegen imports to consistently use ESM
- Added CLI commands for building a pilet
- Added auto support for `publicPath` in router

## 0.11.5 (October 22, 2021)

- Fixed issue with empty generated folder
- Introduced write flush optimization

## 0.11.4 (October 22, 2021)

- Improved multiple-pass compiler
- Added `publicPath` to config
- Added `unregister...` APIs

## 0.11.3 (October 21, 2021)

- Fixed issue with doclet generator
- Added template annotation
- Improved standard scaffold template

## 0.11.2 (October 21, 2021)

- Improved dependencies of generated file

## 0.11.1 (October 21, 2021)

- Optimized for single pass code generation before building

## 0.11.0 (October 15, 2021)

- Fixed invalid file filter with includes and excludes
- Improved links
- Updated dependencies
- Changed format of generators

## 0.10.1 (August 25, 2021)

- Added missing modules from `main`

## 0.10.0 (August 24, 2021)

- Added `InfoBar` and `Breadcrumbs` (optional) components
- Improved redirect handling

## 0.9.1 (July 12, 2021)

- Added `skipEditLabel` option to avoid placing the edit label
- Added `sass` field and made SASS variables easier to overwrite
- Added more possibilities of changing the default styles

## 0.9.0 (June 11, 2021)

- Added HTML generator
- Improved HTML and React generator using front matter
- Made changelog optional
- Allow overriding the version
- Allow overriding the last update date

## 0.8.2 (June 10, 2021)

- Fixed styling of TOC
- Fixed multiple search entries
- Improved loading TOC bar
- Improved generator component order

## 0.8.1 (June 10, 2021)

- Improved styling
- Fixed issue in hash hook
- Added React generator

## 0.8.0 (June 9, 2021)

- Fixed scaffolding issues
- Enhanced pilet generator

## 0.7.1 (June 9, 2021)

- Added `layouts` option
- Added `registerSearchProvider` API
- Improved generated dev dependencies

## 0.7.0 (June 8, 2021)

- Fixed missing `app` field
- Improved SDK creation
- Added draft for pilet codegen

## 0.6.2 (June 2, 2021)

- Fixed missing plugins
- Re-export type of `PiletApi`

## 0.6.1 (June 2, 2021)

- Added doclet API
- Restructured sitemap

## 0.6.0 (June 1, 2021)

- Added `styles` option
- Extended markdown with div syntax
- Improved content page

## 0.5.3 (May 31, 2021)

- Allow HTML in markdown
- Extended markdown with attribute helper
- Added `sorting` option to standard generators

## 0.5.2 (May 31, 2021)

- Included `setup` helper
- Added `sdk` build

## 0.5.1 (May 28, 2021)

- Refactored route system
- Use `sass:math` module for calculations

## 0.5.0 (May 28, 2021)

- Restructured configuration
- Declared more peer dependencies
- Use Piral for dynamic documentation

## 0.4.1 (May 27, 2021)

- Fixed issue with version codegen
- Added optional `filterFile` for filtering the sitemap
- Improved types
- Improved meta generation

## 0.4.0 (May 25, 2021)

- Fixed invalid markdown content
- Added `watch` command
- Extracted `Footer` and `Logo`

## 0.3.1 (May 25, 2021)

- Fixed issues in types and sitemap

## 0.3.0 (May 24, 2021)

- Defined initial generators
- Define tooling package

## 0.2.0 (May 22, 2021)

- Working draft release

## 0.1.0 (May 17, 2021)

- Initial draft release
