import AsyncSelect from "react-select/async"
import { useTheme } from "next-themes"
import useHasMounted from "../../utils/useHasMounted"

const getAutocomplete = async (input: string) => {
  const res = await fetch("/api/autocomplete/" + input)
  const data = await res.json()
  const predictions = data.predictions
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
  value: { [key: string]: any }
  setValue: (label: string, value: string) => void
  placeholder?: string
}): JSX.Element {
  const { theme } = useTheme()
  const hasMounted = useHasMounted()
  console.log("[Searchbox]hasMounted:", hasMounted)
  console.log("[Searchbox]theme:", theme)

  return (
    <>
      {hasMounted && (
        <AsyncSelect
          menuPlacement='auto'
          value={value}
          menuPosition='fixed'
          // styles={{
          //   container: (provided, state) => ({
          //     ...provided,
          //     width: "100%",
          //     transition: "all 0.2s ease",
          //   }),
          //   menu: (provided, state) => ({
          //     ...provided,
          //     backgroundColor: theme == "dark" ? "#2B2B2B" : "#F4F4F4",
          //     minWidth: "100%",
          //     width: "100%",
          //     "@media (min-width: 1024px)": {
          //       width: "150%",
          //     },
          //     zIndex: 30,
          //   }),
          //   option: (provided, state) => ({
          //     ...provided,
          //     backgroundColor:
          //       theme == "dark"
          //         ? state.isFocused || state.isSelected
          //           ? "#E09F7D"
          //           : "#2B2B2B"
          //         : state.isFocused || state.isSelected
          //         ? "#FFC2A2"
          //         : "#F0F0F0",
          //     color: theme == "dark" ? "#F4F4F4" : "#2B2B2B",
          //     ":active": {
          //       ...provided[":active"],
          //       backgroundColor:
          //         theme == "dark"
          //           ? state.isFocused || state.isSelected
          //             ? "#E09F7D"
          //             : "#2B2B2B"
          //           : state.isFocused || state.isSelected
          //           ? "#FFC2A2"
          //           : "#F0F0F0",
          //     },
          //   }),
          //   input: (provided, state) => ({
          //     ...provided,
          //     color: theme == "dark" ? "#bfbfbf" : "#2B2B2B",
          //     cursor: "text",
          //   }),
          //   singleValue: (provided, state) => ({
          //     ...provided,
          //     color: theme == "dark" ? "#bfbfbf" : "#2B2B2B",
          //   }),
          //   control: (provided, state) => ({
          //     ...provided,
          //     backgroundColor: theme == "dark" ? "#2B2B2B" : "#F4F4F4",
          //     borderColor: theme == "dark" ? "#494949" : "#DBDBDB",
          //     borderWidth: "2px",
          //   }),
          //   dropdownIndicator: (provided, state) => ({
          //     display: "none",
          //   }),
          //   indicatorSeparator: (provided, state) => ({
          //     display: "none",
          //   }),
          // }}
          cacheOptions
          loadOptions={getAutocomplete}
          placeholder={placeholder}
          onChange={(e: any) => {
            setValue(e.label, e.value)
          }}
        />
      )}
    </>
  )
}
