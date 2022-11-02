import { ReactDefineComponent, ref } from 'cross-framework-define-component'

export default ReactDefineComponent(() => {
  const tick = ref(0)
  setInterval(() => { tick.value += 1 }, 1000)
  return () => <button>{tick.value}</button>
})
