import { src, dest, series } from 'gulp';
import zipGulp from 'gulp-zip';
import path from 'path';
import { deleteAsync } from 'del';
import dotenv from 'dotenv';
dotenv.config();

const folder = process.env.VITE_DIST_BUILD;

// Function to delete everything inside the "dist" folder
export function clean() {
  return deleteAsync([`dist/**`]);
}

// Function to get the current date in dd-mm-yyyy format
export function getCurrentDate() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0'); // January is 0!
  const year = now.getFullYear();
  return `${day}-${month}-${year}`;
}

// Task to create the ZIP of the dist folder
export function zip() {
  const dirname = path.basename(path.resolve());
  // Name of the generated ZIP file, including the COURSE variable
  const zipFileName = `${dirname}_SCORM_V1_${getCurrentDate()}.zip`;
  return src(`dist/${folder}/**/*`, { encoding: false }) // Get all files inside dist, encoding: false to not corrupt the images
    .pipe(zipGulp(zipFileName)) // Create the ZIP with the defined name
    .pipe(dest('dist/')); // Save the ZIP in the project root
}

// To use in package.json
export const beforeBuild = series(clean);
export const afterBuild = series(zip);

// Default task to automatically create the ZIP after the build
export default series(zip);
