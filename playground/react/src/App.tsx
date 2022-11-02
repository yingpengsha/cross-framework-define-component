import { ReactDefineComponent, ref } from 'cross-framework-define-component'
import Button from './Button'

export default ReactDefineComponent(() => {
  const loading = ref(false)
  const onClick = () => {
    loading.value = true
    setTimeout(() => {
      loading.value = false
    }, 3000)
  }

  return () =>
    <Button loading={loading.value} onClick={onClick} />
})
