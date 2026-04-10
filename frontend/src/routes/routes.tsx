import PreviewLayout from '@/pages/_layouts/preview-layout';
import DefaultLayout from '@/pages/_layouts/template-choice-layout';
import SidebarDocsPage from '@/pages/template/components-demo/sidebar-docs-page';
import ExampleComponents from '@/pages/template/example-components';

import { MyProjects } from '@/pages/app/my-projects';
import { ProjectsByGroup } from '@/pages/app/projects-by-group/';
import { createHashRouter } from 'react-router-dom';
import { AppLayout } from '../pages/_layouts/app-layout/app-layout';
import BlankLayout from '../pages/_layouts/blank-layout';
import { Editor } from '../pages/puck/editor';
import { Page } from '../pages/puck/page';

const isDEV =
  process.env.NODE_ENV === 'development' || import.meta.env.VITE_ENABLE_SCORM_DEBUG_PROD === 'true';

const routesDEV = [
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      { path: '/components', element: <ExampleComponents /> },

      // NEW: Sidebar block demo page
      { path: '/components/sidebar', element: <SidebarDocsPage /> },
    ],
  },
  {
    path: '/edit',
    element: <BlankLayout />,
    children: [{ path: '', element: <Editor /> }],
  },
  {
    path: '/preview',
    element: <PreviewLayout />,
    children: [{ path: '', element: <Page /> }],
  },
  {
    path: '/app',
    element: <AppLayout />,
    children: [
      { path: '', element: <MyProjects /> },
      { path: 'group/:groupId', element: <ProjectsByGroup /> },
    ],
  },
];

const routesPROD = [
  {
    path: '/',
    element: <BlankLayout />,
    children: [{ path: '/', element: <Page /> }],
  },
];

export const router = createHashRouter(isDEV ? routesDEV : routesPROD);

export default router;
