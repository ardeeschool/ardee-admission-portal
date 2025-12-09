import React, { useMemo, useState } from "react";
import {
  CheckSquare,
  Square,
  Search as SearchIcon,
  MoreHorizontal,
  User,
  Edit3,
  Check,
  X,
} from "lucide-react";

// Static mock data
const initialApplicants = [
  {
    id: "APPL-1001",
    name: "Yashasvi Jaiswal",
    parent: "Rohit Sharma",
    status: "Pending",
    lastUpdate: "2025-11-30",
    counselor: "Neha Verma",
  },
  {
    id: "APPL-1002",
    name: "Rohit Sharma",
    parent: "Sunil Patel",
    status: "Verified",
    lastUpdate: "2025-12-01",
    counselor: "Rohit Singh",
  },
  {
    id: "APPL-1003",
    name: "Virat Kholi",
    parent: "Pooja Gupta",
    status: "Approved",
    lastUpdate: "2025-12-04",
    counselor: "Neha Verma",
  },
  {
    id: "APPL-1004",
    name: "Suresh Iyer",
    parent: "Suresh Rao",
    status: "Rejected",
    lastUpdate: "2025-11-28",
    counselor: "Priya Nair",
  },
];

export default function ApplicantManagement() {
  const [applicants, setApplicants] = useState(initialApplicants);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState({ key: "name", dir: "asc" });
  const [selected, setSelected] = useState(new Set());
  const [editing, setEditing] = useState(null); // applicant object being edited

  // derived list
  const visible = useMemo(() => {
    let list = [...applicants];

    // search
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.parent.toLowerCase().includes(q) ||
          a.id.toLowerCase().includes(q) ||
          a.counselor.toLowerCase().includes(q)
      );
    }

    // status filter
    if (statusFilter !== "All") {
      list = list.filter((a) => a.status === statusFilter);
    }

    // sort
    list.sort((a, b) => {
      const k = sortBy.key;
      const dir = sortBy.dir === "asc" ? 1 : -1;
      if (k === "lastUpdate") {
        return (
          (new Date(a.lastUpdate) - new Date(b.lastUpdate)) * dir
        );
      }
      return a[k].localeCompare(b[k]) * dir;
    });

    return list;
  }, [applicants, query, statusFilter, sortBy]);

  // selection helpers
  const toggleSelect = (id) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };
  const selectAllVisible = () => {
    const next = new Set(selected);
    visible.forEach((v) => next.add(v.id));
    setSelected(next);
  };
  const clearSelection = () => setSelected(new Set());

  // bulk actions
  const applyBulk = (action) => {
    if (selected.size === 0) return;
    setApplicants((prev) =>
      prev.map((p) =>
        selected.has(p.id)
          ? {
              ...p,
              status:
                action === "approve"
                  ? "Approved"
                  : action === "reject"
                  ? "Rejected"
                  : action === "verify"
                  ? "Verified"
                  : p.status,
              lastUpdate: new Date().toISOString().slice(0, 10),
            }
          : p
      )
    );
    clearSelection();
  };

  // single update from modal
  const saveEdit = (updated) => {
    setApplicants((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    setEditing(null);
  };

  const toggleSort = (key) => {
    setSortBy((s) => {
      if (s.key === key) return { key, dir: s.dir === "asc" ? "desc" : "asc" };
      return { key, dir: "asc" };
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Applicant Management</h1>
            <p className="text-sm text-gray-600">View, search, update and perform bulk actions on applicants.</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center bg-white border rounded-lg px-3 py-2 shadow-sm">
              <SearchIcon className="w-4 h-4 text-gray-500 mr-2" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name, parent, id or counselor"
                className="outline-none text-sm w-64"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white border rounded-lg px-3 py-2 text-sm"
            >
              <option>All</option>
              <option>Pending</option>
              <option>Verified</option>
              <option>Approved</option>
              <option>Rejected</option>
            </select>

            <div className="flex items-center gap-2">
              <button
                onClick={() => applyBulk("approve")}
                className="px-3 py-2 bg-green-600 text-white rounded-md text-sm shadow-sm"
              >
                Approve
              </button>
              <button
                onClick={() => applyBulk("reject")}
                className="px-3 py-2 bg-red-600 text-white rounded-md text-sm shadow-sm"
              >
                Reject
              </button>
              <button
                onClick={() => applyBulk("verify")}
                className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm shadow-sm"
              >
                Verify
              </button>
            </div>
          </div>
        </header>

        <div className="bg-white border rounded-lg shadow-sm overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-gray-50 text-gray-700 text-sm">
              <tr>
                <th className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={visible.every((v) => selected.has(v.id)) && visible.length > 0}
                      onChange={(e) => (e.target.checked ? selectAllVisible() : clearSelection())}
                    />
                  </div>
                </th>
                <th className="px-4 py-3 text-left cursor-pointer" onClick={() => toggleSort("name")}>
                  Applicant
                </th>
                <th className="px-4 py-3 text-left">Parent</th>
                <th className="px-4 py-3 text-left">Application ID</th>
                <th className="px-4 py-3 text-left cursor-pointer" onClick={() => toggleSort("status")}>
                  Status
                </th>
                <th className="px-4 py-3 text-left cursor-pointer" onClick={() => toggleSort("lastUpdate")}>
                  Last Update
                </th>
                <th className="px-4 py-3 text-left">Counselor</th>
                <th className="px-4 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {visible.map((a) => (
                <tr key={a.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selected.has(a.id)}
                      onChange={() => toggleSelect(a.id)}
                    />
                  </td>
                  <td className="px-4 py-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <div className="font-medium">{a.name}</div>
                      <div className="text-xs text-gray-500">{a.id}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3">{a.parent}</td>
                  <td className="px-4 py-3">{a.id}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold inline-block ${
                        a.status === "Approved"
                          ? "bg-green-100 text-green-800"
                          : a.status === "Rejected"
                          ? "bg-red-100 text-red-800"
                          : a.status === "Verified"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {a.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">{a.lastUpdate}</td>
                  <td className="px-4 py-3">{a.counselor}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditing(a)}
                        className="flex items-center gap-2 px-2 py-1 border rounded text-sm"
                      >
                        <Edit3 className="w-4 h-4" /> Edit
                      </button>

                      <div className="relative inline-block">
                        <MoreHorizontal className="w-5 h-5 cursor-pointer" />
                        {/* in a real app we'd open a menu here */}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}

              {visible.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Edit modal */}
        {editing && (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Edit Applicant</h3>
                <button onClick={() => setEditing(null)} className="p-1 rounded hover:bg-gray-100">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <EditForm applicant={editing} onCancel={() => setEditing(null)} onSave={saveEdit} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function EditForm({ applicant, onCancel, onSave }) {
  const [form, setForm] = useState({ ...applicant });

  return (
    <div>
      <label className="block text-sm text-gray-700">Applicant Name</label>
      <input
        className="w-full border rounded px-3 py-2 mt-1 mb-3"
        value={form.name}
        onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
      />

      <label className="block text-sm text-gray-700">Parent Name</label>
      <input
        className="w-full border rounded px-3 py-2 mt-1 mb-3"
        value={form.parent}
        onChange={(e) => setForm((s) => ({ ...s, parent: e.target.value }))}
      />

      <label className="block text-sm text-gray-700">Counselor</label>
      <input
        className="w-full border rounded px-3 py-2 mt-1 mb-3"
        value={form.counselor}
        onChange={(e) => setForm((s) => ({ ...s, counselor: e.target.value }))}
      />

      <label className="block text-sm text-gray-700">Status</label>
      <select
        className="w-full border rounded px-3 py-2 mt-1 mb-4"
        value={form.status}
        onChange={(e) => setForm((s) => ({ ...s, status: e.target.value }))}
      >
        <option>Pending</option>
        <option>Verified</option>
        <option>Approved</option>
        <option>Rejected</option>
      </select>

      <div className="flex justify-end gap-2">
        <button className="px-3 py-2 rounded border" onClick={onCancel}>
          Cancel
        </button>
        <button
          className="px-3 py-2 rounded bg-indigo-600 text-white"
          onClick={() => onSave({ ...form, lastUpdate: new Date().toISOString().slice(0, 10) })}
        >
          Save
        </button>
      </div>
    </div>
  );
}
