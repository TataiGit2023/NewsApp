import React, { Component } from 'react'
import NewsItem from './NewsItem'
import InfiniteScroll from 'react-infinite-scroll-component'

export class News extends Component {

    constructor()
    {
      super();

      this.state = {
            articles: [],
            loading: true,
            page:1,
            totalResults:0,
            n:0
      }
    }

    update = async(pageNo) =>{
      let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=965c489d7bab42a5a2f7b2a1bde165a3&pageSize=${this.props.pageSize}&page=${this.state.page}`);
      let parsedData = await data.json();
      console.log(parsedData);
      this.setState({n: parsedData.articles.length,articles: parsedData.articles.filter((ele)=>{return (ele.description && ele.title && ele.description!=="[Removed]")}), loading:false, totalResults:parsedData.totalResults});
      console.log("data"+this.state.n);
    }

    async componentDidMount()
    {
      this.update(this.state.page);
    }

    // handlePrev=async ()=>{

    //   this.setState({
    //     loading:true,
    //     page:this.state.page-1
    //   })

    //   this.update(this.state.page-1);
    // } 
    // handleNext=async()=>{

    //   this.setState({
    //     loading:true,
    //     page:this.state.page+1
    //   })

    //   this.update(this.state.page+1);
    // } 
    
    fetchMoreData = async() =>{
      this.setState({page:this.state.page+1})
      let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=965c489d7bab42a5a2f7b2a1bde165a3&pageSize=${this.props.pageSize}&page=${this.state.page+1}`);
      let parsedData = await data.json();
      console.log(parsedData);
      this.setState({n: this.state.n + parsedData.articles.length,articles: this.state.articles.concat(parsedData.articles.filter((ele)=>{return (ele.description && ele.title && ele.description!=="[Removed]")}))});
      console.log("more data"+this.state.n);
      console.log(this.props.pageSize);
    }


  render() {
    const {loading,articles} = this.state;
    return (
      <div className='container my-3'>
        <h1>NewsMonkey-Top headLines</h1>
        <>
          <InfiniteScroll
              dataLength={this.state.articles.length} //This is important field to render the next data
              next={this.fetchMoreData}
              hasMore={this.state.n!==this.state.totalResults}
              loader={<h4>Loading...</h4>}
          >
              <div className='container'>
                <div className='row my-3'>
                  {this.state.articles.map((element)=>{
                  
                      return <div className='col-md-4 col-sd-12' key={element.url}>
                      <NewsItem title={element.title.slice(0,40)} description={element.description.slice(0,80)} urlToImage={element.urlToImage? element.urlToImage:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROEtnWOR92YLVHa5O7W4lY7N0m9Cojnv__b8RXdBB4YQ&s"} url={element.url}/>
                      </div>
                  })}
                </div>
              </div>
          </InfiniteScroll>
        </>

        {/* <div className='d-flex justify-content-evenly'>
        <button type="button " disabled={this.state.page<=1} className="btn btn-primary" onClick={this.handlePrev}>&larr; Prev</button>
        <button type="button" disabled={this.state.page>Math.ceil(this.state.articles.length/this.props.pageSize)} className="btn btn-primary" onClick={this.handleNext}>Next &rarr;</button>
        </div> */}

      </div>
    )
  }
}

export default News
