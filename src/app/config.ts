export let globalConfig = {
  imageRootURI:"",
  backgroundColor:"cornsilk",
  navbarTextColor:"black",
  navbarHoverTextColor:"red",
  artist:"",
  recentWorkYears:1,
  devAPIURI: "http://localhost:8000",
  filename: ""
}

export function updateConfig (newConfig) {
  console.log("Merge",newConfig, "into",globalConfig);

  globalConfig = {...globalConfig, ...newConfig}
}
