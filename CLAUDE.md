# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**mlightcad/cad-viewer** is a browser-based DXF/DWG viewer and editor. It operates entirely in-browser without backend services, performing DWG/DXF parsing, geometry processing, and rendering directly in the browser using WebGL.

Key differentiator: One-click export to a single, self-contained HTML file with embedded viewer runtime (pan/zoom, layers, distance measure, offline capability).

## Tech Stack

- **Package Manager**: pnpm@10.33.4 (monorepo workspace)
- **Build Tool**: Vite (library and app builds), rollup plugins
- **Rendering**: THREE.js (3D/WebGL), custom shader materials, geometry batching
- **Language**: TypeScript (strict mode), Vue 3 SFC for UI components
- **Testing**: Jest (ts-jest preset), Playwright for E2E
- **Linting/Formatting**: ESLint (flat config), Prettier
- **Monorepo Tool**: Nx (with target defaults for caching and dependency tracking)
- **Code Generation**: typedoc for API documentation

### Node/Runtime Requirements

- Node.js >= 24
- pnpm >= 10

## Monorepo Structure

This is a pnpm workspace monorepo with ~10 packages in `/packages`. Key packages:

### Core Libraries (Published)

- **@mlightcad/cad-simple-viewer**: Minimal, framework-agnostic CAD viewer core. ESM and UMD formats. Depends on three-renderer, cad-html-exporter.
- **@mlightcad/cad-viewer**: Full-featured viewer with Vue 3 + Element Plus UI. Wraps cad-simple-viewer with command registry, property panels, ribbon UI.
- **@mlightcad/cad-html-exporter**: Exports CAD drawings as self-contained offline HTML via dual vite builds: main library + viewer-runtime.iife.js.
- **@mlightcad/three-renderer** (private): THREE.js rendering engine with shader materials, geometry batching, hatch patterns.
- **@mlightcad/svg-renderer** (private): SVG export renderer.

### ECM Integration

- **@mlightcad/ecm-viewer** (`packages/ecm-viewer`): Standalone document viewer package for ECM (Enterprise Content Management) systems. Independent package in the monorepo, intended for integration with DMS/ECM platforms. Extends the viewer capabilities for enterprise document management workflows.

### Examples & Tools

- **@mlightcad/cad-viewer-example**: Full Vue 3 demo app showcasing cad-viewer.
- **@mlightcad/cad-simple-viewer-example**: Minimal demo for cad-simple-viewer.
- **@mlightcad/cad-html-exporter-cli**: CLI tool (Node.js + Playwright) for command-line DXF/DWG to HTML export.
- **@mlightcad/examples**: Static assets and example files (vite-preview host).
- **@mlightcad/cad-pdf-plugin**: PDF export plugin (optional peer dependency).

### Utilities & Support

- `/tools`: Release and version sync scripts (release.mjs, sync-versions.mjs).
- `/test/mocks`: Jest mocks for THREE.js modules.

## Available Commands

Run all commands from the root with `pnpm`:

### Development

```bash
pnpm dev              # Start full-featured viewer dev server
pnpm dev:simple       # Start minimal viewer dev server
pnpm preview          # Preview production build (full-featured viewer)
pnpm preview:simple   # Preview production build (simple viewer)
```

### Building

```bash
pnpm build            # Build all packages (nx run-many -t build)
pnpm clean            # Clean all dist/ and tsconfig.tsbuildinfo files
pnpm analyze          # Bundle analysis (vite build --mode analyze)
```

### Testing & Linting

```bash
pnpm test             # Run all Jest tests (node test environment)
pnpm test:e2e         # Run Playwright E2E tests on cad-viewer-example
pnpm test:e2e:headed  # Run E2E tests with browser visible
pnpm test:e2e:ui      # Run E2E tests with interactive UI

pnpm lint             # Run ESLint on all packages
pnpm lint:fix         # Fix ESLint issues
pnpm format           # Format code with Prettier (ts, js, vue, json)
```

### Publishing & Documentation

```bash
pnpm doc              # Generate TypeDoc API documentation
pnpm export:html      # Build html-exporter-cli and export sample DXF to HTML
pnpm export:html:run  # Run html-exporter-cli directly
pnpm publish:viewer   # Publish cad-viewer and cad-simple-viewer
pnpm release          # Run semantic release (tools/release.mjs)
pnpm sync:versions    # Sync versions across monorepo (tools/sync-versions.mjs)
```

### Running Single Tests

