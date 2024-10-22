// import Link from "next/link";
// import { JobListResType } from "../schemaValidations/job.schema";

// export default function HomePage({
//   jobList,
// }: {
//   jobList: JobListResType["data"] | null;
// }) {
//   if (!jobList) {
//     return <div className="text-center text-red-500"></div>;
//   }

//   return (
//     <div className="overflow-hidden bg-gray-1 pb-12 pt-20 dark:bg-dark-2 lg:pb-[90px] lg:pt-[40px]">
//       <div className="container mx-auto">
//         <div className="flex flex-wrap -mx-4">
//           <div className="w-full px-4">
//             <div className="mb-7 max-w-[485px] text-left">
//               <h2 className="mb-3 text-3xl font-bold leading-tight sm:text-4xl md:text-[40px]">
//                 Việc làm hấp dẫn
//               </h2>
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-wrap justify-center -mx-4">
//           {jobList.map((job) => (
//             <div
//               key={job.jobId} // Đặt key ở đây thay vì key={index}
//               className="w-full px-4 sm:w-1/2 lg:w-1/3 xl:w-1/3 relative mb-6"
//             >
//               <Link href={`/jobs/${job.jobId}`}>
//                 <div className="block bg-white group rounded-xl shadow-testimonial dark:bg-dark dark:shadow-none relative border border-yellow-900 rounded-lg cursor-pointer">
//                   <div className="flex">
//                     <div className="flex-shrink-0 p-4">
//                       <img
//                         src="https://cdn.tailgrids.com/1.0/assets/images/team/image-07/image-01.png"
//                         alt="team image"
//                         className="h-[60px] w-[60px] rounded-full"
//                       />
//                     </div>
//                     <div className="flex-1 p-4 mx-2 min-w-0">
//                       <div className="text-left">
//                         <p
//                           className="text-xl mb-2 font-normal text-dark dark:text-black truncate"
//                           title={job.title}
//                         >
//                           {job.title}
//                         </p>
//                         <p
//                           className="text-xs mb-2 font-normal text-dark dark:text-black truncate"
//                           title={job.companyName}
//                         >
//                           {job.companyName}
//                         </p>
//                         <p
//                           className="text-xs mb-2 font-normal text-dark dark:text-black truncate"
//                           title={job.contactAddress}
//                         >
//                           {job.contactAddress}
//                         </p>
//                         <p
//                           className="text-xs mb-2 font-normal text-dark dark:text-violet-400 truncate"
//                           title={job.jobType}
//                         >
//                           {job.jobType}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="absolute top-2 right-2">
//                     <button className="bg-transparent rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-5 w-5 text-red-500"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
//                         />
//                       </svg>
//                     </button>
//                   </div>
//                 </div>
//               </Link>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
