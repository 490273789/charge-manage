import { defineConfig, normalizePath, loadEnv } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'
import stylelint from 'vite-plugin-stylelint'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

const variablePath = normalizePath(path.resolve('./src/style/variable.scss'))

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [
      react(),
      eslint(),
      stylelint({ fix: true }),
      createSvgIconsPlugin({
        iconDirs: [path.join(__dirname, 'src/assets/svg/')]
      })
    ],
    css: {
      modules: {
        // name 表示当前文件名，local 表示类名
        generateScopedName: '[local]___[hash:base64:5]'
      },
      preprocessorOptions: {
        scss: {
          // additionalData的内容会在每个scss文件的开头自动注入
          additionalData: `@import "${variablePath}";`
        }
      }
    },
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src'),
        '@assets': path.join(__dirname, 'src/assets'),
        '@components': path.join(__dirname, 'src/components')
      }
    },
    server: {
      host: '0.0.0.0',
      proxy: {
        '/api': {
          target: env.VITE_PROXY_URL,
          changeOrigin: true
          // rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  }
})
