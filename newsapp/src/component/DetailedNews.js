import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class DetailedNews extends Component {
    constructor()
    {
      super();

      this.state = {
            articles: [],
            loading: true,
            page:1,
            totalResults:0
      }
    }

    update = async(pageNo) =>{
      let data = await fetch(`https://newsapi.org/v2/everything?q=${this.props.q}&apiKey=965c489d7bab42a5a2f7b2a1bde165a3&pageSize=${this.props.pageSize}&page=${pageNo}`);
      let parsedData = await data.json();
      console.log(parsedData);
      this.setState({articles: parsedData.articles.filter((ele)=>{return (ele.description && ele.title && ele.description!=="[Removed]")}), loading:false, totalResults:parsedData.totalResults});
    }

    async componentDidMount()
    {
      this.update(this.state.page);
    }

    handlePrev=async ()=>{

      this.setState({
        loading:true,
        page:this.state.page-1
      })

      this.update(this.state.page-1);
    } 
    handleNext=async()=>{

      this.setState({
        loading:true,
        page:this.state.page+1
      })

      this.update(this.state.page+1);
    }
  render() {
    const {loading,articles} = this.state;
    if(loading)
    {
      return (
        <div className='container' style={{margin:'250px'}}>
          <h1>Loading.........</h1>
        </div>
      )
    }
    return (
        <div className='container my-3'>
            <h1 className=''>NewsMonkey-Top headLines</h1>
            <div className='row my-3'>
            {this.state.articles.map((element)=>{
            
                return <div className='col-md-4' key={element.url}>
                <NewsItem title={element.title.slice(0,40)} description={element.description.slice(0,80)} urlToImage={element.urlToImage? element.urlToImage:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROEtnWOR92YLVHa5O7W4lY7N0m9Cojnv__b8RXdBB4YQ&s"} url={element.url}/>
                </div>
            })}
            </div>

            <div className='d-flex justify-content-evenly'>
            <button type="button " disabled={this.state.page<=1} className="btn btn-primary" onClick={this.handlePrev}>&larr; Prev</button>
            <button type="button" disabled={this.state.page>Math.ceil(this.state.articles.length/this.props.pageSize)} className="btn btn-primary" onClick={this.handleNext}>Next &rarr;</button>
        </div>

      </div>
    )
  }
}

export default DetailedNews
