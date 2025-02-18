const getTimeDeclaration = {
  name: "getTime",
  description: "Get the current time."
}

function getTime() {
  let time = new Date();
  let day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let res = {
    year : time.getFullYear(),
    mounth: time.getMonth(),
    date: time.getDate(),
    day: day[time.getDay()],
    hour: time.getHours(),
    minute: time.getMinutes(),
    second: time.getSeconds()
  }
  return res
}

module.exports = { getTimeDeclaration, getTime }