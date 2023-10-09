import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@components': path.resolve(__dirname, './src/components'),
      '@utils/constants': path.resolve(__dirname, './src/utils/constants'),
      '@utils/helpers': path.resolve(__dirname, './src/utils/helpers'),
      '@utils/hooks': path.resolve(__dirname, './src/utils/hooks'),
      '@ui/fields': path.resolve(__dirname, './src/ui/fields'),
      '@ui/button': path.resolve(__dirname, './src/ui/button'),
    },
  },
  plugins: [react()],
})
