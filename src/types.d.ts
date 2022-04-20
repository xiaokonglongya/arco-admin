import type { EditorManager } from 'tinymce'

declare global {
  interface Window {
    tinymce: EditorManager
  }
}
