import { useLocation } from "react-router";
import "./header.css";

const Header = () => {

  const location = useLocation()
  // console.log(location.pathname)
  return (
    <span onClick={() => window.scroll(0, 0)} className="header">
                {location.pathname ==="/" ? "Films" : "Films - TV "}
    </span>
  );
};

export default Header