import React,{useState,useEffect} from "react";
import "./Jobs.css";
import { useHistory } from "react-router-dom";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import SearchIcon from "@material-ui/icons/Search";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import EmployeeJobCard from "./EmployeeJobCard";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import axios from "axios";
import e from "cors";


const api=axios.create({
    withCredentials: true,
    baseURL:process.env.REACT_APP_ROUTE+'/jobs',
    validateStatus: () => true
  });

function Jobs() {
  const [expanded, setExpanded] = React.useState(false);
  const [original,getOriginal]=useState([]);
  let [jobs,getJobs]=useState([]);
  const [login,changeLogin]=useState(false);
  const [searchobj,changeSearch]=useState({});
  const  [jobType,changeJobType]=useState(["Part-time training","Full-time training","Volunteering","Temporary","Degree placement","Paralegal work","Remote"]);
  const [organization,changeOrganization]=useState(["Corporate law firm","Specialist law firm","Small or medium size law firm","Top UK Law firm","Legal advice clinic","Government","Industry / In-house legal department"]);
  const [area,changeArea]=useState(["Business and commercial affairs","Dispute resolution/Civil litigation","Commercial property","Employment law","Probate, wills and trusts","Residential conveyancing","Family law","Personal injury, accident, medical negligence","Pensions/insurance/tax/financial Regulation / compliance / governance","Consumer problems / Consumer Rights","Personal bankruptcy, personal insolvency","Immigration","Welfare benefits and social security rights","Charity","Intellectual property","Procurement/contract law","Public law","Human rights and equality legislation"])
  
  function handleSearch (event) {
    changeSearch({
        ...searchobj,[event.target.name]: event.target.value
    });
  }

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  let history=useHistory();
var flag=false;
function createJob(job){
  return (
    <EmployeeJobCard
      key={job._id}
      jobTitle={job.title}
      companyName={job.company}
      location={job.venue}
      experience={job.experience}
      salaries={job.salary}
      jobTags={job.info}
      jobType={job.jobType}
      area={job.area}
      id={job._id}
    />
  )
}
useEffect(()=>{api.get("/")
.then((res)=>{
  //console.log(res.data);
  getJobs(res.data.jobs);
  getOriginal(res.data.jobs);
}).catch((err)=>{
  console.log(err);
})
api.get("../checkLogin")
.then((res)=>{
  changeLogin(res.data.success);
}).catch((err)=>{
  console.log(err);
})
},[]);
function getMatch(){
var arr=[];
jobs=original
if(searchobj.skill&& searchobj.skill!==""){
  arr=jobs.filter(job=> (job.company.toLowerCase().indexOf(searchobj.skill.toLowerCase())!==-1||job.title.toLowerCase().indexOf(searchobj.skill.toLowerCase())!==-1))
}
else{
  arr=original;
}
if(searchobj.location&& searchobj.location!==""){
  arr=arr.filter(job=> (job.venue.toLowerCase().indexOf(searchobj.location.toLowerCase())!==-1))
}
if(searchobj.experience &&searchobj.experience!==""){
  arr=arr.filter(job=> ((parseInt(job.experience.substring(0,job.experience.indexOf('-')))<=parseInt(searchobj.experience.substring(0,searchobj.experience.indexOf('-'))))&&(parseInt(job.experience.substring(job.experience.indexOf('-')+1))<=parseInt(searchobj.experience.substring(searchobj.experience.indexOf('-')+1)))))
}
  getJobs(arr)
  changeSearch({});
  document.getElementById("skill").value="";
  document.getElementById("location").value="";
  document.getElementById("experience").value="";
  if(arr.length==0){
  window.alert("No match found")
  getJobs(original);
}
}
function handleCheck1(event){
  if(event.target.value=="on")
  event.target.value="checked";
  else
  event.target.value="on";
  var arr=[];
  var set1=new Set();
  var set2=new Set();
  var set3=new Set();
  for(var i=0;i<jobType.length;i++){
    if(document.getElementById("handleJob"+i).value=="checked")
    {
      set1.add(jobType[i]);
    }
    else if(set1.has(jobType[i]))
    set1.delete(jobType[i]);
  }
  for(var i=0;i<organization.length;i++){
    if(document.getElementById("handleOrganization"+i).value=="checked")
    {
      set2.add(organization[i]);
    }
    else if(set2.has(organization[i]))
    set2.delete(organization[i]);
  }
  for(var i=0;i<area.length;i++){
    if(document.getElementById("handleArea"+i).value=="checked")
    {
      set3.add(area[i]);
    }
    else if(set3.has(area[i]))
    set3.delete(area[i]);
  }
  original.forEach(og=>{
    if((set1.has(og.jobType)||set1.size==0)&&(set2.has(og.employer.organizationType)||set2.size==0)&&(set3.has(og.area)||set3.size==0))
    arr.push(og);
  });
  getJobs(arr);
  if(set1.size==0&&set2.size==0&&set3.size==0)
  getJobs(original)
  if(arr.length==0){
    window.alert("No match");
    window.location.reload();
  }
}
  return (
    <div className="jobs">
      <div className="jobsHeader">
        <div className="jobsHeader-Search">
          <div className="search1">
            <SearchIcon className="jobIcon" />
            <input type="text" id="skill" name="skill" onChange={handleSearch} placeholder="search your interest" />
          </div>
          <div className="locations">
            <MyLocationIcon className="jobIcon" /> <input type="text" id="location" name="location" onChange={handleSearch} placeholder=" Location" />
          </div>
          <div className="experiences">
            <CalendarTodayIcon className="jobIcon" /> <input type="text" id="experience" name="experience" onChange={handleSearch}  placeholder="Experience" />
          </div>

          <button onClick={getMatch}>Find a match</button>
        </div>
      </div>

      <div className="jobSection">
        <div className="jobSection-left">
          <h3>Filter your search</h3>

          <Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography>Job Types</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className="checkBox">
                <div className="checkItems">
                  <input id="handleJob0" onClick={handleCheck1} type="checkbox" />
                  <label className="labels" htmlFor="">
                    Part-time training
                  </label>
                </div>
                <div className="checkItems">
                  <input id="handleJob1" onClick={handleCheck1} type="checkbox" />
                  <label className="labels" htmlFor="">
                    Full-time training
                  </label>
                </div>
                <div className="checkItems">
                  <input id="handleJob2" onClick={handleCheck1} type="checkbox" />
                  <label className="labels" htmlFor="">
                    Volunteering
                  </label>
                </div>
                <div className="checkItems">
                  <input id="handleJob3" onClick={handleCheck1} type="checkbox" />
                  <label className="labels" htmlFor="">
                    Temporary
                  </label>
                </div>
                <div className="checkItems">
                  <input  id="handleJob4" onClick={handleCheck1} type="checkbox" />
                  <label className="labels" htmlFor="">
                    Degree placement
                  </label>
                </div>
                <div className="checkItems">
                  <input id="handleJob5" onClick={handleCheck1} type="checkbox" />
                  <label className="labels" htmlFor="">
                    Paralegal work
                  </label>
                </div>
                <div className="checkItems">
                  <input id="handleJob6" onClick={handleCheck1} type="checkbox" />
                  <label className="labels" htmlFor="">
                    Remote / online
                  </label>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === "panel2"} onChange={handleChange("panel2")}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <Typography>Organization type</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className="checkBox">
                <div className="checkItems">
                  <input id="handleOrganization0" onClick={handleCheck1} type="checkbox" />
                  <label className="labels" htmlFor="">
                    Corporate law firm
                  </label>
                </div>
                <div className="checkItems">
                  <input id="handleOrganization1" onClick={handleCheck1} type="checkbox" />
                  <label className="labels" htmlFor="">
                    Specialist law firm
                  </label>
                </div>
                <div className="checkItems">
                  <input id="handleOrganization2" onClick={handleCheck1} type="checkbox" />
                  <label className="labels" htmlFor="">
                    Small or medium size law firm
                  </label>
                </div>
                <div className="checkItems">
                  <input id="handleOrganization3" onClick={handleCheck1} type="checkbox" />
                  <label className="labels" htmlFor="">
                    Top UK Law firm
                  </label>
                </div>
                <div className="checkItems">
                  <input id="handleOrganization4" onClick={handleCheck1} type="checkbox" />
                  <label className="labels" htmlFor="">
                    Legal advice clinic
                  </label>
                </div>
                <div className="checkItems">
                  <input id="handleOrganization5" onClick={handleCheck1} type="checkbox" />
                  <label className="labels" htmlFor="">
                    Government
                  </label>
                </div>
                <div className="checkItems">
                  <input id="handleOrganization6" onClick={handleCheck1} type="checkbox" />
                  <label className="labels" htmlFor="">
                    Industry / In-house legal department
                  </label>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === "panel4"} onChange={handleChange("panel4")}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel4bh-content"
              id="panel4bh-header"
            >
              <Typography>Areas of law</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className="checkBox">
                <div className="checkItems">
                  <input id="handleArea0" onClick={handleCheck1} type="checkbox" />
                  <label className="labels" htmlFor="">
                    Business and commercial affairs
                  </label>
                </div>
                <div className="checkItems">
                  <input id="handleArea1" onClick={handleCheck1} type="checkbox" />
                  <label className="labels" htmlFor="">
                    Dispute resolution/Civil litigation
                  </label>
                </div>
                <div className="checkItems">
                  <input id="handleArea2" onClick={handleCheck1} type="checkbox" />
                  <label className="labels" htmlFor="">
                    Commercial property
                  </label>
                </div>
                <div className="checkItems">
                  <input id="handleArea3" onClick={handleCheck1} type="checkbox" />
                  <label className="labels" htmlFor="">
                    Employment law
                  </label>
                </div>
                <div className="checkItems">
                  <input id="handleArea4" onClick={handleCheck1} type="checkbox" />
                  <label className="labels" htmlFor="">
                    Probate, wills and trusts
                  </label>
                </div>
                <div className="checkItems">
                  <input id="handleArea5" onClick={handleCheck1} type="checkbox" />
                  <label className="labels" htmlFor="">
                    Residential conveyancing
                  </label>
                </div>
                <div className="checkItems">
                  <input id="handleArea6" onClick={handleCheck1} type="checkbox" />
                  <label className="labels" htmlFor="">
                    Family law
                  </label>
                </div>
                <div className="checkItems">
                  <input id="handleArea7" onClick={handleCheck1} type="checkbox" />
                  <label className="labels" htmlFor="">
                    Personal injury, accident, medical negligence
                  </label>
                </div>
                <div className="checkItems">
                  <input id="handleArea8" onClick={handleCheck1} type="checkbox" />
                  <label className="labels" htmlFor="">
                    Pensions/insurance/tax/financial Regulation / compliance / governance
                  </label>
                </div>
                <div className="checkItems">
                  <input id="handleArea9" onClick={handleCheck1} type="checkbox" />
                  <label className="labels" htmlFor="">
                    Consumer problems / Consumer Rights
                  </label>
                </div>
                <div className="checkItems">
                  <input id="handleArea10" onClick={handleCheck1} type="checkbox" />
                  <label className="labels" htmlFor="">
                    Personal bankruptcy, personal insolvency
                  </label>
                </div>
                <div className="checkItems">
                  <input id="handleArea11" onClick={handleCheck1} type="checkbox" />
                  <label className="labels" htmlFor="">
                    Immigration
                  </label>
                </div>
                <div className="checkItems">
                  <input id="handleArea12" onClick={handleCheck1} type="checkbox" />
                  <label className="labels" htmlFor="">
                    Welfare benefits and social security rights
                  </label>
                </div>
                <div className="checkItems">
                  <input id="handleArea13" onClick={handleCheck1} type="checkbox" />
                  <label className="labels" htmlFor="">
                    Charity
                  </label>
                </div>
                <div className="checkItems">
                  <input id="handleArea14" onClick={handleCheck1} type="checkbox" />
                  <label className="labels" htmlFor="">
                    Intellectual property
                  </label>
                </div>
                <div className="checkItems">
                  <input id="handleArea15" onClick={handleCheck1} type="checkbox" />
                  <label className="labels" htmlFor="">
                    Procurement/contract law
                  </label>
                </div>
                <div className="checkItems">
                  <input id="handleArea16" onClick={handleCheck1} type="checkbox" />
                  <label className="labels" htmlFor="">
                    Public law
                  </label>
                </div>
                <div className="checkItems">
                  <input id="handleArea17" onClick={handleCheck1} type="checkbox" />
                  <label className="labels" htmlFor="">
                    Human rights and equality legislation
                  </label>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
        <div className="jobSection-right">
          <div className="jobsCard">
            {/*<EmployeeJobCard
              jobTitle="Work from home Customer service representative and Call center jobs"
              companyName="PERFECT SOLUTIONS"
              location="Ahmedabad"
              experience="0-5"
              salaries="5,50,000-6,50,000"
              jobTags="Data Entry Operator and Typist, Part time, Work from Home, Online Jobs, Freelance jobs,
            Back Office jobs, Computer Operator, Fresher Jobs"
            />
            <EmployeeJobCard
              jobTitle="Hiring for the Secretary /Personal Assistant /Executive Assistant whatsapp resume & photo"
              companyName="Company Name Confidential"
              location=" Bengaluru "
              experience=" 5-12"
              salaries="2,60,000-4,50,000"
              jobTags="Job Position – Executive Assistant (Managing Director) Job Location – Bangalore Job Experience – 10 to 15 years Qualifications - Graduation Language known – Hindi, English Job Roles & responsibilities"
            />
            <EmployeeJobCard
              jobTitle="Work from home Customer service representative and Call center jobs"
              companyName="PERFECT SOLUTIONS"
              location="Ahmedabad"
              experience="0-5"
              salaries="5,50,000-6,50,000"
              jobTags="Data Entry Operator and Typist, Part time, Work from Home, Online Jobs, Freelance jobs,
            Back Office jobs, Computer Operator, Fresher Jobs"
            />*/}
            {jobs.map((job)=> createJob(job))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Jobs;
