import { Puck } from '@puckeditor/core';
import '@puckeditor/core/puck.css';
import database from '@root/database.json';
import { config } from '@root/puck.config';
import '@root/src/styles/global.css';

// Describe initial data
const initialData = database;

// Save data to your database
const save = async (data: any) => {
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
  return <Puck config={config} data={initialData} onPublish={save} />;
}
