import { defineConfig, loadEnv, splitVendorChunkPlugin } from 'vite'
import eslint from 'vite-plugin-eslint'
import { ViteMinifyPlugin } from 'vite-plugin-minify'
import tsconfigPaths from 'vite-tsconfig-paths'

import reactRefresh from '@vitejs/plugin-react-swc'

// vite config

export default ({ mode }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

	const PORT = Number(process.env.VITE_PORT) || 3000

	return defineConfig({
		base: '.',
		plugins: [
			tsconfigPaths(), // Load paths (aliases) from tsconfig
			eslint(), // Linting
			reactRefresh(), // HMR
			ViteMinifyPlugin({}), // Minify
			splitVendorChunkPlugin(), // Split vendor chunks
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
