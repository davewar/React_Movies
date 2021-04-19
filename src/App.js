import Header from "./Components/Header";
import Navbar from './Components/Navbar'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Container } from "@material-ui/core";
import './app.css';
import Movies from "./pages/Movies";
import Search from "./pages/Search";


function App() {
  return (
    <BrowserRouter>
        <Header/>
        <div className="app">
          <Container>
            <Switch>
                <Route path="/" exact component={Movies} />      
                <Route path="/search" component={Search} />
             </Switch>
          </Container>  
        </div>
        <Navbar />
    </BrowserRouter>
  );
}

export default App;
