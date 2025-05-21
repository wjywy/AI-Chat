interface DividerProps {
  text?: string
}

export default function Divider({ text = '或' }: DividerProps) {
  return (
    <div className="flex items-center my-4">
      <div className="flex-grow h-px bg-gray-200"></div>
      <div className="px-4 text-gray-500">{text}</div>
      <div className="flex-grow h-px bg-gray-200"></div>
    </div>
  )
}
