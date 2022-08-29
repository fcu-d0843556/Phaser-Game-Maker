import React, { Component } from 'react'

//css
// import './LineLogin.css'


export default class LineLogin extends Component {
  render() {
    return (
      <div className="LineLogin">
          <div className="LineBotton" id="lineLoginBtn"></div>
          {/* <!-- LINE 登入</button> --> */}

          {/* <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.js'></script>
          <script> */}
              {/* $('#lineLoginBtn').on('click', function(e) {
                  let client_id = '1656452766';
                  let redirect_uri = 'http://localhost:3000/';
                  let link = 'https://access.line.me/oauth2/v2.1/authorize?';
                  link += 'response_type=code';
                  link += '&client_id=' + client_id;
                  link += '&redirect_uri=' + redirect_uri;
                  link += '&state=login';
                  link += '&scope=openid%20profile';
                  window.location.href = link;
              });
          {/* </script> */}
      </div>
    )
  }
}
