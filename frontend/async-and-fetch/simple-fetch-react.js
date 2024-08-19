// export default function LatestDatasets({ className }: { className?: string }) {
//   const [data, setData] = useState<null | any>([]);
//   useEffect(() => {
//     fetch(`https://api.ikurehealthtech.com/dev/healthq/datasets`)
//       .then((response) => response.json())
//       .then((json) => setData(json));
//   }, []);
//   if (isLoading) return <SplashScreen />;
//   return (
//     <div className={className}>
//       <div className="col-span-full mb-3 flex items-center justify-between 2xl:mb-5">
//         <h3 className="text-lg font-semibold xl:text-xl">Available Dataset</h3>
//         <Link
//           to="/file-manager?layout=grid"
//           className="text-sm font-medium text-gray-900 hover:underline"
//         >
//           View all
//         </Link>
//       </div>

//       {/* <SimpleBar> */}
//       <div className="grid grid-flow-col gap-5">
//         {data &&
//           data?.map((item: any) => (
//             <Link
//               key={item._id}
//               to={`/data-sets?id=${item._id}`}
//               className="text-sm font-medium text-gray-900 hover:underline"
//             >
//               <Card
//                 key={item._id}
//                 item={item}
//                 onDeleteItem={() => null}
//                 className="min-w-[273px] hover:-translate-y-0 hover:shadow-none"
//               />
//             </Link>
//           ))}
//       </div>
//       {/* </SimpleBar> */}
//     </div>
//   );
// }
export {};
