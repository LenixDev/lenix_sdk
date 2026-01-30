export default ({ args }: { args: unknown }) => (
  args?.map(({ placeholder, required }, index) => 
    (
      <input
        key={index}
        name={`input-${index}`}
        type="text"
        placeholder={placeholder}
        required={required}
      />
    )
  )
)