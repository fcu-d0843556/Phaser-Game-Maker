const { createProxyMiddleware } = require('http-proxy-middleware');

const multer = require('multer')
const path = require('path') //獲取文件名用
const sd = require('silly-datetime')
const mkdirp = require('mkdirp')
const fs = require('fs')

const userData = {
  username: '',
}

const storage = multer.diskStorage({

  //配置上傳的目錄
  destination: async (req, file, cb) => {
      // console.log("dd",req.query,file,cb);
      // console.log("fnin",userData.username);
      //1.獲取當前日期 20211016
      // console.log("get name ", userData.username);
      if(userData.username !== ""){
        let day = sd.format(new Date(), 'YYYYMMDD')

        //2.按照日期生成圖片存儲目錄，mkdirp是一個異步的方法
        // let dir = path.join("src/pages/GameMaker/EditScreen/ModifyCard/ImageSettings/upload",userData.username)
        let dir = path.join("public/upload",userData.username)

        // console.log("dir",dir);
        await mkdirp(dir)

        cb(null, dir) //上傳之前目錄必須存在
      }
      
  },
  //修改上傳後的文件名
  filename: function (req, file, cb) {
      //1.獲取後綴名
      // file.fieldname 獲取html sumbit後的name
      // file.originalname 獲取原本上傳檔案的名字

      // console.log("filename",file)
      // console.debug(req)

      if(userData.username !== ""){
        let extname = path.extname(file.originalname)

        //2.根據時間戳生成文件名

        cb(null, file.fieldname + extname)
      }
  },
})



module.exports = function(app) {
  app.use(
    '/api1', //遇見api1前綴的請求，就會觸發該代理配置
    createProxyMiddleware({
      // target: 'http://140.134.26.66:5050', //請求轉發給誰
      target: 'http://localhost:5050', //請求轉發給誰
      changeOrigin: true,              //控制服務器收到的請求頭中Host字段的值
      pathRewrite:{'^/api1':''}        //重寫請求路徑
    })
  );
// 
  app.post('/uploadFile',multer({storage: storage}).any(), function(req,res){
    
    const {username,fileName,fileContent} = req.query;
    userData.username = username
    let extname;
    if(typeof(fileContent) === "string"){
      // console.log(req.query);
      
      extname = path.extname(JSON.parse(fileContent).name)
      // console.log("fileaa",);
      // console.log(extname);
      
    }
    
    // console.log("name set");
    // console.log("fileContent",req.query);
    // console.log("dd",fileContent);
    
    
    // console.log(req.query);

    if(Object.keys(req.query).length === 0){
      res.json({success: true})
      // console.log("okok");
    }else{
      // console.log(username);
      // res.json({
      //   success: true,
      //   location: `./upload/${username}/${fileName + extname}`,
      //   selectedCardName: fileName
      // })
    }
    
  });
};

