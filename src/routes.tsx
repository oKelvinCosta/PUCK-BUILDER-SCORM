import PreviewLayout from '@/pages/_layouts/preview-layout';
import DefaultLayout from '@/pages/_layouts/template-layout';
import Choices from '@/pages/choices';
import SidebarDocsPage from '@/pages/template/components-demo/sidebar-docs-page';
import ExampleComponents from '@/pages/template/example-components';
import ExampleDebugScorm from '@/pages/template/example-debug-scorm';
import ReadmePage from '@/pages/template/readme-page';
import { createHashRouter } from 'react-router-dom';
import BlankLayout from './pages/_layouts/blank-layout';
import { Editor } from './pages/puck/editor';
import { Page } from './pages/puck/page';

const isDEV =
  process.env.NODE_ENV === 'development' || import.meta.env.VITE_ENABLE_SCORM_DEBUG_PROD === 'true';

const routesDEV = [
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      { path: '/', element: <ReadmePage /> },
      { path: '/debug-scorm', element: <ExampleDebugScorm /> },
      { path: '/components', element: <ExampleComponents /> },

      // NEW: Sidebar block demo page
      { path: '/components/sidebar', element: <SidebarDocsPage /> },

      // Template working area
      { path: '/template', element: <Choices /> },
    ],
  },

  {
    path: '/choices',
    element: <PreviewLayout />,
    children: [{ path: '', element: <Choices /> }],
  },
  {
    path: '/edit',
    element: <BlankLayout />,
    children: [{ path: '', element: <Editor /> }],
  },
  {
    path: '/preview',
    element: <BlankLayout />,
    children: [{ path: '', element: <Page /> }],
  },
];

const routesPROD = [
  {
    path: '/',
    element: <BlankLayout />,
    children: [{ path: '/', element: <Choices /> }],
  },
];

export const router = createHashRouter(isDEV ? routesDEV : routesPROD);

export default router;
