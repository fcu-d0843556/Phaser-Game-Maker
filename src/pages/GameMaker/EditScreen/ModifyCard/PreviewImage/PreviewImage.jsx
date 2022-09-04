import React, { Component } from 'react'

export default class PreviewImage extends Component {
  render() {
    return (
        <div className="card-body">
            <h5 className="card-title">預覽圖</h5>
            <img style={{width: "50%", height: "50%"}} alt="empty_image" />
        </div>
    )
  }
}
