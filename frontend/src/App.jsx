import Home from "./components/Home";
import PageNotFound from "./components/PageNotFound";
import {Route, Routes} from "react-router-dom";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div>
       <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="*" element={<PageNotFound/>}/>
       </Routes>
       <Toaster />
    </div>
  );
}

export default App;
