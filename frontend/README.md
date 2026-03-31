# SCORM Course Template with React 19, Tailwind CSS 3, and shadcn/ui

A modern, production-ready template for creating SCORM-compliant e-learning courses using React 19, TypeScript, Vite, Tailwind CSS 3, and shadcn/ui components.

## ✨ Features

- **SCORM 1.2 & 2004 Ready**: Full SCORM API integration with automatic initialization (Pipwerks SCORM API Wrapper as base)
- **Modern Stack**: Built with React 19, TypeScript, and Vite for optimal performance
- **UI**: Tailwind CSS 3 and shadcn/ui components
- **Responsive Design**: Works on all device sizes
- **Production Build**: Optimized builds with Vite
- **SCORM Package Generation**: Automated SCORM package creation with gulp and SCO Packager
- **Environment Configuration**: Easy configuration through environment variables

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm 9+
- Git (for version control)

### Installation

1. Clone the repository:

   ```bash
   git clone link-of-repository.git
   cd your-repository
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

## 🛠 Development & Build Scripts

This project provides multiple scripts for different environments and use cases:

### 📋 Available Scripts

| Script                     | Environment | SCORM       | Debug | Use Case                                 |
| -------------------------- | ----------- | ----------- | ----- | ---------------------------------------- |
| `npm run dev`              | Development | ❌ Disabled | ❌    | Local development without SCORM          |
| `npm run scorm-dev`        | Development | ✅ Enabled  | ❌    | Local development with SCORM simulation  |
| `npm run scorm-prod`       | Production  | ✅ Enabled  | ❌    | Production SCORM package for LMS         |
| `npm run scorm-prod-debug` | Production  | ✅ Enabled  | ✅    | Production SCORM package with debug logs |

### 🎯 Usage Examples

#### 1. **Standalone Development** (No SCORM)

```bash
npm run dev
```

- **Perfect for**: UI/UX development, component testing
- **Features**: Fast hot reload, no SCORM overhead
- **SCORM**: Disabled (uses localStorage fallback)
- **Output**: Development server at `localhost:5173`

#### 2. **SCORM Development** (Local Testing)

```bash
npm run scorm-dev
```

- **Perfect for**: Testing SCORM integration locally
- **Features**: SCORM context with simulation, no real LMS needed
- **SCORM**: Enabled but simulated (no real connection)
- **Output**: Development server with SCORM context

#### 3. **Production SCORM Package** (For LMS)

```bash
npm run scorm-prod
```

- **Perfect for**: Final package for Learning Management System
- **Features**: Optimized build, SCORM packaging, no debug logs
- **SCORM**: Enabled with real LMS connection
- **Output**: `dist/scorm-package.zip` ready for upload

#### 4. **Production SCORM with Debug** (For LMS Testing)

```bash
npm run scorm-prod-debug
```

- **Perfect for**: Debugging SCORM issues in production LMS
- **Features**: Production build + detailed console logs
- **SCORM**: Enabled with real LMS connection + debug logs
- **Output**: `dist/scorm-package.zip` with debug enabled

### 🔧 Environment Information

Check current environment settings:

```bash
npm run env
```

This shows:

- Current NODE_ENV
- SCORM status (enabled/disabled)
- Debug mode status
- Active environment file

## 🎨 Working with the Template

This template includes two main working areas for different purposes:

### 📋 Development Area (Development Mode)

Access these routes when running `npm run dev` or `npm run scorm-dev`:

- **`/`** - Main documentation and setup guide
- **`/debug-scorm`** - SCORM API testing and debugging tools
- **`/components`** - Component library and examples
- **`/components/sidebar`** - Sidebar component documentation
- **`/template`** - Template working area (same as production)

### 🎯 Customization Area (Production Mode)

When working on your actual course content:

- **Development**: Access `/template` in development mode
- **Production**: Your course becomes the main content at `/`

This separation allows you to:

- **Develop components** in the dedicated area
- **Test SCORM functionality** with debug tools
- **Work on course content** separately
- **Preview production behavior** immediately

### 🔄 Workflow

1. **Development Phase**:

   ```bash
   npm run dev
   # Access /template to work on course content
   ```

2. **Component Testing**:

   ```bash
   npm run dev
   # Access /components to test UI components
   ```

3. **SCORM Testing**:

   ```bash
   npm run scorm-dev
   # Access /debug-scorm to test SCORM integration
   ```

4. **Production Build**:
   ```bash
   npm run scorm-prod
   # Your course content becomes the main application
   ```

## 🔧 Environment Configuration

This project uses environment variables for configuration. The following files are used:

1. `.env` - Main environment variables. Useful for any configuration that should be the same in all environments.
2. `.env.production` - Production-specific overrides. For configuration that should be used in production environment.
3. `.env.production.debug` - Production-debug-specific overrides. For configuration that should be used in production environment to debug.

### Available Environment Variables

#### SCORM Package and Meta tags Configuration

- `VITE_COURSE_TITLE` - The title of your SCORM course
- `VITE_COURSE_DESCRIPTION` - Description of the course
- `VITE_COURSE_KEYWORDS` - Comma-separated list of keywords
- `VITE_COURSE_DURATION` - Typical duration in ISO 8601 format (e.g., "PT0H30M0S" for 30 minutes)
- `VITE_COURSE_AUTHOR` - Author name
- `VITE_COURSE_ORGANIZATION` - Organization name

#### Build Configuration

- `VITE_DIST_BUILD` - Output directory for the built files (default: 'static-site')
- `VITE_APP_WITHOUT_SCORM` - Control SCORM activation (true = disabled, false = enabled)
- `VITE_ENABLE_SCORM_DEBUG_PROD` - Enable debug logs in production SCORM builds

## 🛠 Development

### Available Scripts

- `npm run dev` - Start development server without SCORM
- `npm run scorm-dev` - Start development server with SCORM simulation
- `npm run scorm-prod` - Build and package SCORM for production
- `npm run scorm-prod-debug` - Build and package SCORM with debug logs
- `npm run env` - Show current environment information

## 🔄 SCORM Initialization & Development

### 🎯 SCORM Integration

The SCORM context handles initialization automatically and provides a smooth development experience.

- Automatic SCORM API detection and initialization
- Loading state management
- Error handling for SCORM API availability
- Helper methods for common SCORM operations

### Initialization Flow

1. **Loading State** (`isInitializing = true`)
   - Shows loading indicator
   - SCORM API is being initialized
   - Child components are not yet rendered

2. **Error State** (`!isScormInitialized && !isInitializing`)
   - Displays error message
   - SCORM API initialization failed
   - In development, falls back to debug mode

3. **Ready State** (`isScormInitialized && !isInitializing`)
   - Renders child components
   - SCORM API is fully functional

### Development Mode

In development (`process.env.NODE_ENV === "development"`):

- **Standalone Mode** (`npm run dev`): SCORM is disabled, uses localStorage fallback
- **SCORM Mode** (`npm run scorm-dev`): SCORM context simulates initialization
- All SCORM functions work without errors for development and testing
- Warning messages are logged to console in SCORM mode
- Full component rendering is enabled in both modes

### Production Mode

In production:

1. **SCORM Production** (`npm run scorm-prod`):
   - Attempts real SCORM API initialization
   - No debug logs (clean console)
   - Optimized for LMS deployment

2. **SCORM Production Debug** (`npm run scorm-prod-debug`):
   - Real SCORM API initialization
   - Detailed debug logs in console
   - Perfect for troubleshooting LMS issues

3. If SCORM initialization fails:
   - Content still renders (no blocking)
   - SCORM functions return safe defaults
   - Errors logged appropriately

### Browser Unload Handling

The context automatically handles browser unload events to ensure data integrity:

- Saves all pending SCORM data
- Terminates the SCORM session gracefully
- Prevents data loss when users navigate away

### Using the SCORM Context

```tsx
import { router } from '@/routes';
import { RouterProvider } from 'react-router-dom';
import { ScormProvider } from '@/contexts/scorm-context';

