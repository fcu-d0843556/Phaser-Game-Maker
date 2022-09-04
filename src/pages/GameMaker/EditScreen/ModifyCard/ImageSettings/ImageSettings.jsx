import React, { Component } from 'react'

export default class ImageSettings extends Component {
  render() {
    return (
        <div className="card-header">
            <div className="mb-3">
                <button type="button" style={{float:"left"}} className="btn btn-dark">上一個</button>
                <label className="form-label">modifyTitle</label>
                <button type="button" style={{float:"right"}} className="btn btn-dark">下一個</button>  
                <input className="form-control" type="file" />
            </div>


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
