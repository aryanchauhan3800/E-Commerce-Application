import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../../context/search';

const Searchform = () => {
    const [values, setValues] = useSearch();
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.get(
          `/product/search/${values.keyword}`
        );
        setValues({ ...values, results: data });
        console.log(values);
        navigate("/search");
      } catch (error) {
        console.log(error);
      }
    };
  return (
    <div>
      <form
        className="d-flex search-form"
        role="search"
        onSubmit={handleSubmit}
      >
        <input
          className="form-control me-2"
          style={{border:"2px solid black"}}
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </div>
  )
}

export default Searchform