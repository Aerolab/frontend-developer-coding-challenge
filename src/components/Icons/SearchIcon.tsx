import React from "react"

function SearchIcon({ opacityIcon }: { opacityIcon: string }) {
  return (
    <span className={`absolute left-4 top-3`} style={{ opacity: opacityIcon }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-search"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    </span>
  )
}

export default SearchIcon
