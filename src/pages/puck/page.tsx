import { Render } from '@puckeditor/core';
import { config } from '@root/puck.config';
import '@root/src/styles/global.css';

import database from '@root/database.json';

// Describe initial data
const initialData = database;

export function Page() {
  return <Render config={config} data={initialData} />;
}
