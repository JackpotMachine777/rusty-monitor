export function formatTime(seconds: number){
  const days = Math.floor(seconds / 86400);
  const hrs = Math.floor((seconds % 86400) / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (!days && !hrs && !mins) return `${secs}s`;
  if (!days && !hrs) return `${mins}m ${secs}s`;
  if (!days) return `${hrs}h ${mins}m ${secs}s`;
  else return `${days}d ${hrs}h ${mins}m ${secs}s`; 
}