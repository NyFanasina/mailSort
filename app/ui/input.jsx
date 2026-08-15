export default function Input({ register, name, error, className = "", ...rest }) {
  return (
    <div>
      <input
        {...(register ? register(name) : {})}
        {...rest}
        className={`w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm
             focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 ${className}`}
      />
      {error && <span>{error}</span>}
    </div>
  );
}
