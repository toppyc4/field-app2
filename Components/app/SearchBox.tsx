import React from "react"
// import usePlacesAutocomplete, {
//   getGeocode,
//   getLatLng,
// } from "use-places-autocomplete"
// import {
//   Combobox,
//   ComboboxInput,
//   ComboboxPopover,
//   ComboboxList,
//   ComboboxOption,
//   ComboboxOptionText,
// } from "@reach/combobox"
// import "@reach/combobox/styles.css"
import Input from "../base/Input"
import useSWR from "swr"
import AsyncSelect from "react-select/async"
import { useTheme } from "next-themes"
import useHasMounted from "../../utils/useHasMounted"

//@ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json())

const getAutocomplete = async (input: string) => {
  const url = "/api/autocomplete" + input
  const res = await fetcher(url)
  const predictions = res.predictions
  return predictions.map((p: any) => ({
    value: p.place_id,
    label: p.description,
  }))
}

export default function SearchBox({
  value,
  setValue,
  placeholder,
}: {
  value: string
  setValue: (value: string) => void
  placeholder?: string
}) {
  const onChange = (value: string) => {
    setValue(value)
  }
  const { theme, setTheme } = useTheme()
  const hasMounted = useHasMounted()

  return (
    <>
      {hasMounted && (
        <AsyncSelect
          styles={{
            container: (provided, state) => ({
              ...provided,
              width: "100%",
            }),
            menu: (provided, state) => ({
              ...provided,
              backgroundColor: theme == "dark" ? "#2B2B2B" : "#F4F4F4",
            }),
            option: (provided, state) => ({
              ...provided,
              backgroundColor:
                theme == "dark"
                  ? state.isFocused
                    ? "#E09F7D"
                    : "#2B2B2B"
                  : state.isFocused
                  ? "#FFC2A2"
                  : "#F0F0F0",
            }),
            input: (provided, state) => ({
              ...provided,
              color: theme == "dark" ? "#bfbfbf" : "#2B2B2B",
              cursor: "text",
            }),
            singleValue: (provided, state) => ({
              ...provided,
              color: theme == "dark" ? "#bfbfbf" : "#2B2B2B",
            }),
            control: (provided, state) => ({
              ...provided,
              backgroundColor: theme == "dark" ? "#2B2B2B" : "#F4F4F4",
              borderColor: theme == "dark" ? "#494949" : "#DBDBDB",
              borderWidth: "2px",
            }),
            dropdownIndicator: (provided, state) => ({
              display: "none",
            }),
            indicatorSeparator: (provided, state) => ({
              display: "none",
            }),
          }}
          cacheOptions
          loadOptions={getAutocomplete}
          placeholder={placeholder}
          onChange={(e: any) => {
            setValue(e.value)
          }}
        />
      )}
    </>
    // <Combobox onSelect={handleSelect}>
    //   <ComboboxInput
    //     value={value}
    //     onChange={(e) => setValue(e.target.value)}
    //     disabled={!ready}
    //     className='appearance-none block w-full my-2 bg-white text-gray-700  border-gray-400  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
    //     placeholder='Search Place'
    //   />
    //   <ComboboxPopover>
    //     <ComboboxList>
    //       {status === "OK" &&
    //         data.map(({ place_id, description }) => (
    //           <ComboboxOption key={place_id} value={description} />
    //         ))}
    //     </ComboboxList>
    //   </ComboboxPopover>
    // </Combobox>
  )
}
