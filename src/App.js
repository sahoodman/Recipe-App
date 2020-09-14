import React, { useEffect, useState } from 'react';
import Recipe from './Recipe';
import './App.css';

const App = () => { 
  const APP_ID = "b717a2fd";
  const APP_KEY = "45c9b47a69389351e64f2fe634d9c9c3";


  //const [counter, setCounter] = useState(0);
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState('icecream');

  // useEffect(() => {
  //   console.log("Effect has been run");
  // }, [counter]);

  useEffect( () => {
    getRecipes();
  }, [query]);
  
  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    console.log(data.hits);
    setRecipes(data.hits);
  }
  
  const updateSearch = e => {
    setSearch(e.target.value);
    console.log(search);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
  }
  
  return(
    <div className="App">
      {/* <h1>Hwllo react</h1> */}
      <form onSubmit={getSearch} className="search-form">
        <input 
          className="search-bar" 
          type="text" 
          value={search}
          onChange={updateSearch}
          />
        <button className="search-button" type="Submit">
          Search 
          {/* {counter} */}
          </button>
      </form >
      {/* <h1 onClick = {() => setCounter(counter+1)}>{counter}</h1> */}
      <div className="recipes">
      {recipes.map(recipe => (
        <Recipe 
          key={recipe.recipe.calories}
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}
        />
      ))}
      </div>
    </div>
  );
}

export default App;
