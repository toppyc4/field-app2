import React, { useState } from "react"
import {
  Filters as FiltersType,
  typesMap,
  ServicesType,
} from "../../utils/types"
import Button from "../base/Button"
import Icon from "../base/Icon"

import { usePopper } from "react-popper"

export default function SpotsType({
  filters,
  setFilters,
}: {
  filters: FiltersType
  setFilters: (filters: FiltersType) => void
}) {
  const [refButton, setRefButton] = useState<HTMLButtonElement | null>(null)
  const [refPopper, setRefPopper] = useState<HTMLDivElement | null>(null)
  const { styles, attributes } = usePopper(refButton, refPopper, {
    placement: "bottom-start",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 10],
        },
      },
      {
        name: "flip",
        options: {
          fallbackPlacements: ["top-end"],
        },
      },
    ],
  })
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        ref={setRefButton}
        className='flex flex-row w-64  transition-all duration-200 ease-in-out bg-white border border-gray-400 hover:border-gray-500 py-2 px-4 pr-8 rounded shadow leading-tight cursor-pointer focus:outline-none focus:shadow-outline disabled:cursor-not-allowed disabled:opacity-60'
        onClick={() => setOpen(!open)}
        disabled={filters.province == null}
      >
        <span className='flex flex-row items-center'>
          Choose Type of Services
        </span>
      </button>
      {open && (
        <div
          className='absolute left-[-100vh] right-[-128.4vh] bottom-[-77.77vh] top-[-5.96vh] z-30'
          onClick={() => setOpen(false)}
        />
      )}

      <div
        ref={setRefPopper}
        style={styles.popper}
        {...attributes.popper}
        className={`transition-all duration-150 z-50 ${
          !open && "opacity-0 pointer-events-none"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className='bg-zinc-200 dark:bg-zinc-50 border-2 border-black/20 dark:border-white/20 rounded-lg shadow-lg p-4 grid grid-cols-4 lg:grid-cols-3 gap-2'>
          {Object.entries(typesMap).map(([key, value]) => (
            <button
              key={key}
              className={`border-2 border-transparent transition-all duration-150 rounded-lg ${
                filters.typeOfService[key as ServicesType]
                  ? "bg-tertiary-400 hover:bg-tertiary-600 hover:border-tertiary-600"
                  : Object.values(filters.typeOfService).filter(Boolean)
                      .length == 6
                  ? "opacity-50"
                  : "cursor-pointer hover:border-gray-300"
              }`}
              // disabled={
              //   Object.values(filters.typeOfService).filter(Boolean).length ==
              //     6 && !filters.typeOfService[key as ServicesType]
              // }
              onClick={() => {
                setFilters({
                  ...filters,
                  typeOfService: {
                    ...filters.typeOfService,
                    [key]: !filters.typeOfService[key as ServicesType],
                  },
                })
              }}
            >
              <div
                className={`flex flex-col items-center rounded-lg p-2 border-2 border-transparent ${
                  filters.typeOfService[key as ServicesType]
                    ? "border-b-black "
                    : "text-zinc-800 dark:text-zinc-500"
                }`}
              >
                {/* <Icon width='12'>{React.createElement(value.icon)}</Icon> */}
                <img src={value.icon} />
                <span className='text-xs mb-1'>{key}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
