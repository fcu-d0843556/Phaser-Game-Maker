import React, { Component } from 'react'

//Pages
import GetItemMessage from './GetItemMessage/GetItemMessage'
import ImageSettings from './ImageSettings/ImageSettings'
import PreviewImage from './PreviewImage/PreviewImage'

export default class ModifyCard extends Component {
  render() {

    const {modifyTitle,items,src,text} = this.props
    // console.log("modify",this.props);
    
    return (
        <div className="card text-center loginBox" style={{backgroundColor: "orange"}}>
            <div className="card-header">
              {
                items ? 
                  <div className="mb-3">
                    <button type="button" style={{float:"left"}} className="btn btn-dark">上一個</button>
                    <label className="form-label">{modifyTitle}</label>
                    <button type="button" style={{float:"right"}} className="btn btn-dark">下一個</button>
                  </div>
                :
                  <div className="mb-3">
                    <label className="form-label">{modifyTitle}</label>
                  </div>
              }
            </div> 

            {
              src ? 
                <div>
                  <ImageSettings></ImageSettings>
                  <PreviewImage src={src}></PreviewImage>
                  <div className="card-footer text-muted">
                    <button type="button" className="btn btn-dark">使用其他提供的圖片</button>
                  </div>
                </div>
              : 
                <div></div>
            }
            
            {
              text ? 
                <GetItemMessage></GetItemMessage>
              :
                <div></div>
            }

        </div>
    )
  }
}
