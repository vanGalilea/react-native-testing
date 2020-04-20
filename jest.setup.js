import React from 'react'

jest.mock(
    'react-native/Libraries/Components/Touchable/TouchableOpacity.js',
    () => {
        const { TouchableHighlight } = require('react-native')
        const MockTouchable = props => {
            return <TouchableHighlight {...props} />
        }
        MockTouchable.displayName = 'TouchableOpacity'

        return MockTouchable
    }
)

global.fetch = jest.fn()

