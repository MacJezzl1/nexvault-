const roles = ["owner", "admin", "manager", "member", "viewer", "guest"];

export function RolePicker() {
  return (
    <select className="rounded-xl border border-black/10 bg-white px-3 py-2 text-sm">
      {roles.map((role) => (
        <option key={role} value={role}>
          {role}
        </option>
      ))}
    </select>
  );
}
