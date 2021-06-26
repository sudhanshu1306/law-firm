import React,{useState,useEffect} from "react";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "./Dashboard.css";
import { Link,useHistory } from "react-router-dom";
import axios from "axios";


const api=axios.create({
    withCredentials: true,
    baseURL:process.env.REACT_APP_ROUTE,
    validateStatus: () => true
  });

function Dashboard() {
  const [value, setvalue] = useState("");

  const handleOnchange1 = val => {
    setvalue(val);
    var x=val;
    var y=[];
    x=x.split(",");
    y=(options1.filter(option=> x.indexOf(option.value)!==-1));
    y=y.map((option)=> {return option.label;});
    changePriority ({
      ...priority,locationPriority: y
  });
  };
  const handleOnchange = val => {
    setvalue(val);
    var x=val;
    var y=[];
    x=x.split(",");
    y=(options.filter(option=> x.indexOf(option.value)!==-1));
    y=y.map((option)=> {return option.label;});
    changePriority ({
      ...priority,areaPriority: y
  });
  };
  const options1 = [
    { label: "Part-time training", value: "option_1" },
    { label: "Full-time training", value: "option_2" },
    { label: "Volunteering", value: "option_3" },
    { label: "Temporary", value: "option_4" },
    { label: "Degree placement", value: "option_5" },
    { label: "Paralegal work", value: "option_6" },
    { label: "Remote / online", value: "option_7" },
  ];

  const options = [
    { label: "Business and commercial affairs", value: "option_1" },
    { label: "Dispute resolution / Civil litigation", value: "option_2" },
    { label: "Commercial property", value: "option_3" },
    { label: "Employment law", value: "option_4" },
    { label: "Probate, wills and trusts", value: "option_5" },
    { label: "Residential conveyancing", value: "option_6" },
    { label: "Criminal Law", value: "option_7" },
    { label: "Family Law", value: "option_8" },
    { label: "Personal injury / Accident / Medical negligence", value: "option_9" },
    { label: "Pensions / Insurance / Tax / financial ", value: "option_10" },
    { label: "Regulation / Compliance / Governance", value: "option_11" },
    { label: "Consumer Rights", value: "option_12" },
    { label: "Immigration", value: "option_13" },
    { label: "Welfare benefits and social security rights", value: "option_14" },
    { label: "Intellectual property", value: "option_15" },
    { label: "Public law ", value: "option_16" },
    { label: "Human rights and equality legislation", value: "option_17" },
    { label: "International Law", value: "option_18" },
    { label: "Environmental Law", value: "option_19" },
    { label: "Charity Law", value: "option_20" },
  ];
  const [user,changeUser]=useState({});
  const [type,changeType]=useState(["Admin","Employer","Student","Tutor"]);
   const [url,changeUrl]=useState("");
   const [priority,changePriority]=useState({});
   const [defaultPriority,changeDefaultPriority]=useState([]);
   const [defaultArea,changeDefaultArea]=useState([]);
   function handlePriority(event){
     changePriority({
       ...priority,[event.target.name]:event.target.value
     });
   }
   

   let history=useHistory();
   var flag=false;
   
async function submitReference(event){
  event.preventDefault();
  let myForm=document.getElementById('myForm');
      var formData=new FormData(myForm);
  const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };
await api.post("/addReference",formData,config)
.then(function (res) {
    console.log(res.data);
    if(res.data.success){
        flag=true;
       if(flag){
        window.alert("Successfully added a reference");
        window.location.reload();

     }
    }
    
    else{
      window.alert("Success false");
    }
  })
  .catch(function (error) {

     window.alert(error.message);

  });

}
  async function submitPriority(event){
    event.preventDefault();
    console.log(priority)
    await api.post("/addPriority",priority)
    .then(function (res) {
        console.log(res.data);
        if(res.data.success){
            flag=true;
           if(flag){
            window.alert("Successfully updated priority");
            window.location.reload();
           }
        }
        else{
          window.alert("please fill all the fields");
        }
      })
      .catch(function (error) {
  
         window.alert("No fields can be empty");
  
      });
  } 
   useEffect(async()=>{await api.post("/viewProfile",{})
   .then(function (res) {
       console.log(res.data);
       if(res.data.success){
           flag=true;
          if(flag){
          changeUser(res.data.user);
          if(res.data.user.areaPriority){
            options.forEach(option=>{
              if(res.data.user.areaPriority.indexOf(option.label)!==-1)
              changeDefaultArea(prev=> [...prev,option]);
            })
           
          }
          if(res.data.user.locationPriority){
            options1.forEach(option=>{
              if(res.data.user.locationPriority.indexOf(option.label)!==-1)
              changeDefaultPriority(prev=> [...prev,option]);
            })
          }
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
    <div className="dashboard">
      <div className="dashboardHeader">
        <Link className="link6" to="/">
          <h1 className="link5">QWE</h1>
        </Link>
      </div>
      <div className="dashboardMiddle">
        <div className="numberCount">
          <h1>{user.jobs?user.jobs.length:"0"}</h1>
          <p>Jobs Applied</p>
        </div>
        <div className="numberCount color2">
          <h1>{user.courses?user.courses.length:"0"}</h1>
          <p>Courses </p>
        </div>
        <div className="numberCount color3">
          <h1>{user.articles?user.articles.length:"0"}</h1>
          <p>Articles</p>
        </div>
      </div>
      <div className="dashboardBottom">
      <p>Interested areas : {user.areaPriority?(user.areaPriority.length!=0? user.areaPriority.toString(): "N/A") :"N/A"} </p>
      <p>Job types : {user.locationPriority?(user.locationPriority.length!=0? user.locationPriority.toString(): "N/A") :"N/A"} </p>
        {/* <div className="addskill">
          <p>Total year of experience</p>
          <input className="expyr" type="text" placeholder="year of experience" />
        </div> */}

        <div className="addskill">
          <p>Choose your priorities:</p>
          <MultiSelect onChange={handleOnchange1} options={options1} defaultValue={defaultPriority} />
        </div>
        <div className="addskill">
          <p>Select the areas of law you want to explore:</p>
          <MultiSelect onChange={handleOnchange} options={options} defaultValue={defaultArea}/>
        </div>
        <button className="tableButton" onClick={submitPriority}>Save</button>
        
      </div>
      <div className="reference">
        <h3>Reference section</h3>
        <div className="experienceSheet">
          <p className="sheetTitle">Specialization Name</p>
          <div className="sheetDetails">
            <p>University/Employer name</p>
            <p>Topic Name</p>
            <p>Duration</p>
          </div>
          <div className="sheetDescp">
            <h4>Reference</h4>
            <img
              src="https://www.smartsheet.com/sites/default/files/IC-Employee-Referral-Form-Template.png"
              alt=""
            />
          </div>
        </div>
        <div className="referenceForm">
        <form className="formModal" id="myForm">
          <label for="university"> Add University/Employer </label>
          <input
            name="name"
            type="text"
            class="form-control"
            id="experience"
            placeholder="university/Employer name"
          />
          <label for="specialization"> Add Specialization </label>
          <input
            name="specialization"
            type="text"
            class="form-control"
            id="specialization"
            placeholder="Specialization name"
          />
          <label for="reference"> Add Reference </label>
          <input
            name="reference"
            type="file"
            class="form-control"
            id="reference"
            placeholder="Reference name"
          />
          <label for="duration"> Add Duration </label>
          <input
            name="duration"
            type="text"
            class="form-control"
            id="duration"
            placeholder="Duration"
          />
          <button onClick={submitReference}>Add Referal</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
