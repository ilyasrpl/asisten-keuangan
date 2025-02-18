const getTimeDeclaration = {
  name: "getTime",
  description: `Get the current time.
  return like: {
    year : 2025,
    mounth: "January",
    date: 1,
    day: "Sunday",
    hour: 12,
    minute: 20,
    second: 30
  }`
}

function getTime() {
  let time = new Date();
  let day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let mounth =["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  let res = {
    year : time.getFullYear(),
    mounth: mounth[time.getMonth()],
    date: time.getDate(),
    day: day[time.getDay()],
    hour: time.getHours(),
    minute: time.getMinutes(),
    second: time.getSeconds()
  }
  return res
}

module.exports = { getTimeDeclaration, getTime }