type Props = {
  data: { [key: string]: string };
  editable?: boolean;
  onChange?: (data: { [key: string]: string }) => void;
};

export default function FormDisplay({ data, editable = false, onChange }: Props) {
  const handleInputChange = (key: string, value: string) => {
    if (!onChange) return;
    onChange({ ...data, [key]: value });
  };

  return (
    <div className="space-y-4">
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className="flex flex-col md:flex-row md:items-center gap-2">
          <label className="w-48 font-mono text-sm text-gray-600">{key}:</label>
          {editable ? (
            <input
              value={value}
              onChange={(e) => handleInputChange(key, e.target.value)}
              className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
            />
          ) : (
            <p className="text-gray-800 text-sm">{value}</p>
          )}
        </div>
      ))}
    </div>
  );
}
// This component displays structured form data.
// It can be editable or read-only based on the `editable` prop.