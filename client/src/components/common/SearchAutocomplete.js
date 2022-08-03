import React, { useState, useEffect, useRef } from 'react';
import './SearchAutocomplete.css';


const SearchAutocomplete = ({ searchItems, items, setItems, label }) => {

    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedTerm, setDebouncedTerm] = useState('');
    const [isOpen, setIsOpen] = useState(true);
    const searchRef = useRef(null);

    useEffect(() => {

        if (isOpen) {

            function handleClickOutside(event) {
                if (searchRef.current && !searchRef.current.contains(event.target)) {
                    setIsOpen(false);
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }

    }, [searchRef, isOpen]);

    useEffect(() => {
        if (searchTerm.length > 2) {

            const timeoutId = setTimeout(() => {
                setDebouncedTerm(searchTerm);

            }, 200);
            return () => {
                clearTimeout(timeoutId);
            };
        } else {
            setDebouncedTerm('');
            setItems([]);
        }

    }, [searchTerm]);

    useEffect(async () => {
        try {
            const foundItems = await searchItems(debouncedTerm);
            setItems(foundItems);
        } catch (e) {
            //Handle this error sometime
            setItems([]);
        }

    }, [debouncedTerm])



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (searchTerm.length > 2) {
            try {
                const foundItems = await searchItems(searchTerm);
                //Check if the searchTerm still exists after server returns
                setItems(foundItems)
            } catch (e) {
                setItems([]);
            }

        }
    }

    const renderItems = () => {
        const rendered = items.map(item => (
            <li onClick={(e) => {
                setSearchTerm(e.target.innerHTML);
                setIsOpen(false);
            }} key={item.id}>{item.name}</li>
        ))
        return rendered;
    }


    return (
        <div ref={searchRef} className='searchform'>
            <form onSubmit={handleSubmit}>
                <label htmlFor='searchInput'>{label}</label>
                <input

                    onFocus={() => setIsOpen(true)}
                    autoComplete='off'
                    id='searchInput'
                    className='searchbar'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}>
                </input>

            </form>
            <ul className='autocomplete'>
                {isOpen && renderItems()}
            </ul>
        </div >
    )
}

export default SearchAutocomplete;
