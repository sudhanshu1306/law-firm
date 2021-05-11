import "./App.css";
import Body from "./Body";
import Footer from "./Footer";
import Header from "./Header";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Jobs from "./Jobs";
import Login from "./Login";
import Signup from "./Signup";
import Articles from "./Articles";
import Training from "./Training";
import Lessons from "./Lessons";
import Discussion from "./Discussion";
import Approve from "./Approve";
import Lecture from "./Lecture";
import Employer from "./Employer";
import Applications from "./Applications";
import EmployerHeader from "./EmployerHeader";
import EmployerAccount from "./EmployerAccount";
import Dashboard from "./Dashboard";
import Education from "./Education";
import RegisteredCourse from "./RegisteredCourse";
import SideBar from "./SideBar";
import Skills from "./Skills";
import MyArticles from "./MyArticles";
import MyJobs from "./MyJobs";

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/myJobs">
            <div className="studentAccount">
              <SideBar />
              <MyJobs />
            </div>
          </Route>
          <Route path="/myArticles">
            <div className="studentAccount">
              <SideBar />
              <MyArticles />
            </div>
          </Route>
          <Route path="/skills">
            <div className="studentAccount">
              <SideBar />
              <Skills />
            </div>
          </Route>
          <Route path="/registeredCourse">
            <div className="studentAccount">
              <SideBar />
              <RegisteredCourse />
            </div>
          </Route>
          <Route path="/education">
            <div className="studentAccount">
              <SideBar />
              <Education />
            </div>
          </Route>
          <Route path="/dashboard">
            <div className="studentAccount">
              <SideBar />
              <Dashboard />
            </div>
          </Route>

          <Route path="/applications">
            <EmployerHeader />
            <Applications />
          </Route>
          <Route path="/employerAccount">
            <EmployerHeader />
            <EmployerAccount />
          </Route>
          <Route path="/employer">
            <EmployerHeader />
            <Employer />
            <Footer />
          </Route>
          <Route path="/lecture">
            <Header />
            <Lecture />
          </Route>
          <Route path="/approve">
            <Header />
            <Approve />
          </Route>
          <Route path="/discussion">
            <Header />
            <Discussion />
          </Route>
          <Route path="/lessons">
            <Header />
            <Lessons />
          </Route>

          <Route path="/training">
            <Header />
            <Training />
            <Footer />
          </Route>
          <Route path="/articles">
            <Header />
            <Articles />
            <Footer />
          </Route>
          <Route path="/jobs">
            <Header />
            <Jobs />
            <Footer />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/">
            <Header />
            <Body />
            <Footer />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
