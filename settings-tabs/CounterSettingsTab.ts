import CounterPlugin from "main"
import moment from "moment"
import { App, Notice, PluginSettingTab, Setting } from "obsidian"
import { DEFAULT_SETTINGS } from "settings"


class CounterSettingsTab extends PluginSettingTab {
    plugin: CounterPlugin

    constructor(app: App, plugin: CounterPlugin) {
        super(app, plugin)
        this.plugin = plugin
    }

    display(): void {
        const { containerEl } = this

        containerEl.empty()
        containerEl.createEl("h2", { text: "Settings for counters" })

        Object.keys(this.plugin.settings.counters).forEach(counterId => {
            const counterSettings = this.plugin.settings.counters[counterId]

            containerEl.createEl("h3", { text: `Counter ${counterId}` })

            new Setting(containerEl)
                .setName("Set as default")
                .addButton(button => {
                    button
                        .setButtonText("Set default colors")
                        .onClick(async (event) => {
                            if (!counterId) {
                                new Notice("No counter selected.")
                                return
                            }

                            // Встановлюємо дефолтні кольори для обраного лічильника
                            await this.plugin.saveCounterSettings(counterId, {
                                titleColor: "#FFFFFF",
                                years: "#F7D8BA",
                                months: "#FFE7C7",
                                days: "#E1F8DC",
                                hours: "#CAF1DE",
                                minutes: "#ACDDDE",
                            })
                        })
                })

            new Setting(containerEl)
                .setName("Title")
                .setDesc("Additional text above the counter")
                .addText((text) => {
                    text
                        .setValue(counterSettings.title)
                        .onChange(async (value) => {
                            // this.plugin.settings.title = value
                            // await this.plugin.saveSettings()
                            await this.plugin.saveCounterSettings(counterId, { title: value })
                        })
                })

            new Setting(containerEl)
                .setName("Start Date")
                .setDesc("Set the start date for this counter")
                .addText((text) => {
                    const input = text.inputEl;
                    input.type = "date"; // Змінюємо тип input на date
                    input.value = counterSettings.startDate
                        ? moment(counterSettings.startDate, "MM-DD-YYYY HH:mm").format("YYYY-MM-DD")
                        : ""; // Форматуємо дату для date picker
                    input.onchange = async () => {
                        const value = input.value;
                        if (value) {
                            const formattedDate = moment(value, "YYYY-MM-DD").format("MM-DD-YYYY HH:mm");
                            await this.plugin.saveCounterSettings(counterId, { startDate: formattedDate });
                        }
                    };
                })

            new Setting(containerEl)
                .setName("Description")
                .setDesc("Add a meaningful description for this counter")
                .addText((text) => {
                    text
                        .setValue(counterSettings.description || "")
                        .onChange(async (value) => {
                            await this.plugin.saveCounterSettings(counterId, { description: value });
                        });
                })

            new Setting(containerEl)
                .setName("Title color")
                .setDesc("Set the color for title")
                .addColorPicker(picker => {
                    picker
                        .setValue(counterSettings.titleColor)
                        .onChange(async (value) => {
                            await this.plugin.saveCounterSettings(counterId, { titleColor: value })
                        })
                })

            new Setting(containerEl)
                .setName("Years color")
                .setDesc("Set the color for 'Years'")
                .addColorPicker(picker => {
                    picker
                        .setValue(counterSettings.years)
                        .onChange(async (value) => {
                            // this.plugin.settings.years = value
                            // await this.plugin.saveSettings()
                            await this.plugin.saveCounterSettings(counterId, { years: value })
                        })
                })

            new Setting(containerEl)
                .setName("Months Color")
                .setDesc("Set the color for 'Months'")
                .addColorPicker((picker) =>
                    picker
                        .setValue(counterSettings.months)
                        .onChange(async (value) => {
                            // this.plugin.settings.months = value
                            // await this.plugin.saveSettings()
                            await this.plugin.saveCounterSettings(counterId, { months: value })
                        })
                )

            new Setting(containerEl)
                .setName("Days Color")
                .setDesc("Set the color for 'Days'")
                .addColorPicker((picker) =>
                    picker
                        .setValue(counterSettings.days)
                        .onChange(async (value) => {
                            // this.plugin.settings.days = value
                            // await this.plugin.saveSettings()
                            await this.plugin.saveCounterSettings(counterId, { days: value })
                        })
                )

            new Setting(containerEl)
                .setName("Hours Color")
                .setDesc("Set the color for 'Hours'")
                .addColorPicker((picker) =>
                    picker
                        .setValue(counterSettings.hours)
                        .onChange(async (value) => {
                            // this.plugin.settings.hours = value
                            // await this.plugin.saveSettings()
                            await this.plugin.saveCounterSettings(counterId, { hours: value })
                        })
                )

            new Setting(containerEl)
                .setName("Minutes Color")
                .setDesc("Set the color for 'Minutes'")
                .addColorPicker((picker) =>
                    picker
                        .setValue(counterSettings.minutes)
                        .onChange(async (value) => {
                            // this.plugin.settings.minutes = value
                            // await this.plugin.saveSettings()
                            await this.plugin.saveCounterSettings(counterId, { minutes: value })
                        })
                )
        })
    }
}

export default CounterSettingsTab