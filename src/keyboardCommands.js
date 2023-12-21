let isControlHeld = false
let isShiftHeld = false
document.addEventListener("keydown",function(e)
{
    //e.preventDefault()
    switch(e.key)
    {
        
        case "Control":
            isControlHeld = true
        break;

        case "Shift":
            isShifHeld = true
        break;

        case "L":

            if(isControlHeld && isShifHeld)
            {
                window.location.href = "lockscreen.html"
            }
        break;
    }
})