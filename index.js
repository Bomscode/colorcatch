const express = require('express');
const app = express();
const fs = require('fs');
app.use(express.static("data"));
app.set('trust proxy', true)
app.use(express.json())
app.post("/scores", (req, res) => {
  if(req.get('Referrer') == "https://color-catch.glitch.me/"){
  console.log("scored")
    let great = false
     let score = req.body.score
     let name = req.body.name
     let id = req.body.id
     console.log(score + name + id)
     fs.readFile("leaderboard.txt", 'utf8', (err, data) => {
      let datas = data.split("\n")
      datas = datas.filter((e)=>{
        return !e.includes(id)
      })
     for(let i = 0; i < datas.length;i++){
       if(score > parseInt(datas[i].split(" : ")[1])){
         great = true
         for(let i2 = datas.length;i2 >= i;i2--){
           datas[i2 + 1] = datas[i2]
         }
         datas[i] = name + " : " + score + " | " + id
         i = datas.length
       }
     }
       if(!great){
         datas.push(name + " : " + score + " | " + id)
       }
  fs.writeFile("leaderboard.txt", datas.join("\n"), 'utf8', (err) => {
  });
        });
  }
});
app.post("/update", (req, res) => {
  if(req.get('Referrer') == "https://color-catch.glitch.me/"){
  console.log("sent")
  fs.readFile("leaderboard.txt", 'utf8', (err, data) => {
    let datas = data.split("\n")
    datas.forEach((e,i)=>{
      datas[i] = e.split(" | ")[0]
    })
    res.send(datas)
  })
  }else{
     res.send("baka desu yooooooooo")
  }
});
app.listen(3000, () => {
  console.log(`Server is running on port ${3000}`);
}); 