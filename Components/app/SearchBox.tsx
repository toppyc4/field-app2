import React from "react"
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete"
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
} from "@reach/combobox"
import "@reach/combobox/styles.css"
import { Address, Coord, Post } from "../../utils/types"

const SearchBox = ({
  setAddress,
}: {
  setAddress: (address: Address) => void
}) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete()

  const handleSelect = async (val: string) => {
    setValue(val, false)
    clearSuggestions()

    const results = await getGeocode({ address: val })
    const { lat, lng } = await getLatLng(results[0])
    console.log("results:", results)
    setAddress({
      formatted_address: results[0].formatted_address,
      coords: { lat, lng },
      place_id: results[0].place_id,
    })
  }
  console.log("[SearchBox]status:", status)
  console.log("[SearchBox]data:", data)
  console.log("[SearchBox]ready:", ready)
  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className='appearance-none block w-full my-2 bg-white text-gray-700  border-gray-400  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
        placeholder='Search Place'
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  )
}

export default SearchBox
