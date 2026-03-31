import '@//styles/global.css';
import { config } from '@/editor/puck.config';
import { Render } from '@puckeditor/core';

import database from '../../../../backend/database/database.json';

// Describe initial data
const initialData = database;

export function Page() {
  return (
    <div className="puck-canvas">
      <Render config={config({ projectType: 'choices' })} data={initialData} />
    </div>
  );
}
