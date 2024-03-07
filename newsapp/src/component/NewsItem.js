import React, { Component } from 'react'

export class NewsItem extends Component {
    
  render() {
    let{title,description,urlToImage,url} = this.props;
    return (
      <div>
        <div className="card my-3 position-relative" style={{width: '18rem', minHeight:'22rem'}}>
            <img src={urlToImage} className="card-img-top" alt="..." style={{width:'18rem',height:'10rem'}}/>
            <div className="card-body">
                <h5 className="card-title" style={{height:'3rem'}}>{title}</h5>
                <p className="card-text" style={{height:'7rem'}}>{description}</p>
                <a href={url} target='_blank' className="btn btn-sm btn-primary position-absolute bottom-0 start-10 translate-middle-y">Read More</a>
            </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
