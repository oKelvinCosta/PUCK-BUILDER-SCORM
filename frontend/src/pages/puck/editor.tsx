import '@//styles/editor.css';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { config } from '@/editor/puck.config';
import { useEditorMode } from '@/editor/stores/editor-mode-store';
import { api } from '@/lib/axios';
import { Puck, usePuck } from '@puckeditor/core';
import '@puckeditor/core/puck.css';
import { useQuery } from '@tanstack/react-query';
import { Eye, Rocket } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import database from '../../../../backend/database/database.json';
import database2 from '../../../../backend/database/database2.json';

// Describe initial data
const initialData = database;
const database2Data = database2;

// Save data to JSON file
const saveJsonFile = async (data: unknown) => {
  console.log('Saving data:', data);

  try {
    // Create blob with JSON data
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });

    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'database.json';

    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up
    URL.revokeObjectURL(url);

    console.log('Database.json downloaded successfully');
  } catch (error) {
    console.error('Error saving data:', error);
  }
};

// Render Puck editor
export function Editor() {
  const navigate = useNavigate();
  const { setMode } = useEditorMode();
  const { pageId } = useParams();

  const {
    data: pageData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['Page', pageId],
    queryFn: () => api.get(`/pages/${pageId}`).then((res) => res.data),
    staleTime: 2 * 60 * 1000, // 10 minutos cache
    gcTime: 4 * 60 * 1000, // 15 minutos cache
  });

  console.log('pageData', pageData?.puckData);

  // Set editor mode to editing
  // Always before return
  useEffect(() => {
    setMode('editing');
  }, [setMode]);

  // ✅ Guard: não monta o Puck até os dados chegarem
  if (isLoading) {
    return (
      <div>
        <Skeleton style={{ height: '100vh' }} className="flex w-full items-center justify-center">
          <div>Carregando editor...</div>
        </Skeleton>
      </div>
    );
  }
  if (isError || !pageData) return <div>Erro ao carregar página.</div>;

  // Handle preview
  const handlePreview = () => {
    navigate('/preview');
  };

  // Config params
  const configParams = {
    projectType: 'choices',
  };

  // Default data
  const defaultData = pageData?.puckData?.page ?? {
    root: { props: {} },
    content: [],
    zones: {},
  };

  return (
    <Puck
      key={isLoading ? 'loading' : pageId}
      config={config(configParams)}
      data={pageData?.puckData?.page || defaultData}
      // data={database2Data}
      onPublish={saveJsonFile}
      overrides={{
        // Transforms in function to allow use of hooks
        headerActions: function HeaderActions() {
          // usePuck must be used inside <Puck>.
          const { appState } = usePuck();

          const handlePublish = async () => {
            await saveJsonFile(appState.data);
          };

          return (
            <>
              <Button variant="outline" title="Preview" size={'icon'} onClick={handlePreview}>
                <Eye />
              </Button>

              <Button className="flex items-center pt-[7px]" onClick={handlePublish}>
                <Rocket /> Exportar
              </Button>
            </>
          );
        },
        // Add puck-canvas class to iframe
        iframe: ({ children }) => {
          return (
            <div className="puck-canvas">
              {
                // isLoading && (
                //   <div>
                //     <Skeleton
                //       style={{ height: '100vh' }}
                //       className="flex w-full items-center justify-center"
                //     >
                //       <div>Carregando editor...</div>
                //     </Skeleton>
                //   </div>
                // )
              }
              {children}
            </div>
          );
        },
      }}
    />
  );
}

// Observation:

// config and the blocks must be functions, so the zustand store can be used correctly inside them
