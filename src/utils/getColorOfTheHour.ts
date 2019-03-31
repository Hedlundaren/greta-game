export const getColorOfTheHour = (time: number) => {

  const hour = time % 255

  return `rgb(${Math.round(hour)}, 0, 0)`

  // Morning
  // const morningColor = 
  // Day

  // Evening

  // Night

}