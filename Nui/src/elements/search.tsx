export default ({ onChange }: { onChange: (state: string) => void }) => (
  <input
    type="text"
    placeholder='Search for a feature'
    className="text-black"
    onChange={({ target: { value } }) => onChange(value) }
  />
)