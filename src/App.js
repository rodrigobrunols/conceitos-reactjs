import React , {useState, useEffect} from "react";
import api  from "./services/api";

import "./styles.css";

function App() {
  //Declara variável monitorada
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  } , [] );


  async function handleAddRepository() {
    
    const response = await api.post('repositories', 
    {
      title: 'Desafio ReactJS',
      url: 'https://github.com/rocketseat/umbriel',
      techs: ['Nodejs' , 'React']
    })

    setRepositories([...repositories ,response.data])

  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(
      repository => repository.id !== id)
    )
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => (
          <li key={repo.id}>
            {repo.title}

          <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>
        </li>

        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
