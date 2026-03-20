// import { useState } from "react";

// export default function DragDropDemo2() {
//   const [boards, setBoards] = useState({
//     todo: ["Learn React", "Read Docs", "Build a project"],
//     doing: ["Experiment with DnD"],
//     done: ["Setup Vite project"],
//   });

//   const [draggedItem, setDraggedItem] = useState<{
//     board: string;
//     index: number;
//   } | null>(null);

//   const handleDragStart = (board: string, index: number) => {
//     setDraggedItem({ board, index });
//   };

//   const handleDrop = (targetBoard: string, targetIndex: number | null) => {
//     if (!draggedItem) return;

//     const newBoards = { ...boards };

//     // Remove item from source
//     const [movedItem] = newBoards[draggedItem.board].splice(
//       draggedItem.index,
//       1
//     );

//     // Insert into target
//     if (targetIndex === null) {
//       newBoards[targetBoard].push(movedItem);
//     } else {
//       newBoards[targetBoard].splice(targetIndex, 0, movedItem);
//     }

//     setBoards(newBoards);
//     setDraggedItem(null);
//   };

//   return (
//     <div className="flex gap-6 p-6">
//       {Object.entries(boards).map(([boardName, items]) => (
//         <div
//           key={boardName}
//           className="flex-1 bg-gray-100 p-4 rounded shadow-md"
//         >
//           <h2 className="text-lg font-bold capitalize mb-4">{boardName}</h2>

//           {/* Empty space also works as drop zone */}
//           <div
//             onDragOver={(e) => e.preventDefault()}
//             onDrop={() => handleDrop(boardName, null)}
//             className="min-h-[200px] flex flex-col gap-2"
//           >
//             {items.map((item, index) => (
//               <div
//                 key={item}
//                 draggable
//                 onDragStart={() => handleDragStart(boardName, index)}
//                 onDragOver={(e) => e.preventDefault()}
//                 onDrop={() => handleDrop(boardName, index)}
//                 className={`p-3 border rounded cursor-grab transition-colors
//                   ${
//                     draggedItem?.board === boardName &&
//                     draggedItem?.index === index
//                       ? "bg-yellow-300"
//                       : "bg-blue-200"
//                   }`}
//               >
//                 {item}
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
