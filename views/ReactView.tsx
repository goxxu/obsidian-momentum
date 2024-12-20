import { ItemView, WorkspaceLeaf } from "obsidian"
import { Root, createRoot } from 'react-dom/client'
import ReactView from "../src/ReactView"
import { StrictMode } from "react"

export const VIEW_TYPE_TEST = "test-view"

export class TestView extends ItemView {
    root: Root | null = null

    constructor(leaf: WorkspaceLeaf) {
        super(leaf)
    }

    getViewType() {
        return VIEW_TYPE_TEST
    }

    getDisplayText() {
        return 'Example view'
    }

    async onOpen() {
        this.root = createRoot(this.containerEl.children[1]);
        this.root.render(
            <StrictMode>
                <ReactView />
            </StrictMode>
        )
    }

    async onClose() {
        this.root?.unmount()
    }

}