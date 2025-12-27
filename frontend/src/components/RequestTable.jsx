export default function RequestTable({ data }) {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h3 className="font-semibold mb-4">Active Maintenance Requests</h3>

      <table className="w-full text-sm">
        <thead className="text-gray-500 border-b">
          <tr>
            <th className="text-left py-2">Issue</th>
            <th>Equipment</th>
            <th>Technician</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {data.map(req => (
            <tr key={req.id} className="border-b last:border-none">
              <td className="py-3">{req.subject}</td>
              <td className="text-center">{req.equipment}</td>
              <td className="text-center">{req.technician}</td>
              <td className="text-center">
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    req.status === "In Progress"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {req.status}
                </span>
              </td>
              <td className="text-center">{req.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
