import React, { Component } from 'react'

export default class ImageSettings extends Component {
  render() {
    return (
        <div className="card-header">
        
           <div className="row">
               <div className="col">
                   <label className="form-label">生成的X位置</label>
                   <input className="form-control" type="number"/>
               </div>
               <div className="col">
                   <label className="form-label">生成的Y位置</label>
                   <input className="form-control" type="number"/>
               </div>
           </div>
       

           <div className="row">
               <div className="col">
                   <label className="form-label">圖片的縮放</label>
                   <input className="form-control" type="number" />
               </div>
           </div>
   </div>
    )
  }
}
