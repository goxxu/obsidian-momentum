import esbuild from "esbuild"
import process from "process"
import builtins from "builtin-modules"
import { sassPlugin } from "esbuild-sass-plugin"
import fs from "fs"

const renamePlugin = () => ({
	name: 'rename-plugin',
	setup(build) {
		build.onEnd(async () => {
			try {
				fs.renameSync('./main.css', './styles.css')
			} catch (e) {
				console.error('Failed to rename file:', e)
			}
		});
	},
})

const prod = (process.argv[2] === "production")

const context = await esbuild.context({
	// banner: {
	// 	js: banner,
	// },
	entryPoints: ["main.tsx"],
	bundle: true,
	plugins: [
		sassPlugin({
			type: "css"
		}),
		renamePlugin(),
	],
	external: [
		"obsidian",
		"electron",
		"@codemirror/autocomplete",
		"@codemirror/collab",
		"@codemirror/commands",
		"@codemirror/language",
		"@codemirror/lint",
		"@codemirror/search",
		"@codemirror/state",
		"@codemirror/view",
		"@lezer/common",
		"@lezer/highlight",
		"@lezer/lr",
		...builtins],
	format: "cjs",
	target: "es2018",
	logLevel: "info",
	sourcemap: prod ? false : "inline",
	treeShaking: true,
	outfile: "main.js",
	minify: prod,
})

if (prod) {
	await context.rebuild()
	process.exit(0)
} else {
	await context.watch()
}
