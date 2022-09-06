import React, { Component } from 'react'

//Pages
import GetItemMessage from './GetItemMessage/GetItemMessage'
import ImageSettings from './ImageSettings/ImageSettings'

import './ModifyCard.css'

export default class ModifyCard extends Component {
  render() {
    // console.log("modify",this.props);

    const {modifyTitle,items,src,text} = this.props
    
    return (
        <div className="card text-center modify-card" style={{backgroundColor: "orange"}}>
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
                  <ImageSettings {...this.props}></ImageSettings>
                </div>
              : 
                <div></div>
            }
            
            {
              text ? 
                <GetItemMessage {...this.props}></GetItemMessage>
              :
                <div></div>
            }

        </div>
    )
  }
}
