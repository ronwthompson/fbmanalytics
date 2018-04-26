function handleFiles(file){
    console.log(file[0])
    const reader = new FileReader()
    reader.onload = loadedFile => {
        let allHTML = document.createElement('div')
        allHTML.innerHTML = loadedFile.target.result
        let messages = allHTML.getElementsByClassName('message')
        
        let messArr = []

        for (let i = 0; i < messages.length; i++){
            let allProps = {
                who: "",
                time: "",
                reaction: "",
                reactionWho: ""
            }

            let img
            let mess
            let tryreact
            const who = messages[i].firstChild.firstChild.innerHTML //who messaged
            let time = messages[i].firstChild.getElementsByClassName('meta')[0].innerHTML.split(' ') //getting the date/time each message was sent
            const trymess = messages[i].nextSibling.innerHTML || messages[i].nextSibling.nextSibling.innerHTML //gets the message
            if (messages[i].nextSibling.nextSibling) tryreact = messages[i].nextSibling.nextSibling.nextSibling.firstChild //gets the reaction
            if (tryreact) tryreact = tryreact.innerHTML //checks if there is a reaction present
            
            
            if (!trymess.includes("div class")) {
                if (trymess.includes("img src")) img = trymess
                else mess = trymess
            }

            time.shift()
            time.splice(3,1)
            const temp = time[3].substring(0,time[3].length-2)
            time.push(time[3].substring(time[3].length-2))
            time[3] = temp
            time = time.join(' ')

            allProps.who = who
            allProps.time = new Date(time).toUTCString()
            allProps.reaction = tryreact ? tryreact.substring(0,3) : "None"
            allProps.reactionWho = tryreact ? tryreact.substring(4) : "None"

            if (img) allProps.image = img
            else if (mess) allProps.message = mess

            messArr.push(allProps)
            
            for (let i = 0; i < messArr.length; i++){
                var date = new Date(messArr[i].time)
                var dateOptions = { timeZone: "America/Los_Angeles", hour12: false, year: "numeric", month: "numeric", day: "numeric" }
                var timeOptions = { timeZone: "America/Los_Angeles", hour12: false, hour: "numeric", minute: "numeric" }
                console.log(date.toLocaleDateString('en', dateOptions))
                console.log(date.toLocaleTimeString('en', timeOptions))
            }

        }

    }
    reader.readAsText(file[0], "utf-8")
}