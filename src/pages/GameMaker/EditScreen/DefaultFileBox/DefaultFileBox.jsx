import React, { Component } from 'react'


export default class DefaultFileBox extends Component {
  render() {
    return (
        <div id="detailCard" className="overflow card col-7" style={{backgroundColor: "lightpink"}}>
            
            <button type="button" style={{float: "right"}} className="btn-close" aria-label="Close"></button>
            
            <h2 style={{textAlign:"center"}}>使用預設圖片</h2>

            <div>
                <div className="row row-cols-1 row-cols-md-2 g-4 " >
                    <div className="col">
                        <div className="card">
                            <img text="<%= value.items[i].src %>" className="card-img-top" alt="..."/>
                            <div className="card-body">
                                <h5 className="card-title">description</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
  }
}
