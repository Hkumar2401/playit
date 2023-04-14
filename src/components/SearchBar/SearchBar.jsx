import React, { useState, useEffect, useRef } from 'react'
import './searchbar.css'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { Link } from 'react-router-dom';


const SearchBar = ({ search, setSearch, searchIconOnFocus }) => {

    const BASE_URL = 'https://youtube138.p.rapidapi.com';

    const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([]);

    const [selectedOption, setSelectedOption] = useState(false);

    const SuggestionBoxRef = useRef();




    useEffect(() => {
        const fetchAutocompleteData = async () => {
            if (search === '') {
                SuggestionBoxRef.current.style.display = 'none';
                return;
            }

            try {

                const options = {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
                        'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
                    }
                };


                const res = await fetch(`${BASE_URL}/auto-complete/?q=${search}&hl=en&gl=US`, options);
                const data = await res.json();
                // console.log(data.results);
                setAutocompleteSuggestions(data.results);
                if (!selectedOption && SuggestionBoxRef.current) {
                    SuggestionBoxRef.current.style.display = 'block';
                }
            } catch (error) {
                console.log(error);
            }
        }

        fetchAutocompleteData();
    }, [search, selectedOption]);


    const handleClick = (item) => {
        setSearch(item);
        setSelectedOption(true);
    }

    return (
        <div>
            <input
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setSelectedOption(false);
                }}
                className='search-input'
                onFocus={() => searchIconOnFocus.current.style.display = 'block'}
                onBlur={() => searchIconOnFocus.current.style.display = 'none'}
                placeholder='Search'
                type="text"
            />

            {
                !selectedOption &&
                <div ref={SuggestionBoxRef} className='suggestion-box pt-5 mt-1 pb-5 absolute bg-white rounded-lg'>
                    {
                        autocompleteSuggestions.map((item, i) => {
                            return (
                                <Link key={i} to={`search/${item}`} onClick={() => handleClick(item)}>
                                    <div
                                        key={i}
                                        className='p-1 pl-3 flex color'>
                                        <SearchRoundedIcon />
                                        <p className='pl-4'>{item}</p>
                                    </div>
                                </Link>
                            );
                        })
                    }
                </div>

            }
        </div>
    )
}

export default SearchBar