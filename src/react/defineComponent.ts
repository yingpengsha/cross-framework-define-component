import {
  createElement,
  forwardRef,
  Fragment,
  useRef,
  Attributes,
  ReactElement,
  useState
} from 'react'
import {
  effectScope,
  pauseTracking,
  ReactiveEffect,
  resetTracking
} from '@vue/reactivity'
import { nextTick } from '@vue/runtime-core'

type RenderFunction = () => ReactElement;

export default function defineComponent<Props = {}> (
  setup: (props: Readonly<Props>) => RenderFunction
) {
  return forwardRef<{}, Props & Attributes>((rawReactProps, rawReactRef) => {
    // once flag
    const once = useRef(true)
    // effectScope
    const scope = useRef(effectScope(true))
    // render
    const render = useRef<RenderFunction>()
    // subtree
    const subtree = useRef<ReactElement>(createElement(Fragment))
    // rerender
    const rerender = useState(0)[1].bind(null, (pre) => pre + 1)

    if (once.current) {
      // call setup only once
      // reference: https://github.com/vuejs/core/blob/main/packages/runtime-core/src/component.ts#L658
      scope.current.run(() => {
        pauseTracking()
        render.current = setup(rawReactProps)
        resetTracking()
      })
    }

    // @ts-ignore
    const effect = useRef<ReactiveEffect>(
      // reference: https://github.com/vuejs/core/blob/main/packages/runtime-core/src/renderer.ts#L1541
      new ReactiveEffect(
        () => {
          subtree.current = render.current?.() || createElement(Fragment)
          rerender()
        },
        () => nextTick(effect.current.run()),
        scope.current
      )
    )

    if (once.current) {
      effect.current.run()
      once.current = false
    }

    return subtree.current
  })
}
