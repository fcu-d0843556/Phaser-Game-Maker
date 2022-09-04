import React, { Component } from 'react'

export default class GetItemMessage extends Component {
  render() {
    return (
        <div>
            <div className="card-header">
                <div className="mb-3">
                    <label className="form-label">獲 得 道 具 的 文 字</label>
                    <input type="text" />
                </div>
            </div>
            
            <div className="card-body">
                <p>說明：</p>
                <p>當戳到某個盒子時，會出現的文字</p>
            </div>
        </div>
    )
  }
}
