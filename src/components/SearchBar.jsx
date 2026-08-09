function SearchBar({
  city,
  setCity,
  handleSearch,
}) {
  return (
    <div className="search-container">

      <div className="search-box">

        <span className="search-icon">
          🔍
        </span>

        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) =>
            setCity(e.target.value)
          }
          onKeyDown={(e) => {

            if (e.key === "Enter") {
              handleSearch();
            }

          }}
        />

        <button onClick={handleSearch}>
          Search
        </button>

      </div>

    </div>
  );
}

export default SearchBar;