import React,{ useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { createCategoriesThunk, fetchCategoriesThunk } from "../../redux/features/category/category.thunk";

const CreateCategory = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategoriesThunk());
  }, [dispatch]);

  console.log("Categories in CreateCategory component:", categories); // Debug log

  return (
    <div>
      {/* Form to create category would go here */}
      {loading && <p>Loading categories...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {categories.map((cat) => (
          <li key={cat._id}>{cat.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default CreateCategory