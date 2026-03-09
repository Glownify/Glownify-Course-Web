import React, { useEffect, useState } from "react";
import { fetchTrainerApplicationsThunk } from "../../redux/features/submittedApplication/submittedApplication.thunk";
import { useDispatch, useSelector } from "react-redux";

const Students = () => {
  const dispatch = useDispatch();

  const { application = [], loading } = useSelector(
    (state) => state.submittedApplication
  );

  const [selectedApp, setSelectedApp] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchTrainerApplicationsThunk());
  }, [dispatch]);

  const handleViewDetails = (app) => {
    setSelectedApp(app);
    setShowModal(true);
  };

  // Helper to extract data from answers array
  const getFieldValue = (answers, fieldName) => {
    const field = answers?.find((ans) =>
      ans.label?.toLowerCase().includes(fieldName.toLowerCase())
    );
    return field?.value || "N/A";
  };

  return (
    <div className="py-6">

      {/* PAGE TITLE */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
          Students Applications
        </h1>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="text-center py-10 text-gray-500">
          Loading...
        </div>
      )}

      {/* NO DATA */}
      {!loading && application.length === 0 && (
        <div className="text-center py-10 text-gray-500 bg-white rounded-xl shadow-sm">
          No applications found.
        </div>
      )}

      {/* TABLE */}
      {!loading && application.length > 0 && (
        <div className="bg-white shadow-sm rounded-xl border border-gray-100 overflow-hidden">

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
                <tr>
                  <th className="px-6 py-4">Student Name</th>
                  <th className="px-6 py-4">Contact</th>
                  <th className="px-6 py-4">Course</th>
                  <th className="px-6 py-4">Enrolled On</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {application.map((app) => (
                  <tr key={app._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {app.studentId?.name ||
                        getFieldValue(app.answers, "name")}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {app.studentId?.email ||
                        getFieldValue(app.answers, "email")}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {app.courseId?.title || "N/A"}
                    </td>

                    <td className="px-6 py-4 text-gray-500">
                      {new Date(app.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          app.status === "applied"
                            ? "bg-yellow-100 text-yellow-700"
                            : app.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleViewDetails(app)}
                        className="px-3 py-1 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card Layout */}
          <div className="md:hidden divide-y">
            {application.map((app) => (
              <div key={app._id} className="p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-800">
                    {app.studentId?.name ||
                      getFieldValue(app.answers, "name")}
                  </span>

                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      app.status === "applied"
                        ? "bg-yellow-100 text-yellow-700"
                        : app.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {app.status}
                  </span>
                </div>

                <p className="text-sm text-gray-600">
                  Email:{" "}
                  {app.studentId?.email ||
                    getFieldValue(app.answers, "email")}
                </p>

                <p className="text-sm text-gray-600">
                  Course: {app.courseId?.title || "N/A"}
                </p>

                <p className="text-xs text-gray-500">
                  Enrolled On:{" "}
                  {new Date(app.createdAt).toLocaleDateString()}
                </p>

                <button
                  onClick={() => handleViewDetails(app)}
                  className="mt-2 w-full py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= MODAL ================= */}

      {showModal && selectedApp && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">

          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg max-h-[80vh] overflow-y-auto p-6 relative">

            {/* CLOSE BUTTON */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>

            {/* TITLE */}
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Application Details
            </h2>

            {/* STUDENT INFO */}
            <div className="space-y-2 mb-5 text-sm">

              <div className="grid grid-cols-2 gap-2">
                <p className="text-gray-500">Name</p>
                <p className="font-medium">
                  {selectedApp.studentId?.name}
                </p>

                <p className="text-gray-500">Email</p>
                <p className="font-medium">
                  {selectedApp.studentId?.email}
                </p>

                <p className="text-gray-500">Phone</p>
                <p className="font-medium">
                  {selectedApp.studentId?.phone}
                </p>

                <p className="text-gray-500">Course</p>
                <p className="font-medium">
                  {selectedApp.courseId?.title}
                </p>

                <p className="text-gray-500">Application ID</p>
                <p className="font-medium">
                  {selectedApp.applicationId}
                </p>

                <p className="text-gray-500">Status</p>
                <p className="font-medium capitalize">
                  {selectedApp.status}
                </p>
              </div>

            </div>

            {/* ANSWERS */}
            <div>

              <h3 className="font-medium text-gray-700 mb-3">
                Submitted Answers
              </h3>

              <div className="space-y-3">

                {selectedApp.answers?.map((ans, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-3 bg-gray-50"
                  >
                    <p className="text-xs text-gray-500 mb-1">
                      {ans.label}
                    </p>

                    <p className="text-sm font-medium text-gray-800">
                      {ans.value || "N/A"}
                    </p>
                  </div>
                ))}

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default Students;