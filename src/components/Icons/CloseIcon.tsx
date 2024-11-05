function CloseIcon({ onClick }: { onClick: () => void }) {
  return (
    <span
      onClick={onClick}
      className="absolute right-4 top-3 cursor-pointer hover:opacity-100 hover:bg-black hover:text-white"
    >
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
