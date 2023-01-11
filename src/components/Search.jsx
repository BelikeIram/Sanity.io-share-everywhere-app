import { useState } from "react";
import React from 'react'
import { client } from '../Client';
import { searchQuery, feedQuery } from '../utils/data';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';
import { useEffect } from "react";

const Search = ({searchTerm}) => {
  const [pins, setPins] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (searchTerm !== '') {
      setLoading(true)
      const query = searchQuery(searchTerm.toLowerCase())
      client.fetch(query).then((data)=>{
        setPins(data)
        setLoading(false)
      })
    } else{
       client.fetch(feedQuery).then((data)=>{
         setPins(data)
         setLoading(false)
       })
    }
  }, [searchTerm])
  


  return (
    <div>
    {loading && <Spinner message='Loading....'/>}
    {pins && <MasonryLayout pins={pins}/>}
    {pins?.length === 0 && searchTerm !== '' && !loading && (
      <div>No pins Available right now</div>
    )}
    </div>
  )
}

export default Search;

