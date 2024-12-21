export interface CounterPluginSettings {
    lastCounterId: number,
    counters: {
        [counterId: string]: {
            title: string
            description: string,
            startDate: string,
            titleColor: string
            years: string
            months: string
            days: string
            hours: string
            minutes: string
        }
    }
}

export const DEFAULT_SETTINGS: CounterPluginSettings = {
    lastCounterId: 0,
    counters: {},
}