import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
// `base` is only applied for production builds so the app works under the
// GitHub Pages project path (/sanity-templates/) while local dev stays at /.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/sanity-templates/' : '/',
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
}))
