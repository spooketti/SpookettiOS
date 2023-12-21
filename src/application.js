a = null
let currentZ = 0

let isWindowedDict = {
    true:"口", //
    false:"❒"
}

function toggleFullScreen(appEl)
{
    if(appEl.dataset.window == "false")
    {
        appEl.dataset.window = "true"
        appEl.style.left = "2%"
        appEl.style.top = "2%"
        appEl.style.width = "95%"
        appEl.style.height = "95%"
        //console.log()
        appEl.querySelector(".ApplicationNavbar").querySelector(".AppAction").querySelector(".AppWindow").innerText = isWindowedDict[appEl.dataset.window]
        return
    }
        appEl.dataset.window = "false"
        appEl.style.left = "0"
        appEl.style.top = "0"
        appEl.style.width = "100%"
        appEl.style.height = "100%"
        //console.log()
        appEl.querySelector(".ApplicationNavbar").querySelector(".AppAction").querySelector(".AppWindow").innerText = isWindowedDict[appEl.dataset.window]

}

function dragElement(b) {
    if(b.dataset.window == false || b.dataset.window == "false")
    {
        return;
    }
    console.log(b.dataset.window)
    a = b
    window.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    window.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    window.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e.preventDefault();
    let yOffset = 0
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY + yOffset;
    // set the element's new position:
    //console.log((a.offsetTop - pos2))
    if((a.offsetTop - pos2) > 0 && (a.offsetTop - pos2) < operatingBody.offsetHeight - 40)
    {
        a.style.top = (a.offsetTop - pos2) + "px";
    }
    //if((a.offsetLeft - pos1) > 0 && (a.offsetTop - pos1) < operatingBody.offsetWidth )
    a.style.left = (a.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    window.onmousedown = null;
    window.onmouseup = null;
    window.onmousemove = null;
}

function closeApp(el)
{
    el.style.opacity = 0;
    window.setTimeout(() => {
        el.remove()
    }, 250);
    //el.remove()
}

function createApp(appIconSrc,appNameStr,isIFrameBody,iFrameSrc)
{
    /*<div class="Application" data-window=false>
            <div class="ApplicationNavbar" onmousedown="dragElement(this.parentElement)">
            <div class="AppInfo"><img src="assets/img/pdeck.png"
                    class="AppIcon"><span class="AppName">Peardeck</span></div>
                <div class="AppAction">
                    <div class="AppMin">-</div>
                    <div class="AppWindow" onclick="toggleFullScreen(this.parentElement.parentElement.parentElement)">❒</div>
                    <div class="AppClose" onclick="closeApp(this.parentElement.parentElement.parentElement)">X</div>
                </div>
            </div>
            <div class="ApplicationBody">
                <iframe src="https://joinpd.com" class="AppIFrame"></iframe>
            </div>
        </div>*/
        let applicationDiv = document.createElement("div")
        applicationDiv.className = "Application"
        applicationDiv.dataset.window = "false"
        applicationDiv.onclick=function(){currentZ++;applicationDiv.style.zIndex = currentZ}
        operatingBody.insertBefore(applicationDiv,operatingBody.firstChild)
        let appNavbar = document.createElement("div")
        appNavbar.className = "ApplicationNavbar"
        appNavbar.onmousedown = function(){dragElement(this.parentElement)}
        applicationDiv.appendChild(appNavbar)
        let appInfo = document.createElement("div")
        appInfo.className = "AppInfo"
        appNavbar.appendChild(appInfo)
        let appIcon = document.createElement("img")
        appIcon.src = appIconSrc
        appIcon.className = "AppIcon"
        appInfo.appendChild(appIcon)
        let appName = document.createElement("span")
        appName.className = "AppName"
        appName.innerText = appNameStr
        appInfo.appendChild(appName)
        let appAction = document.createElement("div")
        appAction.className = "AppAction"
        appNavbar.appendChild(appAction)
        let appMin = document.createElement("div")
        appMin.className = "AppMin"
        appMin.innerText = "-"
        appAction.appendChild(appMin)
        let appWindow = document.createElement("div")
        appWindow.className = "AppWindow"
        appWindow.onclick=function(){toggleFullScreen(this.parentElement.parentElement.parentElement)}
        appWindow.innerText = "❒"
        appAction.appendChild(appWindow)
        let appClose = document.createElement("div")
        appClose.className = "AppClose"
        appClose.innerText = "X"
        appClose.onclick = function() {closeApp(this.parentElement.parentElement.parentElement)}
        appAction.appendChild(appClose)
        let appBody = document.createElement("div")
        appBody.className = "ApplicationBody" 
        applicationDiv.appendChild(appBody)
        if(isIFrameBody)
        {
            let iFrameContent = document.createElement("iframe")
            iFrameContent.className = "AppIFrame"
            iFrameContent.src = iFrameSrc
            appBody.appendChild(iFrameContent)
        }
        
    
}