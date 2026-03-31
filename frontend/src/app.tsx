import MetaTags from '@/components/meta-tags';
import { ScormProvider } from '@/contexts/scorm-context';
import { router } from '@/routes/routes';
import { RouterProvider } from 'react-router-dom';

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
