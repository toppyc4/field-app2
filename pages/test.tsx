import React from "react"

const test = () => {
  return <div>test</div>
}

export default test
// import React, { useState } from "react"
// import usePlacesAutocomplete, {
//   getGeocode,
//   getLatLng,
// } from "use-places-autocomplete"
// import AsyncSelect from "react-select/async"
// import {
//   Combobox,
//   ComboboxInput,
//   ComboboxPopover,
//   ComboboxList,
//   ComboboxOption,
//   ComboboxOptionText,
// } from "@reach/combobox"
// import "@reach/combobox/styles.css"
// import useOnclickOutside from "react-cool-onclickoutside"
// import { Autocomplete } from "@react-google-maps/api"
// import { Address, Coord, Post } from "../../utils/types"
// import { InputBase } from "@material-ui/core"

// const test = ({ setAddress }: { setAddress: (address: Address) => void }) => {
//   const [autocomplete, setAutocomplete] = useState(null)

//   const onLoad = (autoC: any) => setAutocomplete(autoC)

//   const onPlaceChanged = () => {
//     console.log("autocomplete: ", autocomplete)
//     const lat = autocomplete?.getPlace().geometry.location.lat()
//     const lng = autocomplete?.getPlace().geometry.location.lng()
//     const formatAddress = autocomplete?.getPlace().formatted_address
//     const placeId = autocomplete?.getPlace().place_id

//     setAddress({
//       formatted_address: formatAddress,
//       coords: { lat: lat, lng: lng },
//       place_id: placeId,
//     })
//   }

//   // console.log("[SearchBox]status:", status)
//   // console.log("[SearchBox]data:", data)
//   // console.log("[SearchBox]ready:", ready)
//   return (
//     <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
//       <form
//         onSubmit={(e) => {
//           e.preventDefault()
//         }}
//       >
//         <input placeholder='Search . . .' className='' />
//       </form>
//     </Autocomplete>
//     // <Combobox onSelect={handleSelect}>
//     //   <ComboboxInput
//     //     value={value}
//     //     onChange={(e) => setValue(e.target.value)}
//     //     disabled={!ready}
//     //     className='appearance-none block w-full my-2 bg-white text-gray-700  border-gray-400  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
//     //     placeholder='Search Place'
//     //   />
//     //   <ComboboxPopover>
//     //     <ComboboxList>
//     //       {status === "OK" &&
//     //         data.map(({ place_id, description }) => (
//     //           <ComboboxOption key={place_id} value={description} />
//     //         ))}
//     //     </ComboboxList>
//     //   </ComboboxPopover>
//     // </Combobox>
//   )
// }

// export default test
