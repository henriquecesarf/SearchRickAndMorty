import { Search } from 'lucide-react';
import React, { useEffect, ChangeEvent, useState } from 'react';
import { Characters } from './Characters';
import Pagination from 'react-paginate';

interface Character {
  id: number;
  name: string;
}

interface RickAndMortyAPIResponse {
  info: {
    count: number; 
    pages: number;
  };
  results: Character[];
  error: string;
}

export function List() {
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string>("");
  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState(0); 
  const [pageCount, setPageCount] = useState(0);
  

  const baseUrl = 'https://rickandmortyapi.com/api/character';

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }
  function handleCharacter(event) {
    setSearch(event.target.value);
  }
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setPageCount(0);
        const url = search ? `${baseUrl}?page=${currentPage + 1}&name=${search}` : baseUrl;
        const response = await fetch(url);
        const data: RickAndMortyAPIResponse = await response.json();
        console.log(Characters.length)
        if(data.error){
          setError(data.error);
          setCharacters([]);
          setPageCount(0);
        } else {
          setCharacters(data.results);
          setPageCount(data.info.pages); 
        }
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };

    if (search.length > 0) {
      fetchCharacters();
      setError("");
    } else {
      setError("");
      setCharacters([]);
      setPageCount(0);
    }
  }, [search, currentPage]);

  const handlePageChange = (data: { selected: number }) => {
    setCurrentPage(data.selected); // Update current page state
  };

  return (
    <>
      <div className="my-12 px-3 py-1.5 border-gray border-2 rounded-sm text-sm flex items-center gap-3 bg-white mx-4 w-96">
        <input
          onChange={handleSearchChange}
          type="text"
          className="bg-transparent outline-none text-sm ring-0 border-0 p-0 focus:ring-0 w-full text-black"
          placeholder="Sobre quem você quer saber?"
        />
        <Search className='size-6 text-black' />
      </div>
      {error && error.length > 0 && (
        <h1 className="text-4xl font-bold text-white mt-4">Personagem não encontrado</h1>
      )}
      {characters && characters.length > 0  ? (
        <div className="grid grid-cols-1 overflow-y-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 mx-4 max-h-auto gap-6 my-12">
          {characters.map((item) => (
            <Characters item={item} handleCharacter={handleCharacter} />
          ))}
        </div>
      ) : undefined}
      {characters.length > 0 && (
        <div className="pagination-container mb-10">
          <Pagination
            pageCount={pageCount}
            initialPage={0}
            onPageChange={handlePageChange}
            activeClassName="active"
            previousLabel="<"
            nextLabel=">"
            pageRangeDisplayed={3} 
            containerClassName={"flex justify-center mt-4"}
            pageLinkClassName={"bg-white text-gray-700 px-3 py-1 rounded-full mx-1 "}
            activeLinkClassName={"bg-blue-500 text-white px-3 py-1 rounded-full mx-1"}
            previousClassName={"bg-white text-gray-700 px-3 py-1 rounded-full mx-1"}
            nextClassName={"bg-white text-gray-700 px-3 py-1 rounded-full mx-1"}
            previousLinkClassName={"px-3 py-1"}
            nextLinkClassName={"px-3 py-1"}
          />
        </div>
      )}
    </>
  );
}
