import Paper from '@mui/material/Paper'
import { ViewState } from '@devexpress/dx-react-scheduler'
import { Scheduler, Toolbar, DateNavigator, Appointments, TodayButton, WeekView } from '@devexpress/dx-react-scheduler-material-ui'


interface TimeTableCellProps extends WeekView.TimeTableCellProps {
    onClick: ({ startDate, endDate }: { startDate: Date, endDate: Date }) => void;
}


const TimeTableCell = (props: TimeTableCellProps) => {
    const { onClick, ...restProps } = props

    const handleClick = () => {
        const { startDate, endDate } = restProps

        if (!startDate || !endDate) return

        onClick({ startDate, endDate })
    }

    return (
        <WeekView.TimeTableCell {...restProps} onClick={handleClick} />
    )
}

const SchedulerComponent = ({ data, locale, height, startHour, endHour }: { data: any[], locale: string, height: number, startHour: number, endHour: number }) => {

    const handleChange = ({ startDate, endDate }: { startDate: Date, endDate: Date }) => {
        console.log(startDate, endDate)
    }

    return (
        <Paper>
            <Scheduler locale={locale} height={height} data={data}>
                <ViewState
                    defaultCurrentDate={new Date()}
                />
                <WeekView startDayHour={startHour} endDayHour={endHour} cellDuration={60}
                    timeTableCellComponent={(props) => <TimeTableCell {...props} onClick={handleChange} />} />
                <Toolbar />
                <DateNavigator />
                <TodayButton />
                <Appointments />
            </Scheduler>
        </Paper>
    )
}

export { SchedulerComponent }