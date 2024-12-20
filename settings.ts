export interface CounterPluginSettings {
    title: string,
    titleColor: string,
    years: string,
    months: string,
    days: string,
    hours: string,
    minutes: string,
}

export const DEFAULT_SETTINGS: CounterPluginSettings = {
    title: "",
    titleColor: "#FFFFFF",
    years: "#F7D8BA",
    months: "#FFE7C7",
    days: "#E1F8DC",
    hours: "#CAF1DE",
    minutes: "#ACDDDE",
}