export  function formatInternet(bytes: number){
  if(bytes >= 1024 ** 3) return(`${(bytes / (1024**3)).toFixed(2)} GB/s`);
  else if(bytes >= 1024 ** 2) return(`${(bytes / (1024**2)).toFixed(2)} MB/s`);
  else return(`${(bytes / (1024)).toFixed(2)} KB/s`);
}