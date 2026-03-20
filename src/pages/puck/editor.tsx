import { Puck } from '@puckeditor/core';
import '@puckeditor/core/puck.css';
import { config } from '@root/puck.config';
import '@root/src/styles/global.css';

// Describe initial data
const initialData = {};

// Save data to your database
const save = (data: any) => {
  console.log('Saving data:', data);
};

// Render Puck editor
export function Editor() {
  return <Puck config={config} data={initialData} onPublish={save} />;
}
