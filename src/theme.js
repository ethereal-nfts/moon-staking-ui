import theme from "@chakra-ui/theme"

theme.colors = {
  moon: {
    dark: "#040404",
    dkGray: "#8e98a2",
    blue:"#4da8fa",
    teal:"#01e9d7",
    violet:"#221e6c",
    ltViolet:"#6c6be9",
    red:"#ec6262",
    ltGray: "#d8e0e7",
    bgGray: "#f8f9fa",
    buttonBgGray: "#d8e0e7",
    buttonFgGray: "#7b7b7b"
  },
  ...theme.colors
}

theme.breakpoints = [
  "800px",
  "1200px",
  "1200px"
]
export default theme
