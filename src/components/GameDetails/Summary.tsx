export default function Summary({ summary }: { summary: string }) {
  return (
    <div>
      <h2 className="text-base">Summary</h2>
      <p>{summary}</p>
    </div>
  )
}
