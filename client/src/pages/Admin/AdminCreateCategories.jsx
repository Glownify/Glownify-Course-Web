import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategoriesThunk,
  fetchCategoriesThunk,
  deleteCategoryThunk
} from "../../redux/features/category/category.thunk";

const AdminCreateCategories = () => {
  const [newCategory, setNewCategory] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesThunk());
  }, [dispatch]);

  const { categories, loading, error } = useSelector(
    (state) => state.categories,
  );


  const handleAdd = () => {
    if (!newCategory.trim()) return;

    dispatch(createCategoriesThunk({ name: newCategory }));
    setNewCategory("");
  };
  return (
    <div className="p-4 md:p-6 bg-slate-100 min-h-screen">
      {/* Header */}
      <h1 className="text-xl md:text-2xl font-bold mb-4">Categories</h1>

      {/* Add Category Card */}
      <div className="bg-white shadow rounded-xl p-4 md:p-6 mb-6">
        <h2 className="font-semibold mb-3">Create Category</h2>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Enter category name"
            className="flex-1 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />

          <button
            onClick={handleAdd}
            className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition"
          >
            Add
          </button>
        </div>
      </div>

      {/* Categories List */}
      {loading && <p>Loading categories...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories &&
          categories.length > 0 &&
          categories.map((cat, i) => (
            <div
              key={cat._id}
              className="bg-white shadow rounded-xl p-4 hover:shadow-lg transition"
            >
              <p className="font-medium">{cat.name}</p>

              <button
                onClick={() => {
                  if (window.confirm("Delete category?")) {
                    dispatch(deleteCategoryThunk(cat._id));
                  }
                }}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AdminCreateCategories;

// <div>
//     {/* Form to create category would go here */}
//     {loading && <p>Loading categories...</p>}
//     {error && <p style={{ color: "red" }}>{error}</p>}
//     <ul>
//       {categories.map((cat) => (
//         <li key={cat._id}>{cat.name}  chnchl</li>
//       ))}
//     </ul>
//   </div>
