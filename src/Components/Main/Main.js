import 'swiper/css';
import { useContext } from 'react'
import { EventContext } from '../Events/EventsContext'
import EventList from './EventList';

function Main() {
    const {eventsData} = useContext(EventContext)
    let month = new Date().getMonth() +1
    let date = new Date().getDate()
    let year = new Date().getFullYear()

    if(month < 10){
        month = 0+''+month
    }

    if(date < 10){
        date = 0+''+date
    }

    let nowTime = new Date(month+'/'+date+'/'+year).getTime()

    const newFiltered = eventsData.filter(item => {
        const eventFullDate = item.active_date
        const eventDate = eventFullDate.split("/")
        const eventTime = new Date(eventDate[0]+'/'+eventDate[1]+'/'+eventDate[2]).getTime()
        if(
            eventTime > nowTime
        ){
            return item
        }
    })

    const oldFiltered = eventsData.filter(item => {
        const eventFullDate = item.active_date
        const eventDate = eventFullDate.split("/")
        const eventTime = new Date(eventDate[0]+'/'+eventDate[1]+'/'+eventDate[2]).getTime()
        if(
            eventTime < nowTime
        ){
            return item
        }
    })
    
    return (
        <>
        <h1>აქტიური ღონისძიებები</h1>
        <EventList filtered={newFiltered} title={'new'}/>
        <h1>ჩატარებული ღონისძიებები</h1>
        <EventList filtered={oldFiltered} title={'old'}/>
        </>
    )
}

export default Main