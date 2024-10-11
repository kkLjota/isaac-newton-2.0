import axios from "axios";
import Noodle from './assets/image.png';
import { useState } from "react";

const Search = () => {

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!query) return;

    try {
      setLoading(true);
      const URL = "http://localhost:4000/search";

      const res = await axios.get(URL, {
        params:{
          query:query
        }
      })

      const data = res.data.organic_results || [];
      setResults(data);     } catch (err) {
      console.error(err);
      setError("Ocorreu um erro ao fazer a busca");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="title">
        <h1>Noodle</h1>
        <img src={Noodle} alt="Miojo" /> 
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Digite sua busca:"
          onChange={(e) => setQuery(e.target.value)} 
        />
        <button type="submit">Buscar</button>
      </form>
      <div>
          {error ? (
            <h3>{error}</h3>
          ) : loading ? (
            <h3>Carregando...</h3>
          ) : (
            <ul>
            {results.map((result, index) => (
              <li key={index}>
                <a 
                href={result.link} 
                target="_blank" 
                rel="noopener noreferrer"
                >
                  {result.title}
                  </a>
                <p>
                  {result.snippet}
                  </p>
              </li>
            ))}
        </ul>
          )}
      </div>
    </div>
  );
};

export default Search;
