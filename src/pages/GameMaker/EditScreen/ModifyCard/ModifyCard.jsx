import React, { Component } from 'react'

//Pages
import GetItemMessage from './GetItemMessage/GetItemMessage'
import ImageSettings from './ImageSettings/ImageSettings'
import PreviewImage from './PreviewImage/PreviewImage'

export default class ModifyCard extends Component {
  render() {
    return (
        <div className="card text-center loginBox" style={{backgroundColor: "orange"}}>
            <div className="card-header">
              <div className="mb-3">
                  <button type="button" style={{float:"left"}} className="btn btn-dark">上一個</button>
                  <label className="form-label">modifyTitle</label>
                  <button type="button" style={{float:"right"}} className="btn btn-dark">下一個</button>  
              </div>
            </div> 

            <ImageSettings></ImageSettings>
            <PreviewImage></PreviewImage>
            <GetItemMessage></GetItemMessage>
            


            <div className="card-footer text-muted">
                <button type="button" className="btn btn-dark">使用其他提供的圖片</button>
            </div>

        </div>
    )
  }
}
