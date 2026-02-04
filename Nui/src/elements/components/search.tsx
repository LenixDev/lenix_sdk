export const Search = ({ setSearch }: { setSearch: (state: string) => void }) =>
<input
  type="text"
  placeholder='Search for a feature'
  className="text-black"
  onChange={({ target: { value } }) => setSearch(value) }
/>

export default Search