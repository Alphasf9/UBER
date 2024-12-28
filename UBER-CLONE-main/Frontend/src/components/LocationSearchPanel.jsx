import PropTypes from 'prop-types';

const LocationSearchPanel = (props) => {



  const locations = [
    '15 Suresh Nagar New Agra Colony',
    ' CSJM University Near Kalyanpur, Kanpur',
    'Z sqaure Mall Kanpur'
  ];
  return (
    <div>
      {
        locations.map(function (elem,idx) {
          return <div key={idx} onClick={() => {
            
            props.setvehcilePanel(true)
            props.setPanelOpen(false)
            props.setvehcilePanel(true)
          }} className='flex gap-4 border-2 rounded-xl p-3 items-center my-2 justify-start border-gray-50 active:border-black'>
            <h2 className='bg-[#eee] h-7 w-[7%] flex items-center justify-center rounded-full'>
              <i className="ri-map-pin-2-line"></i>
            </h2>
            <h4 className='font-medium'>{elem}</h4>
          </div>
        })
      }

      {/* <div className='flex gap-4 border-2 rounded-xl p-3 items-center my-2 justify-start border-gray-50 active:border-black'>
        <h2 className='bg-[#eee] h-7 w-[7%] flex items-center justify-center rounded-full'>
          <i className="ri-map-pin-2-line"></i>
        </h2>
        <h4 className='font-medium'> 15 Suresh Nagar New Agra Colony</h4>
      </div>


      <div className='flex gap-4 border-2 rounded-xl p-3 items-center my-2 justify-start border-gray-50 active:border-black'>
        <h2 className='bg-[#eee] h-7 w-[7%] flex items-center justify-center rounded-full'>
          <i className="ri-map-pin-2-line"></i>
        </h2>
        <h4 className='font-medium'> 15 Suresh Nagar New Agra Colony</h4>
      </div>


      <div className='flex gap-4 border-2 rounded-xl p-3 items-center my-2 justify-start border-gray-50 active:border-black'>
        <h2 className='bg-[#eee] h-7 w-[7%] flex items-center justify-center rounded-full'>
          <i className="ri-map-pin-2-line"></i>
        </h2>
        <h4 className='font-medium'> 15 Suresh Nagar New Agra Colony</h4>
      </div> */}


    </div>
  )
}

export default LocationSearchPanel