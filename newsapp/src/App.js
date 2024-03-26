import './App.css';
import React, { Component } from 'react'
import NavBar from './component/NavBar';
import News from './component/News';
import { BrowserRouter as Router, Route, Routes, useNavigate} from "react-router-dom";
import DetailedNews from './component/DetailedNews';

export default class App extends Component {  
  constructor()
  {
    super();
    this.state={
      textVal:'in',
      q:'india'
    }
  }

  handleonclick=(event)=>{
    event.preventDefault();
    const text = document.querySelector("input").value;
    const fmt_text = text.toLowerCase();
    if(text!=="")
    {
      this.setState({
        q:fmt_text
      })
      document.querySelector("input").value = "";
    }
  }


  render() {
    return (
        <div>
          <Router>
            <NavBar func2={this.handleonclick}/>
            <Routes>
                <Route exact path='/business' element={<News pageSize='9' key={this.state.textVal+"business"} country={this.state.textVal} category="business"/>}/>
                <Route exact path='/entertainment'element={<News pageSize='9' key={this.state.textVal+"entertainment"} country={this.state.textVal} category="entertainment"/>}/>
                <Route exact path='/' element={<News pageSize='9' key={this.state.textVal} country={this.state.textVal} category="general"/>}/>
                <Route exact path='/health' element={<News pageSize='9' key={this.state.textVal+"health"} country={this.state.textVal} category="health"/>}/>
                <Route exact path='/science'element={<News pageSize='9' key={this.state.textVal+"science"} country={this.state.textVal} category="science"/>}/>
                <Route exact path='/sports'element={<News pageSize='9' key={this.state.textVal+"sports"} country={this.state.textVal} category="sports"/>}/>
                <Route exact path='/technology' element={<News pageSize='9' key={this.state.textVal+"technology"} country={this.state.textVal} category="technology"/>}/>
                <Route exact path='/detailedNews' element={<DetailedNews pageSize='9' key={this.state.q} q={this.state.q}/>}/>
            </Routes>
          </Router>
        </div>
    )
  }
}