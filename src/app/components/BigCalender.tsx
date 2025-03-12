import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { calendarEvents } from '../../lib/data'
import { useState } from 'react'
import { View } from 'react-calendar/dist/cjs/shared/types'

const localizer = momentLocalizer(moment)

const BigCalendar = () => {
    // const [view,setView] = useState<View>(Views.work_week)
    return(
            <Calendar
            localizer={localizer}
            events={calendarEvents}
            startAccessor="start"
            endAccessor="end"
            views={["work_week", "day"]}
            view="work_week"
            style={{ height: '98%' }}
            min={new Date(2025, 1, 0, 8, 0, 0)}
            max={new Date(2025, 1, 0, 17, 0, 0)}
            />
    )
}
    

export default BigCalendar