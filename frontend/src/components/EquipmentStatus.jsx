export default function EquipmentStatus({ data }) {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h3 className="font-semibold mb-4">Equipment Health</h3>

      <ul className="space-y-3">
        {data.map((eq, i) => (
          <li key={i} className="flex justify-between">
            <span>{eq.name}</span>
            <span
              className={`text-sm ${
                eq.status === "OK"
                  ? "text-green-600"
                  : eq.status === "Under Maintenance"
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              {eq.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
