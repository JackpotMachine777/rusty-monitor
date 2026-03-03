import Cpu from "./components/Cpu";
import OS from "./components/OS";
import Gpu from "./components/Gpu";
import Processes from "./components/Processes";
import Disks from "./components/Disks";
import Ram from "./components/Ram";
import Network from "./components/Network";

import "./App.css";

export default function App() { 
  return (
    <>
      <div className="container">
        <OS />
        <Cpu />
        <Ram />
        <Gpu />
        <Network />
        <Disks />
      </div>
      <br />
      <Processes />
    </>
  )
}