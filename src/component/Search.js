import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = () => {
    const [term, setTerm] = useState('programming');
    const [debouncedTerm, setDebouncedTerm] = useState(term);
    const [results, setResults] = useState([]);

    useEffect(()=>{
        const timerId = setTimeout(() => {
            setDebouncedTerm(term);
        }, 1000);

        return () => {
            clearTimeout(timerId);
        };
    }, [term]);

    useEffect(()=>{
        const search = async () => {
            const {data} =  await axios.get('https://en.wikipedia.org/w/api.php', {
                 params: {
                     action: 'query',
                     list: 'search',
                     origin: '*',
                     format: 'json',
                     srsearch: debouncedTerm,
                 },
             });
             setResults(data.query.search);
         };

         search();

    }, [debouncedTerm])

    
    const resultRenderd = results.map((result)=>{
        return(
            <div key={result.pageid} className='item'>
                <div className='right floated content'>
                    <a className='ui button' target='_blank' href={`https://en.wikipedia.org?curid=${result.pageid}`}>Go</a>
                </div>
                <div className='content'>
                    <div className='header'>
                        {result.title}
                    </div>
                </div>
                <span dangerouslySetInnerHTML={{__html: result.snippet}}></span>

            </div>
        )
    })

    return (
        <React.Fragment>
            <div className='ui form'>
                <div className='field'>
                    <label>Enter Search Term</label>
                    <input type="text"
                        value={term}
                        onChange={e => setTerm(e.target.value)} className='input' />
                </div>
            </div>
            <div className='ui celled list'>
                {resultRenderd}
            </div>
        </React.Fragment>
    );
}

export default Search;

