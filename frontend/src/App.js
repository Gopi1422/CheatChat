import "./App.css";
import Homepage from "./Pages/Homepage";
import { Route, Switch, useHistory } from "react-router-dom";
import Chatpage from "./Pages/Chatpage";
import { isAuthenticated } from "../src/services/utills/authentication/login";
import { useToast } from "@chakra-ui/react";
import NotFound from "./Pages/NotFound";

function App() {
  const history = useHistory();
  const toast = useToast();
  const isAuth = isAuthenticated(toast);

  return (
    <div className="App">
      <Switch>
        {isAuth || isAuth === false ? (
          <Route path="/" exact component={Homepage} />
        ) : (
          <Route path="/" exact element={history.push("/chats")} />
        )}
        {/* <Route path="/" component={Homepage} exact /> */}
        <Route path="/chats" component={Chatpage} />
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