```bash
# Run tests in a specific package
pnpm --filter @mlightcad/cad-simple-viewer test -- AcApDocManagerFontUrl

# Run tests matching a pattern
pnpm test -- --testNamePattern="your test name"

# Run with coverage
pnpm test -- --coverage
```

## Architecture & Key Patterns

### Modular Rendering Pipeline

The viewer uses a **plugin-based architecture** for extensibility:

1. **Data Layer**: @mlightcad/data-model (external) parses DXF/DWG into unified entity model via LibreDWG converter.
2. **Renderer Abstraction**: Two independent renderers implement the same interface:
   - **THREE.js Renderer** (three-renderer): WebGL-based, shader materials, geometry batching, instancing.
   - **SVG Renderer** (svg-renderer): For SVG export.
3. **Viewer Core** (cad-simple-viewer): Orchestrates file loading, rendering, selection, snapping, spatial indexing (R-tree via rbush), command execution.
4. **UI Layer** (cad-viewer): Adds Vue 3 components (Element Plus), ribbon UI, property panels.

### Command System

Commands follow AutoCAD-style design:

- **Command Registry**: AcApPluginManager in cad-simple-viewer registers commands.
- **Command Interface**: Extend AcApCommand with execute() method.
- **Plugin Lifecycle**: AcApPlugin base class; lazy loading via AcApLazyPluginRegistration.
- **Built-in Commands**: Pan, Zoom, Select, Delete, drawing tools (Line, Circle, Arc, Polyline, Spline, Rectangle, Hatch), measurements (Distance, Area, Angle), layer/property management.

Examples: /packages/cad-viewer/src/command/ (Vue-wrapped) and /packages/cad-simple-viewer/src/command/ (core).

### View Management

- **Scene Graphs**: THREE.js Group hierarchy per layer/layout (model space + paper space).
- **Material Batching**: Merges geometries with identical materials into single BufferGeometry.
- **Spatial Indexing**: R-tree (rbush) for fast entity lookup during selection.
- **Layer System**: AcApLayerManager tracks visibility; renderer updates scene on changes.

### File Export (HTML)

The HTML exporter (cad-html-exporter) creates a snapshot:

1. Collects all THREE.js geometries and materials.
2. Encodes scene as JSON snapshot.
3. Bundles with lightweight viewer runtime (viewer-runtime.iife.js).
4. Compresses with fflate and embeds in single .html file.
5. Recipient opens HTML → full interactivity offline (pan, zoom, layers, measure).

### Spatial Indexing & Selection

- Uses **rbush** (R-tree) for efficient 2D spatial queries.
- Selection modes (box, crossing, window) query tree for entities within bounds.
- Snapping (OSNAP) supports Endpoint, Midpoint, Nearest, Center via geometry utilities.

## Code Organization

### cad-simple-viewer Source Layout

```
src/
  app/                    # Core managers (DocManager, Context, SettingManager, FontLoader)
  command/                # Core command implementations (Pan, Zoom, Select, Delete, drawing tools)
  editor/                 # Entity editing framework (move, rotate, scale, grip points)
  plugin/                 # Plugin registration and lifecycle
  view/                   # Rendering orchestration (THREE.js scene management)
  spatialIndex/           # R-tree spatial indexing utilities
  util/                   # Geometry, color, string utilities
  i18n/                   # Internationalization (Chinese, English, Portuguese)
```

### cad-viewer Source Layout

```
src/
  app/                    # App-level state and setup
  command/                # UI-aware command implementations (ribbon controls, dialogs)
  component/              # Vue SFC components (dialogs, panels, toolbars, color pickers)
  composable/             # Vue composables (reusable state/logic)
  locale/                 # Vue i18n translations
  style/                  # Global styles and themes
  types/                  # TypeScript interfaces and enums
```

## Build & Dependency Management

### Vite Configuration

- **Library Mode**: Each package uses vite build in library mode with rollup-plugin-peer-deps-external.
- **Worker Support**: Vite handles web workers automatically (libredwg-parser-worker.js, mtext-renderer-worker.js).
- **Static Copy**: vite-plugin-static-copy copies worker files and runtime assets to output.

### Dependency Overrides (Root pnpm Config)

Root package.json specifies pinned versions across workspace for consistency (data-model, libredwg-converter, three, vue, element-plus, etc.).

### Nx Caching

