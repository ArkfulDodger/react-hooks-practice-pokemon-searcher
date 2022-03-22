import React from "react";

function Search({ setSearchInput, searchInput }) {

  function handleChange({ target: { value } }) {
    setSearchInput(value);
  }

  return (
    <div className="ui search">
      <div className="ui icon input">
        <input onChange={handleChange} value={searchInput} className="prompt" />
        <i className="search icon" />
      </div>
    </div>
  );
}

export default Search;
