export default ({ args }: { args: Feature["args"] }) => {
  return args?.map(({ placeholder, required }, index) => 
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
}