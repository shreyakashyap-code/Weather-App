function SearchBar({city, setCity, handleSearch}){
    return(
        <div className="search-box">
            <input 
              type="text"
              placeholder="Enter city..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={(e) => {
                if(e.key === "Enter") {
                    handleSearch();
                }
              }}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    )
}
export default SearchBar;