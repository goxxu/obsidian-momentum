import CounterPlugin from "main"
import { App, PluginSettingTab, Setting } from "obsidian"
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

        containerEl.createEl("h2", { text: "Settings for counter" })

        new Setting(containerEl)
            .setName("Set as default")
            .addButton(button => {
                button
                    .setButtonText("Set default colors")
                    .onClick(async (event) => {
                        this.plugin.settings.years = DEFAULT_SETTINGS.years
                        this.plugin.settings.months = DEFAULT_SETTINGS.months
                        this.plugin.settings.days = DEFAULT_SETTINGS.days
                        this.plugin.settings.hours = DEFAULT_SETTINGS.hours
                        this.plugin.settings.minutes = DEFAULT_SETTINGS.minutes
                        await this.plugin.saveSettings()
                    })
            })

        new Setting(containerEl)
            .setName("Title")
            .setDesc("Additional text above the counter")
            .addText((text) => {
                text
                    .setValue(this.plugin.settings.title)
                    .onChange(async (value) => {
                        this.plugin.settings.title = value
                        await this.plugin.saveSettings()
                    })
            })

        new Setting(containerEl)
            .setName("Title color")
            .setDesc("Set the color for title")
            .addColorPicker(picker => {
                picker
                    .setValue(this.plugin.settings.titleColor)
                    .onChange(async (value) => {
                        this.plugin.settings.titleColor = value
                        await this.plugin.saveSettings()
                    })
            })

        new Setting(containerEl)
            .setName("Years color")
            .setDesc("Set the color for 'Years'")
            .addColorPicker(picker => {
                picker
                    .setValue(this.plugin.settings.years)
                    .onChange(async (value) => {
                        this.plugin.settings.years = value
                        await this.plugin.saveSettings()
                    })
            })

        new Setting(containerEl)
            .setName("Months Color")
            .setDesc("Set the color for 'Months'")
            .addColorPicker((picker) =>
                picker
                    .setValue(this.plugin.settings.months)
                    .onChange(async (value) => {
                        this.plugin.settings.months = value
                        await this.plugin.saveSettings()
                    })
            )

        new Setting(containerEl)
            .setName("Days Color")
            .setDesc("Set the color for 'Days'")
            .addColorPicker((picker) =>
                picker
                    .setValue(this.plugin.settings.days)
                    .onChange(async (value) => {
                        this.plugin.settings.days = value
                        await this.plugin.saveSettings()
                    })
            )

        new Setting(containerEl)
            .setName("Hours Color")
            .setDesc("Set the color for 'Hours'")
            .addColorPicker((picker) =>
                picker
                    .setValue(this.plugin.settings.hours)
                    .onChange(async (value) => {
                        this.plugin.settings.hours = value
                        await this.plugin.saveSettings()
                    })
            )

        new Setting(containerEl)
            .setName("Minutes Color")
            .setDesc("Set the color for 'Minutes'")
            .addColorPicker((picker) =>
                picker
                    .setValue(this.plugin.settings.minutes)
                    .onChange(async (value) => {
                        this.plugin.settings.minutes = value
                        await this.plugin.saveSettings()
                    })
            )
    }
}

export default CounterSettingsTab