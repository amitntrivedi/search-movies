import React ,{Component} from 'react';
import './App.css';
import $ from 'jquery'; 
import Movie from './Component/Movie'; 

class App extends Component {
  //Constructor, State Initialization for movies 
  constructor(props) {
    super(props)
    this.state = {}; 
    this.searchMovies("speed"); 
  }
  
  //Function wich do API call and fetch the movies, put in array and update state  
  searchMovies (searchString) {
    const apiURL = "https://api.themoviedb.org/3/search/movie?api_key=7f1c3b2363457f066212d5d6de3b1062&language=en-US&query=" + searchString+ "&page=1&include_adult=false"; 
 
    $.ajax({
      url: apiURL,
      success: (response ) => {
       const  results = response.results; 
       console.log(response); 
       const searchedMovies = []; 
       results.forEach((movie) => {
          movie.poster_src = "https://image.tmdb.org/t/p/w185" + movie.poster_path
          
           const movieItem = <Movie key={movie.id} movie={movie}/>

           searchedMovies.push(movieItem)
         })

         this.setState({movies: searchedMovies})
      },
      error: (xhr, status, err) => {
        console.error("Error in data fetch"); 
      }
    })
  }
  //end of search function 

  //Input text event hadler, fire search function 
  searchChangeHandler(event) {
    console.log(event.target.value); 
    const boundObject = this; 
    const searchTerm = event.target.value; 
    boundObject.searchMovies(searchTerm); 
  }

  //Main Function 
  render (){
    return (
      <div className="App">
          <h1>My Movies DB </h1>
          <header className="App-header">
          <input style={{
              fontSize: 24,
              display: 'block',
              width: "99%",
              paddingTop: 8,
              paddingBottom: 8,
              paddingLeft: 16
        }} onChange={this.searchChangeHandler.bind(this) }
         placeholder="Enter search term"/>
    
        {this.state.movies}
     
        </header>
      </div>
    );
  }
  
}

export default App;
