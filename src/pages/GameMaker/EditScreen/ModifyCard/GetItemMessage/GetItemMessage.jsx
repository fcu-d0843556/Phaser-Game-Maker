import React, { Component } from 'react'

export default class GetItemMessage extends Component {
  render() {
    const {description} = this.props
    return (
        <div>
            <div className="card-header">
                <div className="mb-3">
                    <label className="form-label">填入訊息</label>
                    <input type="text" />
                </div>
            </div>
            
            <div className="card-body">
                <p>說明：</p>
                <p>{description}</p>
            </div>
        </div>
    )
  }
}
