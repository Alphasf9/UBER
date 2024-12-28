import React from 'react'

const WaitingForDriver = (props) => {
  return (
    <div className="relative p-4 max-h-[55vh] overflow-y-auto overflow-x-hidden bg-white rounded-lg shadow-lg">

      <h5
        onClick={() => { props.setWaitingForDriver(true) }}
        className="p-1 text-center w-full absolute top-0 cursor-pointer"
      >
        <i className="text-3xl text-gray-500 ri-arrow-down-wide-line"></i>
      </h5>


      <div className='flex items-center justify-between p-4'>
        <img className="h-20 w-auto object-contain rounded-lg shadow-md" src="/images/imagescaruber.png" alt="Ride confirmation" />

        <div className='text-right'>
          <h2 className='text-lg font-medium'>Manoj Kumar </h2>
          <h4 className='text-xl font-semibold -mt-1 -mb-1'>UP80 9071</h4>
          <p className='text-sm text-gray-600'>White Suzuki S-Presso LXI</p>
        </div>
      </div>


      <div className="gap-4 flex justify-center flex-col items-center">



        <div className="w-full mt-2">
          <div className="flex flex-col items-center gap-4">
            {/* First Div */}
            <div className="flex flex-col items-center bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out w-[90%]">
              <i className="text-3xl text-green-600 ri-map-pin-2-line mb-2"></i>
              <div className="text-center">
                <h3 className="font-semibold text-base text-gray-800">562/11-A</h3>
                <p className="text-sm text-gray-600">Agra Fort Railway Station, Agra</p>
              </div>
            </div>

            {/* Second Div */}
            <div className="flex flex-col items-center bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out w-[90%]">
              <i className="text-3xl text-blue-600 ri-map-pin-5-fill mb-2"></i>
              <div className="text-center">
                <h3 className="font-semibold text-base text-gray-800">562/11-A</h3>
                <p className="text-sm text-gray-600">Agra Fort Railway Station, Agra</p>
              </div>
            </div>

            {/* Third Div */}
            <div className="flex flex-col items-center bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out w-[90%]">
              <i className="text-3xl text-yellow-600 ri-money-rupee-circle-line mb-2"></i>
              <div className="text-center">
                <h3 className="font-semibold text-base text-gray-800">₹ 193.20</h3>
                <p className="text-sm text-gray-600">Cash</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WaitingForDriver







// import React from 'react';

// const WaitingForDriver = (props) => {
//   return (
//     <div className="relative p-4 h-full max-h-[60vh] overflow-hidden bg-white rounded-lg shadow-lg">

//       <h5
//         onClick={() => { props.setWaitingForDriver(true) }}
//         className="p-1 text-center w-full absolute top-0 cursor-pointer"
//       >
//         <i className="text-3xl text-gray-500 ri-arrow-down-wide-line"></i>
//       </h5>

//       {/* Ride Details Section */}
//       <div className='flex items-center justify-between p-4'>
//         <img
//           className="h-20 w-auto object-contain rounded-lg shadow-md"
//           src="/images/imagescaruber.png"
//           alt="Ride confirmation"
//         />

//         <div className='text-right'>
//           <h2 className='text-lg font-medium'>Manoj Kumar</h2>
//           <h4 className='text-xl font-semibold -mt-1 -mb-1'>UP80 9071</h4>
//           <p className='text-sm text-gray-600'>White Suzuki S-Presso LXI</p>
//         </div>
//       </div>

//       {/* Location and Payment Information Section */}
//       <div className="gap-4 flex justify-center flex-col items-center mt-2">

//         <div className="w-full mt-2">
//           <div className="flex flex-col items-center gap-4">

//             {/* First Div - Pickup Location */}
//             <div className="flex flex-col items-center bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out w-[90%]">
//               <i className="text-3xl text-green-600 ri-map-pin-2-line mb-2"></i>
//               <div className="text-center">
//                 <h3 className="font-semibold text-base text-gray-800">562/11-A</h3>
//                 <p className="text-sm text-gray-600">Agra Fort Railway Station, Agra</p>
//               </div>
//             </div>

//             {/* Second Div - Destination Location */}
//             <div className="flex flex-col items-center bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out w-[90%]">
//               <i className="text-3xl text-blue-600 ri-map-pin-5-fill mb-2"></i>
//               <div className="text-center">
//                 <h3 className="font-semibold text-base text-gray-800">562/11-A</h3>
//                 <p className="text-sm text-gray-600">Agra Fort Railway Station, Agra</p>
//               </div>
//             </div>

//             {/* Third Div - Payment */}
//             <div className="flex flex-col items-center bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out w-[90%]">
//               <i className="text-3xl text-yellow-600 ri-money-rupee-circle-line mb-2"></i>
//               <div className="text-center">
//                 <h3 className="font-semibold text-base text-gray-800">₹ 193.20</h3>
//                 <p className="text-sm text-gray-600">Cash</p>
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WaitingForDriver;