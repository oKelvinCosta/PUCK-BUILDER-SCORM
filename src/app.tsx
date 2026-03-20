import { ScormProvider } from '@/contexts/scorm-context';
import { router } from '@/routes';
import { RouterProvider } from 'react-router-dom';
import MetaTags from './components/meta-tags';

export default function App() {
  if (import.meta.env.VITE_APP_WITHOUT_SCORM === 'true') {
    console.log('O ambienteSCORM está desativado');
  }

  return (
    <>
      <MetaTags />
      {import.meta.env.VITE_APP_WITHOUT_SCORM === 'true' ? (
        <>
          <RouterProvider router={router} />
        </>
      ) : (
        <>
          <ScormProvider>
            <RouterProvider router={router} />
          </ScormProvider>
        </>
      )}
    </>
  );
}
