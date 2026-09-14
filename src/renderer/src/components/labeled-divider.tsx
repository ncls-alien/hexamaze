interface LabeledDividerProps {
  startLabel?: string
  endLabel?: string
}

function LabeledDivider({ startLabel, endLabel }: LabeledDividerProps): React.JSX.Element {
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      {startLabel && (
        <>
          <span className="h-4 border border-neutral-600"></span>
          <h2 className="text-neutral-600 writing-sideways-lr">{startLabel}</h2>
        </>
      )}
      <span className="grow border border-neutral-600"></span>
      {endLabel && (
        <>
          <h2 className="text-neutral-600 writing-sideways-lr">{endLabel}</h2>
          <span className="h-4 border border-neutral-600"></span>
        </>
      )}
    </div>
  )
}

export default LabeledDivider
