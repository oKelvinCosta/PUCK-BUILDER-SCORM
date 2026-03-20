// import { useState } from 'react';
// import { dividers } from '@/components/dividers';
// import type { DividerType } from '@/components/dividers';
// import ShowCode from '@/components/show-code';

// const dividerTypes = Object.keys(dividers) as DividerType[];

// const colorOptions = [
//   { name: 'Indigo', className: 'text-indigo-600' },
//   { name: 'Red', className: 'text-red-500' },
//   { name: 'Lime', className: 'text-lime-500' },
//   { name: 'Slate', className: 'text-slate-500' },
//   { name: 'White', className: 'text-white bg-gray-400' },
// ];

// const DIVISORS_SNIPPET = `
// import { dividers } from '@/components/dividers';

// const SelectedComponent = dividers[selectedType].Component;

// <div className={\`border bg-slate-100 p-6 \${selectedColor}\`}>
//   <SelectedComponent />
// </div>

// <div className={\`border bg-slate-100 p-6 \${selectedColor} rotate-180\`}>
//   <SelectedComponent />
// </div>
// `.trim();

// export default function DivisorsSection() {
//   const [selectedType, setSelectedType] = useState<DividerType>('type01');
//   const [selectedColor, setSelectedColor] = useState<string>('text-indigo-600');

//   const SelectedComponent = dividers[selectedType].Component;

//   return (
//     <div className="space-y-6">
//       {/* ShowCode button */}
//       <div className="mb-2 flex justify-end">
//         <ShowCode title="Dividers • snippet" code={DIVISORS_SNIPPET} />
//       </div>

//       {/* Controls */}
//       <div className="flex flex-wrap items-center gap-6">
//         {/* Divider Type Dropdown */}
//         <div>
//           <label className="mb-1 block text-sm font-medium text-gray-700">Divider Type</label>
//           <select
//             value={selectedType}
//             onChange={(e) => setSelectedType(e.target.value as DividerType)}
//             className="rounded border px-3 py-1 text-sm shadow-sm"
//           >
//             {dividerTypes.map((type) => (
//               <option key={type} value={type}>
//                 {type}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Color Buttons */}
//         <div>
//           <label className="mb-1 block text-sm font-medium text-gray-700">Divider Color</label>
//           <div className="flex flex-wrap gap-2">
//             {colorOptions.map((color) => (
//               <button
//                 key={color.className}
//                 onClick={() => setSelectedColor(color.className)}
//                 className={`rounded border px-3 py-1 text-sm shadow-sm ${color.className} ${
//                   selectedColor === color.className
//                     ? 'ring-2 ring-black ring-offset-1'
//                     : 'hover:opacity-80'
//                 }`}
//               >
//                 {color.name}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Divider Previews */}
//       <div className="space-y-6">
//         <div className={`border bg-slate-100 p-6 ${selectedColor}`}>
//           <p className="mb-2 text-sm text-gray-600">Preview</p>
//           <SelectedComponent />
//         </div>

//         <div className={`border bg-slate-100 p-6 ${selectedColor}`}>
//           <p className="mb-2 text-sm text-gray-600">Flipped</p>
//           <div className="rotate-180">
//             <SelectedComponent />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
