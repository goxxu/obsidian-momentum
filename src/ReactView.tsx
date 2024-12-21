import moment from "moment"
import { FC, useEffect, useState } from "react"

// Styles
import "./styles/counter.sass"

// Local Types 
type Counter = {
    counter: number,
    type: string,
}

interface ReactViewProps {
    data?: any,
}

const ReactView: FC<ReactViewProps> = ({ data }) => {

    /* Other */
    const { settings } = data
    /* Other */

    /* State */
    const [counters, setCounters] = useState<Counter[]>([])
    const [currentSettings, setCurrentSettings] = useState<any>({})
    /* State */

    /* EFFECTS */
    useEffect(() => {
        updateCounters()
        setInterval(updateCounters, 60000)
    }, [])

    useEffect(() => {
        setCurrentSettings(settings)
    }, [settings])
    /* EFFECTS */

    /* Halpers */
    const updateCounters = () => {
        const startMoment = moment(settings.startDate, "MM-DD-YYYY HH:mm")

        const now = moment()
        const duration = moment.duration(now.diff(startMoment))

        const years = duration.years()
        const months = duration.months()
        const days = duration.days()
        const hours = duration.hours()
        const minutes = duration.minutes()
        const seconds = duration.seconds()

        setCounters([
            {
                counter: years,
                type: "years",
            },
            {
                counter: months,
                type: "months",
            },
            {
                counter: days,
                type: "days",
            },
            {
                counter: hours,
                type: "hours",
            },
            {
                counter: minutes,
                type: "minutes",
            },
        ])
    }

    const getWidth = (item: Counter) => {

        const now = moment()
        const startOfYear = moment().startOf("year")
        
        switch (item.type) {
            case "years":
                return (now.diff(startOfYear, "days") / 365) * 100
            case "months":
                return (item.counter / 12) * 100
            case "days":
                return (item.counter / moment().daysInMonth()) * 100
            case "hours":
                return (item.counter / 24) * 100
            case "minutes":
                return (item.counter / 60) * 100
            default:
                return 0
        }
    }
    /* Halpers */

    return <>
        <div className="c-counter-wrap">
            {currentSettings?.title 
                && <h3
                    className="c-counter-title"
                    style={{ color: currentSettings.titleColor }}
                >
                    {currentSettings?.title}
                </h3>}
            <div className="c-habit-counter">
                {counters.map((counter, index) => {
                    if (counter.counter === 0)
                        return false

                    return <div className="c-counter-item">
                        <div className="transparent-bg"></div>
                        <div
                            style={{
                                width: `${getWidth(counter)}%`,
                                backgroundColor: currentSettings[counter?.type],
                            }}
                            className={`c-counter-progress cc-progress${index}`}
                        ></div>
                        <span className="c-counter-text">{counter?.counter} {counter?.type}</span>
                    </div>
                })}
            </div>
        </div>
    </>

}

export default ReactView