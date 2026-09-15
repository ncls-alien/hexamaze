interface ColorButtonProps {
  color: string
  active: boolean
  onPress: () => void
}

function ColorButton({ color, active, onPress: onClick }: ColorButtonProps): React.JSX.Element {
  return (
    <button
      className="px-1.5 py-2.5 transition-transform duration-200 active:scale-90"
      onTouchStart={onClick}
    >
      <svg
        width="71"
        height="64"
        viewBox="0 0 71 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M48.6598 2L21.9932 2C20.8241 2.0012 19.6759 2.30981 18.6637 2.89487C17.6515 3.47993 16.811 4.32088 16.2265 5.33334L2.89316 28.6667C2.30804 29.6801 2 30.8298 2 32C2 33.1702 2.30804 34.3199 2.89316 35.3333L16.2265 58.6667C16.811 59.6791 17.6515 60.5201 18.6637 61.1051C19.6759 61.6902 20.8241 61.9988 21.9932 62L48.6598 62C49.8289 61.9988 50.9771 61.6902 51.9893 61.1051C53.0014 60.5201 53.842 59.6791 54.4265 58.6667L67.7598 35.3333C68.345 34.3199 68.653 33.1702 68.653 32C68.653 30.8298 68.345 29.6801 67.7598 28.6667L54.4265 5.33334C53.842 4.32088 53.0014 3.47993 51.9893 2.89487C50.9771 2.30981 49.8289 2.0012 48.6598 2Z"
          fill={active ? color : 'none'}
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}

export default ColorButton
