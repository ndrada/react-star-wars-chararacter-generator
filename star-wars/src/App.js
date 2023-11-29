import './App.css';
import React from 'react';

class FilmItemRow extends React.Component {
  render(){
    return (
      <li>
        <a href={this.props.url}>{this.props.url}</a>
      </li>
    )
  }
}

class StarWars extends React.Component {
  constructor() {
    super()
    this.state = {
      loadedCharacter: false,
      name: null,
      height: null,
      homeworld: null,
      films: [],
      };
  }

  getNewCharacter(){
    const randomNumber = Math.round(Math.random() * 82)
    const url = `https://swapi.dev/api/people/${randomNumber}`
    fetch(url)
    .then(response => response.json())
    .then(data => {
      this.setState({
        name: data.name,
        height: data.height,
        homeworld: data.homeworld,
        films: data.films,
        loadedCharacter: true,
      })      
    })
  }

  render(){

    const movies = this.state.films.map((url, i) => {
      return <FilmItemRow key={i} url={url}/>
    })

    return(
      <div>
        {
          this.state.loadedCharacter &&
          <div>
            <h1>{this.state.name}</h1>
            <p>{this.state.height} cm</p>
            <p>
              <a href={this.state.homeworld}>
              Homeworld
              </a>
            </p>
            <ul>
              {movies}
            </ul>
          </div>
        } 
        <button 
          type="button" 
          onClick={() => this.getNewCharacter()} 
          className="btn">
          Randomize character
        </button>
      </div>
    )
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <StarWars />
      </header>
    </div>
  );
}

export default App;

// https://github.com/akabab/starwars-api/blob/master/api/id/1.json
