import React from "react"
import SpotsType from "./SpotsType"
import { Filters as FiltersType } from "../../utils/types"

export default function Filters({
  filters,
  setFilters,
}: {
  filters: FiltersType
  setFilters: (filter: FiltersType) => void
}): JSX.Element {
  return <SpotsType filters={filters} setFilters={setFilters} />
}
