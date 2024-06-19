import Paper from '@mui/material/Paper'
import { AppointmentForm, ConfirmationDialog, EditingState, IntegratedEditing, ViewState } from '@devexpress/dx-react-scheduler'
import { Scheduler, Toolbar, DateNavigator, Appointments, TodayButton, WeekView } from '@devexpress/dx-react-scheduler-material-ui'
import { Dispatch } from 'react';


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

const SchedulerComponent = ({ data, locale, height, startHour, endHour, setValue, cellDuration = 60 }:
    { data: any[], locale: string, height: number, startHour: number, endHour: number, setValue?: Dispatch<any>, cellDuration?: number }) => {

    const handleChange = ({ startDate, endDate }: { startDate: Date, endDate: Date }) => { if (setValue) setValue({ startDate, endDate }) }

    return (
        <Paper>
            <Scheduler locale={locale} height={height} data={data}>
                <ViewState
                    defaultCurrentDate={new Date()}
                />
                <EditingState onCommitChanges={() => { }} />
                <IntegratedEditing />
                <WeekView startDayHour={startHour} endDayHour={endHour} cellDuration={cellDuration}
                    timeTableCellComponent={(props) => <TimeTableCell {...props} onClick={handleChange} />} />
                <Toolbar />
                <DateNavigator />
                <TodayButton />
                <Appointments  />
            </Scheduler>
        </Paper>
    )
}

export { SchedulerComponent }