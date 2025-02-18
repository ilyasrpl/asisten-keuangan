const ytmp3 = require('ytmp3-scrap')
const { get } = require('axios')


ytmp3('https://www.youtube.com/watch?v=36uDReSdFDU')
  .then((res) => {
    console.log(res)
    get(res.download).then(console.log)
  })
  .catch((err) => {
    console.log(err)
  })