import React,{useState,useEffect} from "react";
import CardInAccnt from "./CardInAccnt";
import "./MyArticles.css";
import { Link,useHistory } from "react-router-dom";
import axios from "axios";


const api=axios.create({
    withCredentials: true,
    baseURL:process.env.REACT_APP_ROUTE
  });

function MyArticles() {
  const [user,changeUser]=useState({});
  const [type,changeType]=useState(["Admin","Employer","Student","Tutor"]);
   const [url,changeUrl]=useState("");
   function createArticle(article){
    return (
      <CardInAccnt
       key={article._id}
       title={article.title}
       id={article._id}
      />
    )
  }
  let history=useHistory();
  var flag=false;

  useEffect(async()=>{await api.post("/viewProfile",{})
  .then(function (res) {
      console.log(res.data);
      if(res.data.success){
          flag=true;
         if(flag){
         changeUser(res.data.user);
         changeUrl(res.data.url);
       }
         else{
          window.alert("Please login");
         history.push('/login');}
      }
    })
    .catch(function (error) {

       window.alert("Please login");
       history.push('/login');

    });


  },[]);
  return (
    <div className="myArticles">
      <div className="educationHeader">
        <Link className="link6" to="/">
          <h1 className="link5">QWE</h1>
        </Link>
      </div>
      <h1>Articles</h1>
      <div className="registeredCourses">
      {user.articles&& user.articles.map(article=> createArticle(article))}
         
      </div>
    </div>
  );
}

export default MyArticles;
