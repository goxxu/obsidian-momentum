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
		const stringForReplace = `[habit-counter|${moment().format("MM-DD-YYYY hh:mm")}]`
		
		this.addCommand({
			id: "add-momentum-counter",
			name: "Add momentum counter",
			editorCallback: (editor: Editor) => {
				editor.replaceSelection(`${stringForReplace}\n`)
			}
		})

		this.registerMarkdownPostProcessor((el, ctx) => {
			const elements = el.querySelectorAll("p")
			
			elements.forEach((p) => {
				const matches = Array.from(p.textContent?.matchAll(/\[habit-counter\|([\d-]+ [\d:]+)\]/g) || [])

				if (matches.length > 0) {
					const fragments = document.createDocumentFragment()

					let lastIndex = 0

					matches.forEach(match => {
						const startIndex = match.index!
						const endIndex = startIndex + match[0].length

						if (startIndex > lastIndex) {
							const textNode = document.createTextNode(p.textContent!.slice(lastIndex, startIndex))

							fragments.appendChild(textNode)
						}

						const container = document.createElement("span")
						fragments.appendChild(container)

						const startDate = match[1]

						const root = createRoot(container)
						root.render(<ReactView data={{ startDate, settings: this.settings }} />)

						lastIndex = endIndex
					})

					if (lastIndex < p.textContent!.length) {
						const textNode = document.createTextNode(p.textContent!.slice(lastIndex))

						fragments.appendChild(textNode)
					}

					p.replaceChildren(fragments)
				}
            })
		})
	}

	async saveSettings() {
        await this.saveData(this.settings)

		this.init()
    }
}

