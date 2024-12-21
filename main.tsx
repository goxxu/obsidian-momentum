import {
	App,
	Editor,
	MarkdownView,
	Modal,
	Notice,
	Plugin,
	PluginSettingTab,
	Setting,
	ItemView,
	WorkspaceLeaf,
} from 'obsidian'
import { createRoot } from "react-dom/client"
import ReactView from "./src/ReactView"
import moment from 'moment'
import { CounterPluginSettings, DEFAULT_SETTINGS } from 'settings'
import CounterSettingsTab from "./settings-tabs/CounterSettingsTab"
import { v4 as uuidv4 } from "uuid"

export default class CounterPlugin extends Plugin {

	startDate: string | null = null
	settings: CounterPluginSettings

	async onload() {
		/* Settings */
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData())

		this.addSettingTab(new CounterSettingsTab(this.app, this))
		/* Settings */

		this.init()

	}

	onunload() {}

	async init() {
		

		this.addCommand({
			id: "add-momentum-counter",
			name: "Add Momentum Counter",
			editorCallback: (editor: Editor) => {
				const nextCounterId = this.settings.lastCounterId + 1

				editor.replaceSelection(`[momentum-counter|${nextCounterId}]`)
				this.settings.lastCounterId = nextCounterId
				this.saveSettings()
			}
		})

		this.registerMarkdownPostProcessor((el, ctx) => {
			const elements = el.querySelectorAll("p")

			const spans = document.querySelectorAll("span[data-counter-id]")

			elements.forEach(p => {
				const matches = Array.from(p.textContent?.matchAll(/\[momentum-counter\|\d+\]/g) || [])

				if (matches.length > 0) {
					const fragments = document.createDocumentFragment()
					let lastIndex = 0

					matches.forEach((match, index) => {
						const startIndex = match.index!
						const endIndex = startIndex + match[0].length

						if (startIndex > lastIndex) {
							const textNode = document.createTextNode(p.textContent!.slice(lastIndex, startIndex))
							fragments.appendChild(textNode)
						}

						const container = document.createElement("span")

						const counterId = match[0].split("|")[1].slice(0, -1)

						if (!this.settings.counters[counterId]) {
							const nextCounterId = this.settings.lastCounterId + 1
							this.settings.lastCounterId = nextCounterId

							this.saveSettings()

							this.settings.counters[counterId] = {
								title: `Counter ${counterId}`,
								description: "No description yet",
								startDate: moment().format("MM-DD-YYYY HH:mm"),
								titleColor: "#FFFFFF",
								years: "#F7D8BA",
								months: "#FFE7C7",
								days: "#E1F8DC",
								hours: "#CAF1DE",
								minutes: "#ACDDDE",
							}
						}

						const root = createRoot(container)
						root.render(
							<ReactView
								data={{
									settings: this.settings.counters[counterId],
								}}
							/>
						)

						fragments.appendChild(container)

						lastIndex = endIndex
					})

					if (lastIndex < p.textContent!.length) {
						const textNode = document.createTextNode(
							p.textContent!.slice(lastIndex)
						)

						fragments.appendChild(textNode)
					}

					p.replaceChildren(fragments)
				}
			})

			this.saveSettings()
		})
	}

	async saveCounterSettings(
		counterId: string,
		newSettings: Partial<CounterPluginSettings["counters"][string]>
	) {
		if (!this.settings.counters[counterId]) {
			console.error(`Counter with ID ${counterId} does not exist.`)
			return
		}
	
		Object.assign(this.settings.counters[counterId], newSettings)
	
		await this.saveSettings()
	
		this.init()
	}

	async saveSettings() {
        await this.saveData(this.settings)
    }

	async resetSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS)
		this.saveSettings()
	}
}

