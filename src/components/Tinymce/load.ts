const callbacks: Array<(message: null | Error, element: HTMLScriptElement) => void> = []

/**
 * 是否已经加载完毕
 * @returns tinumce || false
 */
export function getTinymce() {
  return window.tinymce ?? (window.tinymce || false)
}
function loadTinymec(
  src: string,
  callback: (message: null | Error, element: HTMLScriptElement) => void
) {
  const isAppend = document.getElementById(src)
  if (!isAppend) {
    const script = document.createElement('script')
    script.src = src
    script.id = src
    document.body.append(script)
    const cb = callback
    callbacks.push(cb)
    script.onload = () => {
      for (let index = 0; index < callbacks.length; index += 1) {
        const tempCallback = callbacks[index]
        tempCallback(null, script)
      }
    }
    script.onerror = () => {
      cb(new Error(`${src}加载失败,请检查后再试`), script)
    }
  }
}

export default loadTinymec
