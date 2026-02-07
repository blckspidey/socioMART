import { motion } from "framer-motion";

const FLOAT = {
  y: [0, -12, 0],
};

export default function FloatingBusinessPreview() {
  return (
    <div className="relative w-[420px] h-[520px]">

      {/* Card 1 — Top Left */}
   <motion.div
  animate={FLOAT}
  whileHover={{
    y: -16,
    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
  }}
  transition={{
    duration: 8,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  
      className="absolute top-10 left-[-100px] w-[260px] rounded-2xl bg-white shadow-xl p-4"
>

        <div className="h-28 rounded-xl bg-gradient-to-br from-rose-200 to-rose-100 mb-3" />
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 font-semibold">
            B
          </div>
          <div>
            <p className="text-sm font-semibold">Bloom Flo</p>
            <p className="text-xs text-gray-500">Flowers</p>
          </div>
        </div>
      </motion.div>

      {/* Card 2 — Middle (diagonal down) */}
     <motion.div
  animate={FLOAT}
  whileHover={{
    y: -16,
    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
  }}
  transition={{
    duration: 8,
    repeat: Infinity,
    ease: "easeInOut",
  }}
   className="absolute top-40 left-24 w-[260px] rounded-2xl bg-white shadow-xl p-4"
>

        <div className="h-28 rounded-xl bg-gradient-to-br from-rose-300 to-rose-200 mb-3" />
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 font-semibold">
            T
          </div>
          <div>
            <p className="text-sm font-semibold">The Cake</p>
            <p className="text-xs text-gray-500">Bakery</p>
          </div>
        </div>
      </motion.div>

      {/* Card 3 — Bottom Right */}
     <motion.div
  animate={FLOAT}
  whileHover={{
    y: -16,
    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
  }}
  transition={{
    duration: 8,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  className="absolute top-80 left-64 w-[260px] rounded-2xl bg-white shadow-xl p-4"
>

        <div className="h-28 rounded-xl bg-gradient-to-br from-amber-200 to-amber-100 mb-3" />
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 font-semibold">
            C
          </div>
          <div>
            <p className="text-sm font-semibold">Craft & Co.</p>
            <p className="text-xs text-gray-500">Handmade</p>
          </div>
        </div>
      </motion.div>

    </div>
  );
}
// import { motion } from "framer-motion";

// const FLOAT = {
//   y: [0, -12, 0],
// };

// export default function FloatingBusinessPreview() {
//   return (
//     <div className="relative w-[420px] h-[520px]">

//       {/* Card 1 — Top Left */}
//       <motion.div
//         animate={FLOAT}
//         transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
//         className="absolute top-10 left-[-100px] w-[260px] rounded-2xl bg-white shadow-xl p-4"
//       >
//         <div className="h-28 rounded-xl bg-gradient-to-br from-rose-200 to-rose-100 mb-3" />
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 font-semibold">
//             B
//           </div>
//           <div>
//             <p className="text-sm font-semibold">Bloom Flo</p>
//             <p className="text-xs text-gray-500">Flowers</p>
//           </div>
//         </div>
//       </motion.div>

//       {/* Card 2 — Middle (diagonal down) */}
//       <motion.div
//         animate={FLOAT}
//         transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
//         className="absolute top-40 left-24 w-[260px] rounded-2xl bg-white shadow-xl p-4"
//       >
//         <div className="h-28 rounded-xl bg-gradient-to-br from-rose-300 to-rose-200 mb-3" />
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 font-semibold">
//             T
//           </div>
//           <div>
//             <p className="text-sm font-semibold">The Cake</p>
//             <p className="text-xs text-gray-500">Bakery</p>
//           </div>
//         </div>
//       </motion.div>

//       {/* Card 3 — Bottom Right */}
//       <motion.div
//         animate={FLOAT}
//         transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
//         className="absolute top-80 left-64 w-[260px] rounded-2xl bg-white shadow-xl p-4"
//       >
//         <div className="h-28 rounded-xl bg-gradient-to-br from-amber-200 to-amber-100 mb-3" />
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 font-semibold">
//             C
//           </div>
//           <div>
//             <p className="text-sm font-semibold">Craft & Co.</p>
//             <p className="text-xs text-gray-500">Handmade</p>
//           </div>
//         </div>
//       </motion.div>

//     </div>
//   );
// }
