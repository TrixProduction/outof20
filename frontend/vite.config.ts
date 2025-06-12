import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  define: {
    'import.meta.env.VITE_NTFY_TOPIC_ID': JSON.stringify(process.env.NTFYTOPICID || 'dimitrisnotes'),
    'import.meta.env.VITE_SUMMARY_URL': JSON.stringify(process.env.SUMMARYURL || 'https://YOUR_REGION-your_project.cloudfunctions.net/getNotesSummary'),
  },
});