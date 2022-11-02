import { ReactDefineComponent } from 'cross-framework-define-component'

export default ReactDefineComponent<{loading?: boolean, onClick?: React.MouseEventHandler<HTMLButtonElement>}>((props) => {
  return () => {
    const { loading = false, onClick = () => {} } = props
    return <button
      disabled={loading}
      onClick={onClick}
    >
      i'm {loading ? 'loading' : 'button'}
    </button>
  }
})
