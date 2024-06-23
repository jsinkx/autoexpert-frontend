import { defineConfig, loadEnv } from 'vite'
import eslint from 'vite-plugin-eslint'
import { ViteMinifyPlugin } from 'vite-plugin-minify'
import tsconfigPaths from 'vite-tsconfig-paths'

import react from '@vitejs/plugin-react'

export default ({ mode }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

	const PORT = Number(process.env.VITE_PORT) || 3000

	return defineConfig({
		base: '.',
		plugins: [
			tsconfigPaths(), // Load paths (aliases) from tsconfig
			eslint(), // Linting
			react({
				babel: {
					babelrc: true,
				},
			}),
			ViteMinifyPlugin({}), // Minify
		],
		build: {
			outDir: './dist',
			sourcemap: false,
			chunkSizeWarningLimit: 1600,
		},
		server: {
			watch: {
				usePolling: true,
			},
			host: true,
			strictPort: true,
			port: PORT,
		},
		preview: {
			port: PORT,
		},
	})
}
