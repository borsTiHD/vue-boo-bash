import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'

describe('HelloWorld', () => {
    it('renders properly', () => {
        const wrapper = mount(undefined, { props: { msg: 'Hello Vitest' } })
        expect(wrapper.text()).toContain('Hello Vitest')
    })
})
