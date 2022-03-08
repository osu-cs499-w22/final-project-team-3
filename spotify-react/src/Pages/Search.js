import React from "react";
import { useSearchParams } from "react-router-dom";
function Search(test) {
    const [searchParams, setSearchParams] = useSearchParams();
    return <h1>Search</h1>;
}

export default Search;
