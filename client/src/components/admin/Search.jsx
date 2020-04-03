import React from 'react';

import debounce from '../../utils/debounce';

const Search = (props) => {
    const onChange = (value) => {
        props.onValueChange(value);
    };
    const debounceOnChange = React.useCallback(debounce(onChange, 400), []);
    return (
        <input
            className="form-control search"
            placeholder="Search..."
            onChange={(e) => debounceOnChange(e.target.value)}
        />
    );
};

export default Search;