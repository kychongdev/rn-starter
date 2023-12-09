import { createMedia } from '@tamagui/react-native-media-driver'
import { createTamagui } from 'tamagui' // or '@tamagui/core'
import { themes, tokens } from "@tamagui/themes";
import { createInterFont } from "@tamagui/font-inter";

const headingFont = createInterFont();
const bodyFont = createInterFont();

const config = createTamagui({
    defaultTheme: "light",
    shouldAddPrefersColorThemes: false,
    fonts: {
        heading: headingFont,
        body: bodyFont
    },
    tokens,
    themes,
    // `@tamagui/core` doesn't provide media query capabilities out of the box
    // for native as it is de-coupled from react-native.

    // For web-only, media queries work out of the box and you can avoid the
    // `createMedia` call here by passing the media object directly.

    // If targeting React Native, add this driver and use this `createMedia` helper.
    // If web-only you can leave out `createMedia` and just use an object.
    media: createMedia({
        sm: { maxWidth: 860 },
        gtSm: { minWidth: 860 + 1 },
        short: { maxHeight: 820 },
        hoverNone: { hover: 'none' },
        pointerCoarse: { pointer: 'coarse' },
    }),

    // optional:

    // add custom shorthand props
    // note: as const is important, without it you may see breaking types
    shorthands: {
        px: 'paddingHorizontal',
        f: 'flex',
        w: 'width',
    } as const,

    // Experimental / advanced, only for overriding the core component styles
    // Prefer to use styled() for building your own, only useful for edge cases.
    // defaultProps: {
    //     Text: {
            // override any default props here
        // },
    // },
})

type AppConfig = typeof config

// this will give you types for your components
// note - if using your own design system, put the package name here instead of tamagui
declare module 'tamagui' {
    interface TamaguiCustomConfig extends AppConfig {}

}

export default config