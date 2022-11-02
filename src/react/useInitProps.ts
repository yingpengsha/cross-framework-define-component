import { InternalObjectKey, InternalAttributes } from '@/shared/constants'
import { Data } from '@/shared/types'
import {
  ComponentPropsOptions
} from '@vue/runtime-core'
import { def, hasOwn } from '@vue/shared'

// reference: https://github.com/vuejs/core/blob/main/packages/runtime-core/src/componentProps.ts#L154
export default function useInitProps (
  propsOptions: ComponentPropsOptions,
  rawReactProps: Data | null
) {
  const props: Data = {}
  const attrs: Data = {}
  def(attrs, InternalObjectKey, 1)

  // reference: https://github.com/vuejs/core/blob/main/packages/runtime-core/src/componentProps.ts#L336
  if (rawReactProps) {
    for (const key in rawReactProps) {
      if (InternalAttributes.includes(key)) {
        continue
      }
      const value = rawReactProps[key]
      if (hasOwn(propsOptions, key)) {
        props[key] = value
      } else {
        attrs[key] = value
      }
    }
  }

  const propsDefaults = Object.create(null)
}
