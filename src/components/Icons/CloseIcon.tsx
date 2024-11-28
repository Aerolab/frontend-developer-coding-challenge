// Manage closing the results
// No logic just css - using "peer" selector to change visibility of elements
function CloseIcon() {
  return (
    <span className="hidden peer-focus:inline hover:inline absolute right-4 top-3 cursor-pointer hover:bg-black hover:text-white">
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
        className="lucide lucide-x"
      >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    </span>
  )
}

export default CloseIcon