Nx caches build artifacts. nx.json defines targetDefaults where build tasks depend on dependencies' builds with caching enabled. Use `nx run-many -t build --skip-nx-cache` to bypass cache.

## Testing

### Jest Configuration

- **Test Environment**: Node (not jsdom; rendering is mocked).
- **Transform**: ts-jest for TypeScript; babel for JS.
- **Module Mapper**: Mocks THREE.js loaders and renderers.
- **Ignore Patterns**: Excludes packages/dxf-json/ and /e2e/.

### E2E Testing

- **Framework**: Playwright (in cad-viewer-example).
- **Fixtures**: Sample DXF files in packages/cad-viewer-example/e2e/fixtures/.

### Running Tests by Package

```bash
pnpm --filter @mlightcad/cad-html-exporter test -- AcExHtmlI18n
pnpm --filter @mlightcad/cad-simple-viewer test -- AcApDocManagerFontUrl
```

## Code Style & Standards

### TypeScript

- **Strict Mode**: Yes (strict: true, strictNullChecks, noUnusedLocals, noUnusedParameters).
- **Emit**: .d.ts declaration maps for debugging.

### ESLint Configuration

- **Parser**: @typescript-eslint/parser for TS/JSX.
- **Vue Support**: vue-eslint-parser with TypeScript in <script lang="ts">.
- **Key Plugins**:
  - simple-import-sort: Consistent import ordering.
  - @intlify/vue-i18n: Validates i18n keys (no dynamic keys, no unused keys).
  - @typescript-eslint: Strict rules, no unused vars (with pattern ignores).
- **Quotes**: Single quotes enforced.

### Prettier Configuration

- Semi: false
- Tab Width: 2 spaces
- Print Width: 80
- Trailing Comma: none
- Arrow Parens: avoid

### Pre-commit Hooks

lint-staged runs on commit: *.{ts,js,vue} get prettier + eslint, *.md gets prettier.

## CI/CD Pipeline

### GitLab CI

Stages:

1. **ci**: Lint, build, test on every push to main or MR.
2. **deploy**: Build, generate docs (typedoc), pre-serve examples (outputs to public/).
3. **pages**: Deploy public/ to GitLab Pages.

All stages use Node 20, pnpm 10.33.4, cached node_modules.

## Important Notes for Contributors

### Known Limitations

- **DWG Table Entities**: Not supported (LibreDWG limitation).
- **XRefs**: External references not supported.
- **DWG Compatibility**: Some drawings fail due to LibreDWG bugs.
- **Tianzheng CAD**: Drawings must be converted to T3 format first.

### Plugin Extension Points

Add custom commands:

1. Extend AcApCommand with execute() method.
2. Register via AcApPluginManager.registerCommand().
3. Optionally wrap in AcApLazyPluginRegistration for lazy loading.

Custom renderers:

1. Implement renderer interface (see three-renderer/src/ for reference).
2. Initialize with scene, layer manager, entity data.

### Performance Optimization Techniques

- **Geometry Batching**: Merges entities with same material.
- **Instanced Rendering**: Repeats geometries efficiently.
- **Shader Materials**: GPU-accelerated line types and hatches.
- **Spatial Indexing**: R-tree for fast entity selection.
- **Material Caching**: Reuses materials across similar entities.
- **WebGL Optimization**: Leverages modern WebGL features.

### Internationalization (i18n)

- **Library**: vue-i18n
- **Locales**: English (en), Simplified Chinese (zh), Portuguese (pt)
- **Location**: /packages/cad-viewer/src/locale/ and /packages/cad-simple-viewer/src/i18n/
- **ESLint Validation**: Enforces no dynamic keys and no unused keys.

## Release & Publishing

### Version Management

Monorepo uses workspace protocol (workspace:* in package.json).

- `pnpm sync:versions` syncs all package versions to root version.
- `pnpm release` runs semantic release (see tools/release.mjs).

### Publishing

Only cad-viewer and cad-simple-viewer are published:

```bash
pnpm publish:viewer  # Publishes to npm
```

## Roadmap Highlights

Major in-progress features include file version compatibility, handle/object ID management, viewport support, LOD rendering, text/dimension entities, and undo/redo system. See README.md for full details.

## Repository Links

- **GitHub**: https://github.com/mlightcad/cad-viewer
- **Live Demo**: https://mlightcad.github.io/cad-viewer/
- **API Docs**: https://mlightcad.github.io/cad-viewer/docs/
- **Wiki**: https://github.com/mlightcad/cad-viewer/wiki
