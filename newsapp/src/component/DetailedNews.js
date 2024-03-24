import React, { Component } from 'react'
import NewsItem from './NewsItem'
import InfiniteScroll from 'react-infinite-scroll-component'

export class DetailedNews extends Component {
    constructor()
    {
      super();

      this.state = {
            articles: [],
            loading: true,
            page:1,
            totalResults:0,
            n:[]
      }
    }

    update = async(pageNo) =>{
      let data = await fetch(`https://newsapi.org/v2/everything?q=${this.props.q}&apiKey=965c489d7bab42a5a2f7b2a1bde165a3&pageSize=${this.props.pageSize}&page=${this.state.page}`);
      let parsedData = await data.json();
      console.log(parsedData);
      this.setState({n: parsedData.articles,articles: parsedData.articles.filter((ele)=>{return (ele.description && ele.title && ele.description!=="[Removed]")}), loading:false, totalResults:parsedData.totalResults});
    }

    async componentDidMount()
    {
      this.update(this.state.page);
    }

    fetchMoreData = async() =>{
      this.setState({page:this.state.page+1})
      let data = await fetch(`https://newsapi.org/v2/everything?q=${this.props.q}&apiKey=965c489d7bab42a5a2f7b2a1bde165a3&pageSize=${this.props.pageSize}&page=${this.state.page+1}`);
      let parsedData = await data.json();
      console.log(parsedData);
      this.setState({n: this.state.n.concat(parsedData.articles),articles: this.state.articles.concat(parsedData.articles.filter((ele)=>{return (ele.description && ele.title && ele.description!=="[Removed]")}))});
      console.log("more data"+this.state.n);
      console.log(this.props.pageSize);
    }
  render() {
    const {loading,articles} = this.state;
    return (
        
      <>
      <InfiniteScroll
          dataLength={this.state.articles.length} //This is important field to render the next data
          next={this.fetchMoreData}
          hasMore={this.state.n.length!==this.state.totalResults && this.state.n.length<90}
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

    )
  }
}

export default DetailedNews
