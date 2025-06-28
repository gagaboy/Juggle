/*
 * @Author: Eric Chang gagaboy@126.com
 * @Date: 2025-02-21 16:23:39
 * @LastEditors: Eric Chang gagaboy@126.com
 * @LastEditTime: 2025-03-07 18:27:30
 * @FilePath: /Juggle/console-ui/vite.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import monacoEditorPlugin from 'vite-plugin-monaco-editor'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  console.log("后端 API 代理地址："+env.VITE_API_PROXY)
  return {
    plugins: [
      vue(),
      monacoEditorPlugin({
        languageWorkers: ['editorWorkerService', 'typescript', 'json']
      })

    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      open: true,
      host: '0.0.0.0',
      proxy: {
        '^/api': env.VITE_API_PROXY,
        '^/open': env.VITE_API_PROXY
      }
    }
  }
})
