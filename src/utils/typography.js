import Typography from "typography"
import FairyGates from "typography-theme-fairy-gates"

FairyGates.overrideThemeStyles = () => {
  return {
    "a.gatsby-resp-image-link": {
      boxShadow: `none`,
    },
    "h1,h2,h3,h4,h5,h6": {
      marginBottom: typography.rhythm(1)
    },
    blockquote: {
      fontStyle: 'normal',
      borderLeft: `${typography.rhythm(3 / 16)} solid black`
    },
    "h1 > a": {
      backgroundImage: 'none',
    },
    [`@media only screen and (max-width: 480px)`]: {
      blockquote: {
        fontStyle: 'normal',
      borderLeft: `${typography.rhythm(3 / 16)} solid black`
      }
    }
  }
}

const typography = new Typography(FairyGates)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
