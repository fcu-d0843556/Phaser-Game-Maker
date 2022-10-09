const { createProxyMiddleware } = require('http-proxy-middleware');

const multer = require('multer')
const path = require('path') //獲取文件名用
const sd = require('silly-datetime')
const mkdirp = require('mkdirp')
const fs = require('fs')

let tool = {

  multer() {
      //這裡的程式直接在官方找即可
      fileFilter = (req, file, cb) => {

          // The function should call `cb` with a boolean
          // to indicate if the file should be accepted
          if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
              cb(new Error('Please upload an image'))
              cb(null, false)
          }

          cb(null, true)
      }

      const storage = multer.diskStorage({

          //配置上傳的目錄
          destination: async (req, file, cb) => {

              //1.獲取當前日期 20211016
              let day = sd.format(new Date(), 'YYYYMMDD')

              //2.按照日期生成圖片存儲目錄，mkdirp是一個異步的方法
              let dir = path.join("src/upload")
              console.log("dir",dir);
              await mkdirp(dir)

              cb(null, dir) //上傳之前目錄必須存在
          },
          //修改上傳後的文件名
          filename: function (req, file, cb) {
              //1.獲取後綴名
              // file.fieldname 獲取html sumbit後的name
              // file.originalname 獲取原本上傳檔案的名字

              // console.debug("filename")
              // console.debug(req)


              let extname = path.extname(file.originalname)

              //2.根據時間戳生成文件名

              cb(null, file.fieldname + extname)
          },
      })

      const upload = multer({
          fileFilter: fileFilter,
          storage: storage,
      })
      return upload

  }
}

module.exports = function(app) {
  app.use(
    '/api1', //遇見api1前綴的請求，就會觸發該代理配置
    createProxyMiddleware({
      target: 'http://localhost:5000', //請求轉發給誰
      changeOrigin: true,              //控制服務器收到的請求頭中Host字段的值
      pathRewrite:{'^/api1':''}        //重寫請求路徑
    })
  );

  app.post('/uploadFile',tool.multer().any(), function(req,res){
    
    // const {file,cool} = req.query;
    // console.log(req.query);
    // const get = req.IncomingMessage._readableState
    // console.log(res)
    // console.log(req);
    res.json({success: true})
  });
};

