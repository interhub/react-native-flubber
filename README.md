# React Native Flubber 🍻

### Simple library RN for IOS and Android 🍎 🤖

## That now Library is supporting and work ⚙️

TS only.

[video example source link 🪐]( http://www.interhub.ml/source/flubber-ex.mp4 )

![video example not loads 🤖]( http://www.interhub.ml/source/flubber-ex.gif  ) 

[repository code example from video*](https://github.com/interhub/rn-examples/tree/master/examples/FlubberSvg)

# Install



1. install **react-native-svg** 
 
[react-native-svg](https://github.com/react-native-svg/react-native-svg)

2. install **react-native-reanimated**

[react-native-reanimated](https://github.com/software-mansion/react-native-reanimated)

3. Install library **react-native-flubber**

> yarn add react-native-flubber
 

# Usage

### 1. look example usage.

```tsx
import React from 'react'
import {Button} from 'react-native'
import Animated from 'react-native-reanimated'
import Svg, {Path} from 'react-native-svg'

import SIZE from '../../../src/config/SIZE'
import {useFlubber} from 'react-native-flubber'


const AnimatePath = Animated.createAnimatedComponent(Path)

const one =
        'M311.825 69.0621C288.331 48.1433 217.887 20.7871 173.012 21.3433C162.6 21.5496 152.325 22.4496 142.337 24.1558C125.381 27.0558 110.962 33.5371 98.7812 42.5558C97.7562 43.1621 96.6937 43.7246 95.675 44.3808C65.8875 63.5058 50.1062 89.8121 49.375 120.275C48.9125 121.831 48.0437 125.025 48.0312 125.068C35.7625 132.843 -7.33752 166.268 1.05624 186.537C3.99999 193.687 42.375 189.468 48.7875 187.931C60.0625 185.206 68.725 183.118 76.9187 183.775C85.1187 184.425 101.256 189.031 111.725 190.131C156.319 194.881 198.562 190.718 236.519 209.068C255.394 218.2 260.181 245.868 256.644 264.462C250.781 282.225 239.931 297.4 219.806 304.8C208.087 309.112 196.219 308.118 185.169 304.162C170.469 286.462 153.269 272.475 131.819 261.768C114.737 253.243 116.619 297.456 155.25 324.518C155.919 324.981 156.387 325.518 156.944 326.031C157.9 336.85 147.294 349.243 143.825 358.456C139.525 369.943 136.712 401.706 145.006 398.868C162.637 392.85 175.987 380.812 184.581 365.481C190.05 361.6 193.837 344.931 200.094 342.475C281.237 310.493 313.856 301.843 343.837 244.668C375.519 184.268 361.869 113.575 311.806 69.0433'
const two =
        'M85.6666 135.667H135.667V85.6668L77.3333 27.3335C95.9938 18.4214 116.958 15.5136 137.34 19.0105C157.722 22.5075 176.518 32.2371 191.14 46.8597C205.763 61.4823 215.493 80.2786 218.99 100.66C222.486 121.042 219.579 142.006 210.667 160.667L310.667 260.667C317.297 267.297 321.022 276.29 321.022 285.667C321.022 295.044 317.297 304.036 310.667 310.667C304.036 317.297 295.043 321.022 285.667 321.022C276.29 321.022 267.297 317.297 260.667 310.667L160.667 210.667C142.006 219.579 121.042 222.487 100.66 218.99C80.2783 215.493 61.482 205.763 46.8595 191.141C32.2369 176.518 22.5072 157.722 19.0103 137.34C15.5134 116.958 18.4212 95.994 27.3333 77.3335L85.6666 135.667Z'

const three =
        'M309.792 365.25C292.5 391.084 274.167 416.292 246.25 416.709C218.333 417.334 209.375 400.25 177.708 400.25C145.833 400.25 136.042 416.292 109.583 417.334C82.2917 418.375 61.6667 389.834 44.1667 364.625C8.54167 313.167 -18.75 218.375 17.9167 154.625C36.0417 122.959 68.5417 102.959 103.75 102.334C130.417 101.917 155.833 120.459 172.292 120.459C188.542 120.459 219.375 98.167 251.667 101.5C265.208 102.125 303.125 106.917 327.5 142.75C325.625 144 282.292 169.417 282.708 222.125C283.333 285.042 337.917 306.084 338.542 306.292C337.917 307.75 329.792 336.292 309.792 365.25ZM190.833 31.917C206.042 14.6253 231.25 1.50033 252.083 0.666992C254.792 25.042 245 49.6253 230.417 67.1253C216.042 84.8337 192.292 98.5837 168.958 96.7087C165.833 72.7503 177.5 47.7503 190.833 31.917V31.917Z'

export default () => {

    const {animatedProps, setFlubberIndex, sharedPathValue} = useFlubber([one, two, three], {
        step: 0.05,
        initialIndex: 1,
        onChange: (path, frame) => {
            console.log({path}, {frame})
        },
    })

   return (
           <Animated.View style={styles.container}>
               <View style={{flex: 1}}>
                  <Svg height={SIZE.height} width={SIZE.width}>
                       <AnimatePath fill="none" stroke="red" animatedProps={animatedProps} />
                  </Svg>
               </View>
              <Button title={'set index 0'} onPress={() => setFlubberIndex(0)} />
              <Button title={'set index 1'} onPress={() => setFlubberIndex(1)} />
              <Button title={'set index 2'} onPress={() => setFlubberIndex(2)} />
           </Animated.View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 24,
      backgroundColor: '#f5f1d8',
   },
})
```


### 4. Final - ✨📲 Look at work view motion!

# Documentation.

### 1. **useFlubber**(paths: **string[]**, config?: **FlubberConfig**): **FlubberObject**

**paths**

- paths: **string**[] - (array your string svg paths)

**FlubberConfig**

- step?: **number** from 0 to 1 to change state

- initialIndex?: **number** initial svg string path show index from your **paths** array

- onChange: (path: **string**, frame: **number**)=>**void** (js animation frame callback which call every frame change in **requestAnimationFrame**)

**FlubberObject**

- animatedProps: returned value from reanimated hook [useAnimatedProps](https://www.reanimated2.com/docs/api/useAnimatedProps#example) 

- setFlubberIndex: (index: **number**)=>**void** callback to set up next path show state from your **paths** array

- sharedPathValue: returned value from useSharedValue with string path value [useSharedValue](https://www.reanimated2.com/docs/api/useSharedValue)

- currentIndex: **number** current state index set from useSharedValue

#Contact

✨Lib going to grow up, and you can send your questions and offers to my telegram [Stepan_Turchenko](https://telegram.me/Stepan_Turchenko) 🛬
