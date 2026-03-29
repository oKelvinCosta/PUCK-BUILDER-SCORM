import { Button } from '@/components/ui/button';
import { config } from '@/puck/puck.config';
import { Puck } from '@puckeditor/core';
import '@puckeditor/core/puck.css';
import database from '@root/database.json';
import '@root/src/styles/editor.css';
import { Eye, Rocket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Describe initial data
const initialData = database;

// Save data to your database
const save = async (data: unknown) => {
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

  const handlePreview = () => {
    // Lógica para abrir preview
    navigate('/preview');
  };

  const handlePublish = async () => {
    const data = initialData; // ou pegue o estado atual se necessário
    await save(data);
  };

  return (
    <Puck
      config={config}
      data={initialData}
      onPublish={save}
      overrides={{
        headerActions: () => (
          <>
            <Button variant="outline" title="Preview" size={'icon'} onClick={handlePreview}>
              <Eye />
            </Button>
            <Button className="flex items-center pt-[7px]" onClick={handlePublish}>
              <Rocket /> Exportar
            </Button>
          </>
        ),
      }}
    />
  );
}
