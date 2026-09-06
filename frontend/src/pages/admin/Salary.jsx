
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  CheckCircle,
  Clock,
  IndianRupee,
  X,
} from "lucide-react";

function Salary() {
  const [salaries, setSalaries] = useState([]);
  const [staff, setStaff] = useState([]);

  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [form, setForm] = useState({
    staff: "",
    month: "August",
    year: 2026,
    basic_salary: "",
    allowance: "",
    deduction: "",
    payment_status: "PENDING",
    payment_date: "",
    notes: "",
  });

  const token = localStorage.getItem("access");

  const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // ==========================================
  // FETCH SALARIES
  // ==========================================

  const fetchSalaries = async () => {
    try {
      const response = await api.get("/accounts/salary/");
      setSalaries(response.data);
    } catch (error) {
      console.error("Salary fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // FETCH STAFF
  // ==========================================

  const fetchStaff = async () => {
    try {
      const response = await api.get("/accounts/staff/");
      setStaff(response.data);
    } catch (error) {
      console.error("Staff fetch error:", error);
    }
  };

  useEffect(() => {
    fetchSalaries();
    fetchStaff();
  }, []);

  // ==========================================
  // INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  // OPEN ADD MODAL
  // ==========================================

  const openAddModal = () => {
    setEditingId(null);

    setForm({
      staff: "",
      month: "August",
      year: 2026,
      basic_salary: "",
      allowance: "",
      deduction: "",
      payment_status: "PENDING",
      payment_date: "",
      notes: "",
    });

    setShowModal(true);
  };

  // ==========================================
  // OPEN EDIT MODAL
  // ==========================================

  const openEditModal = (salary) => {
    setEditingId(salary.id);

    setForm({
      staff: salary.staff,
      month: salary.month,
      year: salary.year,
      basic_salary: salary.basic_salary,
      allowance: salary.allowance,
      deduction: salary.deduction,
      payment_status: salary.payment_status,
      payment_date: salary.payment_date || "",
      notes: salary.notes || "",
    });

    setShowModal(true);
  };

  // ==========================================
  // SAVE SALARY
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.staff) {
      alert("Please select staff.");
      return;
    }

    try {
      if (editingId) {
        await api.put(
          `/accounts/salary/${editingId}/`,
          form
        );
      } else {
        await api.post(
          "/accounts/salary/",
          form
        );
      }

      setShowModal(false);

      fetchSalaries();

    } catch (error) {
      console.error("Salary save error:", error);

      alert(
        error.response?.data
          ? JSON.stringify(error.response.data)
          : "Unable to save salary."
      );
    }
  };

  // ==========================================
  // DELETE SALARY
  // ==========================================

  const deleteSalary = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this salary record?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(
        `/accounts/salary/${id}/`
      );

      fetchSalaries();

    } catch (error) {
      console.error("Delete salary error:", error);

      alert("Unable to delete salary.");
    }
  };

  // ==========================================
  // MARK AS PAID
  // ==========================================

  const markAsPaid = async (salary) => {
    try {
      await api.put(
        `/accounts/salary/${salary.id}/`,
        {
          staff: salary.staff,
          month: salary.month,
          year: salary.year,
          basic_salary: salary.basic_salary,
          allowance: salary.allowance,
          deduction: salary.deduction,
          payment_status: "PAID",
          payment_date:
            new Date().toISOString().split("T")[0],
          notes: salary.notes || "",
        }
      );

      fetchSalaries();

    } catch (error) {
      console.error(
        "Mark paid error:",
        error
      );

      alert("Unable to mark salary as paid.");
    }
  };

  // ==========================================
  // FILTER
  // ==========================================

  const filteredSalaries = useMemo(() => {
    return salaries.filter((salary) => {
      const searchText =
        `${salary.staff_name} ${salary.month} ${salary.year}`
          .toLowerCase();

      const matchesSearch =
        searchText.includes(
          search.toLowerCase()
        );

      const matchesStatus =
        statusFilter === "ALL" ||
        salary.payment_status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [salaries, search, statusFilter]);

  // ==========================================
  // SUMMARY
  // ==========================================

  const totalSalary = salaries.reduce(
    (sum, salary) =>
      sum + Number(salary.net_salary || 0),
    0
  );

  const pendingSalary = salaries
    .filter(
      (salary) =>
        salary.payment_status === "PENDING"
    )
    .reduce(
      (sum, salary) =>
        sum + Number(salary.net_salary || 0),
      0
    );

  const paidSalary = salaries
    .filter(
      (salary) =>
        salary.payment_status === "PAID"
    )
    .reduce(
      (sum, salary) =>
        sum + Number(salary.net_salary || 0),
      0
    );

  const formatMoney = (amount) => {
    return new Intl.NumberFormat(
      "en-IN",
      {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }
    ).format(amount);
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="p-6">

      {/* HEADER */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Staff Salary
          </h1>

          <p className="text-gray-500 mt-1">
            Manage staff salaries and payments
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg font-semibold"
        >
          <Plus size={20} />
          Add Salary
        </button>

      </div>

      {/* SUMMARY CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">

        <div className="bg-white rounded-xl shadow p-5 border">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-gray-500 text-sm">
                Total Salary
              </p>

              <h2 className="text-2xl font-bold mt-1">
                {formatMoney(totalSalary)}
              </h2>
            </div>

            <div className="bg-green-100 p-3 rounded-full">
              <IndianRupee
                className="text-green-600"
                size={24}
              />
            </div>

          </div>

        </div>


        <div className="bg-white rounded-xl shadow p-5 border">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-gray-500 text-sm">
                Pending Salary
              </p>

              <h2 className="text-2xl font-bold mt-1">
                {formatMoney(pendingSalary)}
              </h2>
            </div>

            <div className="bg-yellow-100 p-3 rounded-full">
              <Clock
                className="text-yellow-600"
                size={24}
              />
            </div>

          </div>

        </div>


        <div className="bg-white rounded-xl shadow p-5 border">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-gray-500 text-sm">
                Paid Salary
              </p>

              <h2 className="text-2xl font-bold mt-1">
                {formatMoney(paidSalary)}
              </h2>
            </div>

            <div className="bg-blue-100 p-3 rounded-full">
              <CheckCircle
                className="text-blue-600"
                size={24}
              />
            </div>

          </div>

        </div>

      </div>

      {/* SEARCH + FILTER */}

      <div className="bg-white rounded-xl shadow border p-4 mb-5">

        <div className="flex flex-col md:flex-row gap-4">

          <div className="relative flex-1">

            <Search
              size={19}
              className="absolute left-3 top-3 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search staff..."
              className="w-full border rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

          </div>

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="border rounded-lg px-4 py-2.5"
          >
            <option value="ALL">
              All Status
            </option>

            <option value="PENDING">
              Pending
            </option>

            <option value="PAID">
              Paid
            </option>

          </select>

        </div>

      </div>

      {/* TABLE */}

      <div className="bg-white rounded-xl shadow border overflow-x-auto">

        {loading ? (

          <div className="p-10 text-center text-gray-500">
            Loading salaries...
          </div>

        ) : filteredSalaries.length === 0 ? (

          <div className="p-10 text-center text-gray-500">
            No salary records found.
          </div>

        ) : (

          <table className="w-full">

            <thead className="bg-gray-50 border-b">

              <tr>

                <th className="text-left px-5 py-4">
                  Staff
                </th>

                <th className="text-left px-5 py-4">
                  Month
                </th>

                <th className="text-left px-5 py-4">
                  Basic
                </th>

                <th className="text-left px-5 py-4">
                  Allowance
                </th>

                <th className="text-left px-5 py-4">
                  Deduction
                </th>

                <th className="text-left px-5 py-4">
                  Net Salary
                </th>

                <th className="text-left px-5 py-4">
                  Status
                </th>

                <th className="text-center px-5 py-4">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredSalaries.map(
                (salary) => (

                  <tr
                    key={salary.id}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="px-5 py-4">

                      <p className="font-semibold">
                        {salary.staff_name}
                      </p>

                      <p className="text-xs text-gray-500">
                        {salary.staff_email}
                      </p>

                    </td>

                    <td className="px-5 py-4">
                      {salary.month}{" "}
                      {salary.year}
                    </td>

                    <td className="px-5 py-4">
                      {formatMoney(
                        salary.basic_salary
                      )}
                    </td>

                    <td className="px-5 py-4 text-green-600">
                      +{" "}
                      {formatMoney(
                        salary.allowance
                      )}
                    </td>

                    <td className="px-5 py-4 text-red-600">
                      -{" "}
                      {formatMoney(
                        salary.deduction
                      )}
                    </td>

                    <td className="px-5 py-4 font-bold">
                      {formatMoney(
                        salary.net_salary
                      )}
                    </td>

                    <td className="px-5 py-4">

                      {salary.payment_status ===
                      "PAID" ? (

                        <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                          <CheckCircle size={15} />
                          Paid
                        </span>

                      ) : (

                        <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
                          <Clock size={15} />
                          Pending
                        </span>

                      )}

                    </td>

                    <td className="px-5 py-4">

                      <div className="flex justify-center gap-2">

                        {salary.payment_status !==
                          "PAID" && (

                          <button
                            onClick={() =>
                              markAsPaid(
                                salary
                              )
                            }
                            title="Mark as Paid"
                            className="p-2 rounded-lg bg-green-100 text-green-700 hover:bg-green-200"
                          >
                            <CheckCircle
                              size={17}
                            />
                          </button>

                        )}

                        <button
                          onClick={() =>
                            openEditModal(
                              salary
                            )
                          }
                          title="Edit"
                          className="p-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200"
                        >
                          <Pencil
                            size={17}
                          />
                        </button>

                        <button
                          onClick={() =>
                            deleteSalary(
                              salary.id
                            )
                          }
                          title="Delete"
                          className="p-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200"
                        >
                          <Trash2
                            size={17}
                          />
                        </button>

                      </div>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        )}

      </div>

      {/* ADD / EDIT MODAL */}

      {showModal && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

            <div className="flex items-center justify-between p-6 border-b">

              <div>

                <h2 className="text-xl font-bold">
                  {editingId
                    ? "Edit Salary"
                    : "Add Salary"}
                </h2>

                <p className="text-sm text-gray-500">
                  Enter staff salary details
                </p>

              </div>

              <button
                onClick={() =>
                  setShowModal(false)
                }
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={22} />
              </button>

            </div>

            <form
              onSubmit={handleSubmit}
              className="p-6 space-y-5"
            >

              {/* STAFF */}

              <div>

                <label className="block text-sm font-semibold mb-2">
                  Staff
                </label>

                <select
                  name="staff"
                  value={form.staff}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-4 py-3"
                >

                  <option value="">
                    Select Staff
                  </option>

                  {staff.map((person) => (

                    <option
                      key={person.id}
                      value={person.id}
                    >
                      {person.first_name
                        ? `${person.first_name} ${person.last_name || ""}`
                        : person.username}
                    </option>

                  ))}

                </select>

              </div>

              {/* MONTH + YEAR */}

              <div className="grid grid-cols-2 gap-4">

                <div>

                  <label className="block text-sm font-semibold mb-2">
                    Month
                  </label>

                  <select
                    name="month"
                    value={form.month}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-3"
                  >

                    {[
                      "January",
                      "February",
                      "March",
                      "April",
                      "May",
                      "June",
                      "July",
                      "August",
                      "September",
                      "October",
                      "November",
                      "December",
                    ].map((month) => (

                      <option
                        key={month}
                        value={month}
                      >
                        {month}
                      </option>

                    ))}

                  </select>

                </div>

                <div>

                  <label className="block text-sm font-semibold mb-2">
                    Year
                  </label>

                  <input
                    type="number"
                    name="year"
                    value={form.year}
                    onChange={handleChange}
                    min="2020"
                    max="2100"
                    required
                    className="w-full border rounded-lg px-4 py-3"
                  />

                </div>

              </div>

              {/* SALARY */}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <div>

                  <label className="block text-sm font-semibold mb-2">
                    Basic Salary
                  </label>

                  <input
                    type="number"
                    name="basic_salary"
                    value={form.basic_salary}
                    onChange={handleChange}
                    min="0"
                    required
                    className="w-full border rounded-lg px-4 py-3"
                    placeholder="20000"
                  />

                </div>

                <div>

                  <label className="block text-sm font-semibold mb-2">
                    Allowance
                  </label>

                  <input
                    type="number"
                    name="allowance"
                    value={form.allowance}
                    onChange={handleChange}
                    min="0"
                    className="w-full border rounded-lg px-4 py-3"
                    placeholder="3000"
                  />

                </div>

                <div>

                  <label className="block text-sm font-semibold mb-2">
                    Deduction
                  </label>

                  <input
                    type="number"
                    name="deduction"
                    value={form.deduction}
                    onChange={handleChange}
                    min="0"
                    className="w-full border rounded-lg px-4 py-3"
                    placeholder="1000"
                  />

                </div>

              </div>

              {/* STATUS */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>

                  <label className="block text-sm font-semibold mb-2">
                    Payment Status
                  </label>

                  <select
                    name="payment_status"
                    value={form.payment_status}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-3"
                  >

                    <option value="PENDING">
                      Pending
                    </option>

                    <option value="PAID">
                      Paid
                    </option>

                  </select>

                </div>

                <div>

                  <label className="block text-sm font-semibold mb-2">
                    Payment Date
                  </label>

                  <input
                    type="date"
                    name="payment_date"
                    value={form.payment_date}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-3"
                  />

                </div>

              </div>

              {/* NOTES */}

              <div>

                <label className="block text-sm font-semibold mb-2">
                  Notes
                </label>

                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  rows="3"
                  className="w-full border rounded-lg px-4 py-3"
                  placeholder="Optional notes..."
                />

              </div>

              {/* PREVIEW */}

              <div className="bg-green-50 border border-green-200 rounded-xl p-4">

                <p className="text-sm text-gray-500">
                  Estimated Net Salary
                </p>

                <p className="text-2xl font-bold text-green-700 mt-1">

                  {formatMoney(
                    Number(
                      form.basic_salary || 0
                    ) +
                      Number(
                        form.allowance || 0
                      ) -
                      Number(
                        form.deduction || 0
                      )
                  )}

                </p>

              </div>

              {/* BUTTONS */}

              <div className="flex justify-end gap-3 pt-2">

                <button
                  type="button"
                  onClick={() =>
                    setShowModal(false)
                  }
                  className="px-5 py-2.5 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
                >
                  {editingId
                    ? "Update Salary"
                    : "Save Salary"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default Salary;

