let tbDate = document.getElementById("TBDate")
let tbTime = document.getElementById("TBTime")
let batVal = document.getElementById("TBBatteryValue")
let batStatus = document.getElementById("TBChargeStatus")
let batValLit = document.getElementById("TBBatteryLiteral")

window.setInterval(timeHandle,1000)


let AMPM = {
    true : "AM",
    false : "PM"
}

let batteryCharging = false

navigator.getBattery().then((battery) => {
    batVal.style.width = `${battery.level * 100}%`
    batStatus.innerText = battery.charging ? "⚡︎" : ""
    batteryCharging = battery.charging;
    batValLit.innerText = `${Math.round(battery.level * 100)}%`

    battery.addEventListener("chargingchange", () => {
        batStatus.innerText = battery.charging ? "⚡︎" : ""
      });
  
    battery.addEventListener("chargingchange", () => {
      batteryCharging = battery.charging;
    });

    battery.addEventListener("levelchange", () => {
        batVal.style.width = `${battery.level * 100}%`
        batValLit.innerText = `${Math.round(battery.level * 100)}%`
      });
  });

  

function timeHandle()
{
    let isAM = false
    let now = new Date();
    let h = now.getHours();
    let m = now.getMinutes();
    m = m < 10 ? `0${m}` : m
    if(h ==0)
    {
        h = 12
        isAM = true
    }
    if (h >= 0 && h < 12) 
    {
        isAM = true
    }
    if(h > 12)
    {
        h -=12
    }
    
    let mo = now.getMonth() + 1
    let da = now.getDate()
    let ye = now.getFullYear()
    //let s = now.getSeconds();
    tbTime.innerText = `${h}:${m} ${AMPM[isAM]}`
    tbDate.innerText = `${mo}/${da}/${ye}`

}

function initTaskbar()
{
    timeHandle()
}

initTaskbar()
