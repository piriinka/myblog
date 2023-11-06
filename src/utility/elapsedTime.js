
export const elapsedTime=(serverTimestamp)=>{
    //firestore idobelyeg date objektumma alakitasa
    const serverTime=new Date(serverTimestamp.seconds*1000+serverTimestamp.nanoseconds/1000000)
    const currentTime=new Date()
    const elapsedMiliseconds=currentTime-serverTime
    const miliSecondsInSecond=1000
    const miliSecondsInMinute=60*miliSecondsInSecond
    const miliSecondsInHour=60*miliSecondsInMinute
    const miliSecondsInDay=24*miliSecondsInHour
    const miliSecondsInWeek=60*miliSecondsInDay

    if(elapsedMiliseconds<miliSecondsInMinute){
        const seconds=Math.floor(elapsedMiliseconds/miliSecondsInSecond)
        return `Submitted ${seconds} seconds ago.` 
    }else if(elapsedMiliseconds<miliSecondsInHour){
        const minutes=Math.floor(elapsedMiliseconds/miliSecondsInMinute)
        return `Submitted ${minutes} minute(s) ago.`
    }else if(elapsedMiliseconds<miliSecondsInDay){
        const hours=Math.floor(elapsedMiliseconds/miliSecondsInHour)
        return `Submitted ${hours} hour(s) ago.`
    }else if(elapsedMiliseconds<miliSecondsInWeek){
        const days=Math.floor(elapsedMiliseconds/miliSecondsInDay)
        return `Submitted ${days} day(s) ago.`
    }else{
        const weeks=Math.floor(elapsedMiliseconds/miliSecondsInWeek)
        return `Submitted ${weeks} week(s) ago.`
    }
}