export default function App() {
  return (
    <ScormProvider>
      <RouterProvider router={router} />
    </ScormProvider>
  );
}
```

```tsx
import { Button } from '@/components/ui/button';
import { LESSON_STATUS, useScorm } from '@/contexts/ScormContext';

function MyComponent() {
  const { scormSet, scormSave, scormQuit, scormGet } = useScorm();

  function handleConcludeScorm() {
    scormSet('cmi.core.lesson_status', LESSON_STATUS.completed); // Set the lesson status to completed
    scormSave(); // Save the SCORM data
    scormQuit(); // Close the SCORM session
  }

  // Check if the course is completed
  const isCourseCompleted = scormGet('cmi.core.lesson_status') === LESSON_STATUS.completed;

  return (
    <Button onClick={handleConcludeScorm} disabled={isCourseCompleted}>
      Conclude SCORM
    </Button>
  );
}
```

## 📦 SCORM Package Generation

The template includes scripts to automatically generate SCORM-compliant packages:

### Production Package

```bash
npm run scorm-prod
```

### Production Package with Debug

```bash
npm run scorm-prod-debug
```

Both scripts will:

1. Run pre-build tasks (gulp)
2. Build the application with TypeScript
3. Package it as a SCORM 1.2 compliant zip file
4. Save it in the `dist/scorm-package/` directory

The difference is that `scorm-prod-debug` includes detailed console logs for troubleshooting.

## 📝 License

MIT

## 🙏 Acknowledgments

- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Pipwerks SCORM API Wrapper](https://github.com/pipwerks/scorm-api-wrapper)
