export function formatClocks(mhz: number, type: string){
  if(type === "cpu") return `${(mhz / 1000).toFixed(1)} GHz`;
  else return `${mhz} MHz`;
}