import '@//styles/editor.css';
import { Button } from '@/components/ui/button';
import { config } from '@/editor/puck.config';
import { useEditorMode } from '@/editor/stores/editor-mode-store';
import { Puck, usePuck } from '@puckeditor/core';
import '@puckeditor/core/puck.css';
import { Eye, Rocket } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import database from '../../../../backend/database/database.json';

// Describe initial data
const initialData = database;

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

  // Set editor mode to editing
  useEffect(() => {
    setMode('editing');
  }, [setMode]);

  const handlePreview = () => {
    navigate('/preview');
  };

  // const config2 = useMemo(() => getConfig(projectType), [projectType]);

  const configParams = {
    projectType: 'choices',
  };

  return (
    <Puck
      config={config(configParams)}
      data={initialData}
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
          return <div className="puck-canvas">{children}</div>;
        },
      }}
    />
  );
}

// Observation:

// config and the blocks must be functions, so the zustand store can be used correctly inside them
