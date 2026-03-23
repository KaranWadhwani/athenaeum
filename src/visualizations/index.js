/**
 * Visualization Registry
 * ======================
 * Maps visualization keys (from course JSON "vis" fields)
 * to canvas drawing functions.
 *
 * Each course has its own file in src/visualizations/{courseId}.js
 * that exports an object of { visKey: drawFunction }.
 *
 * Drawing functions receive a <canvas> element and draw using its 2d context.
 * Import colors from ../styles/theme.js for consistent theming.
 *
 * To add visualizations for a new course:
 * 1. Create src/visualizations/newcourse.js
 * 2. Export { vis_key: drawFunction, ... }
 * 3. Import and spread into VIS_MAP below
 */

import { genaiVisualizations } from './genai';
import { databricksVisualizations } from './databricks';
import { devopsVisualizations } from './devops';
import { sysdesignVisualizations } from './sysdesign';
import { dataengVisualizations } from './dataeng';
// import { nlpVisualizations } from './nlp';
// import { mlopsVisualizations } from './mlops';
// ... add more as courses are built

export const VIS_MAP = {
  ...genaiVisualizations,
  ...databricksVisualizations,
  ...devopsVisualizations,
  ...sysdesignVisualizations,
  ...dataengVisualizations,
  // ...nlpVisualizations,
  // ...mlopsVisualizations,
};