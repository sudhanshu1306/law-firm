import React, { useState,useEffect } from "react";
import "./JobSection.css";
import MultiSelect from "react-multiple-select-dropdown-lite";
import { useHistory } from "react-router-dom";
import "react-multiple-select-dropdown-lite/dist/index.css";
import QWECard from "./QWECard";
import SearchIcon from "@material-ui/icons/Search";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import axios from "axios";

const api=axios.create({
    withCredentials: true,
    baseURL:process.env.REACT_APP_ROUTE+'/jobs',
    validateStatus: () => true
  });

const useStyles = makeStyles(theme => ({
  root: {
    width: 300 + theme.spacing(3) * 2,
  },
  margin: {
    height: theme.spacing(3),
  },
}));

function JobSection() {

  const [original,getOriginal]=useState([]);
  let [jobs,getJobs]=useState([]);
  const [login,changeLogin]=useState(false);
  const [url,getUrl]=useState("");
  const [search,changeSearch]=useState("");
  const  [jobType,changeJobType]=useState(["Part-time training","Full-time training","Volunteering","Temporary","Degree placement","Paralegal work","Remote"]);
  const [organization,changeOrganization]=useState(["Corporate law firm","Specialist law firm","Small or medium size law firm","Top UK Law firm","Legal advice clinic","Government","Industry / In-house legal department"]);
  const [area,changeArea]=useState(["Business and commercial affairs","Dispute resolution/Civil litigation","Commercial property","Employment law","Probate, wills and trusts","Residential conveyancing","Family law","Personal injury, accident, medical negligence","Pensions/insurance/tax/financial Regulation / compliance / governance","Consumer problems / Consumer Rights","Personal bankruptcy, personal insolvency","Immigration","Welfare benefits and social security rights","Charity","Intellectual property","Procurement/contract law","Public law","Human rights and equality legislation"])
  const [filterArea,changeFilterArea]=useState([]);
  const [filterJob,changeFilterJob]=useState([]);
  const [filterOrg,changeFilterOrg]=useState([]);
  const [value, setvalue] = useState("");
  const [location,changeLocation]=useState("");
  function handleLocation(event){
     changeLocation(event.target.value);
  }
  function handleSearch(event){
    changeSearch(event.target.value);
  }
  function checkExist(arr1,arr2){
    var set=new Set();
    arr1.forEach(arr=>{
      set.add(arr);
    })
    var flag=false;
    arr2.forEach(arr=>{
      if(set.has(arr))
      flag=true;
    })
    return flag;
  }
  function defaultFilter(original1,area,jobType){
    console.log(original1);
    var arr1=[];
    var arr2=[];
    var arr3=[];
    original1.forEach(og=>{
      if(checkExist(jobType,og.jobType)&&checkExist(area,og.area))
      arr1.push(og);
      else if(checkExist(jobType,og.jobType)||checkExist(area,og.area))
      arr2.push(og);
      else
      arr3.push(og);
    });
    // console.log(arr1);
    // console.log(arr2);
    // console.log(arr3);
    getJobs(arr1.concat(arr2,arr3));
    //console.log(arr1.concat(arr2,arr3));
  }
  // const handleOnchange = val => {
  //   setvalue(val);
  // };
  const classes = useStyles();
  const PrettoSlider = withStyles({
    root: {
      color: "#52af77",
      height: 8,
    },
    thumb: {
      height: 24,
      width: 24,
      backgroundColor: "#fff",
      border: "2px solid currentColor",
      marginTop: -8,
      marginLeft: -12,
      "&:focus, &:hover, &$active": {
        boxShadow: "inherit",
      },
    },
    active: {},
    valueLabel: {
      left: "calc(-50% + 4px)",
    },
    track: {
      height: 8,
      borderRadius: 4,
    },
    rail: {
      height: 8,
      borderRadius: 4,
    },
  })(Slider);
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
  const [value1, setvalue1] = useState("");
  // const handleOnchange1 = val => {
  //   setvalue1(val);
  // };

  const options1 = [
    { label: "Part-time training", value: "option_1" },
    { label: "Full-time training", value: "option_2" },
    { label: "Volunteering", value: "option_3" },
    { label: "Temporary", value: "option_4" },
    { label: "Degree placement", value: "option_5" },
    { label: " Paralegal work", value: "option_6" },
    { label: "Remote / online", value: "option_7" },
  ];
  const [value2, setvalue2] = useState("");
  // const handleOnchange2 = val => {
  //   setvalue2(val);
  // };
  const options2 = [
    { label: "Corporate law firm", value: "option_1" },
    { label: "Specialist law firm", value: "option_2" },
    { label: "Small or medium size law firm", value: "option_3" },
    { label: "Top UK Law firm", value: "option_4" },
    { label: "Legal advice clinic", value: "option_5" },
    { label: "Government", value: "option_6" },
    { label: "Industry / In-house legal department", value: "option_7" },
  ];

  let history=useHistory();
  var flag=false;
  function createJob(job){
    return (
      <QWECard
        key={job._id}
        jobTitle={job.title}
        companyName={job.company}
        location={job.venue}
        experience={job.experience}
        experiencePrimary={job.experiencePrimary}
        experienceSecondary={job.experienceSecondary}
        salaries={job.salary}
        jobTags={job.info}
        organizationType={job.employer.organizationType}
        jobType={job.jobType}
        area={job.area}
        url={url+job.employer.profileImage}
        skillsRequired={job.skillsRequired}
        skillsDeveloped={job.skillsDeveloped}
        id={job._id}
      />
    )
  }
  useEffect(()=>{
    var original1=[];
    api.get("/")
  .then((res)=>{
    console.log(res.data);
    console.log(jobs.length);
    if(jobs.length==0)
    getJobs(res.data.jobs);
    getOriginal(res.data.jobs);
    original1=res.data.jobs;
    getUrl(res.data.url);
  }).catch((err)=>{
    console.log(err);
  })
  api.get("../checkLogin")
  .then((res1)=>{
    changeLogin(res1.data.success);
    
  if(res1.data.success){api.post("../viewProfile",{})
  .then(function (res) {
      console.log(res.data);
      if(res.data.success){
          flag=true;
         if(flag){
         if(res.data.user.locationPriority&&res.data.user.areaPriority){
          defaultFilter(original1,res.data.user.areaPriority,res.data.user.locationPriority)
         }
         else if(res.data.user.areaPriority)
         defaultFilter(original1,res.data.user.areaPriority,[]);
         else if(res.data.user.locationPriority)
         defaultFilter(original1,[],res.data.user.locationPriority);
       }
      }
    })
    .catch(function (error) {
  
       console.log(error);
    });}
  }).catch((err)=>{
    console.log(err);
  })
  },[]);

  function handleCheck1(){
    // console.log(filterJob);
    // console.log(filterArea);
    // console.log(filterOrg);
    var arr=[];
    var set1=new Set();
    var set2=new Set();
    var set3=new Set();
    for(var i=0;i<filterJob.length;i++){
        set1.add(filterJob[i]);
    }
    for(var i=0;i<filterOrg.length;i++){
      set2.add(filterOrg[i]);
    }
    for(var i=0;i<filterArea.length;i++){
      set3.add(filterArea[i]);
    }
    original.forEach(og=>{
      if((checkHash(set1,og.jobType)||set1.size==0)&&(set2.has(og.employer.organizationType)||set2.size==0)&&(checkHash(set3,og.area)||set3.size==0)&&((og.venue.indexOf(location)!==-1)||(location=="")))
      arr.push(og);
    });
    getJobs(arr);
    if(set1.size==0&&set2.size==0&&set3.size==0&&location=="")
    getJobs(original)
    if(arr.length==0){
      window.alert("No match");
      window.location.reload();
    }
  }
  function checkHash(set,arr){
    var flag=false;
    arr.forEach(val=>{
      if(set.has(val))
      flag=true;
    })
    //console.log(flag);
    return flag;
  }
  function onSearch(){
    var arr=[];
    original.forEach(og=>{
      if(og.company.toLowerCase().indexOf(search.toLowerCase())!==-1||og.title.toLowerCase().indexOf(search.toLowerCase())!==-1)
      arr.push(og);
    });
    getJobs(arr);
    if(arr.length==0){
      window.alert("No match");
      getJobs(original);
      window.location.reload();
    }
  }
  const handleOnchange= (val) => {
    setvalue(val);
    var x=val;
    var y=[];
    x=x.split(",");
    y=(options.filter(option=> x.indexOf(option.value)!==-1));
    y=y.map((option)=> {return option.label;});
    console.log(y);
    changeFilterArea(y);
  };
  const handleOnchange1 = (val) => {
    setvalue(val);
    var x=val;
    var y=[];
    x=x.split(",");
    y=(options1.filter(option=> x.indexOf(option.value)!==-1));
    y=y.map((option)=> {return option.label;});
    changeFilterJob(y);
  };
  const handleOnchange2 = (val) => {
    setvalue(val);
    var x=val;
    var y=[];
    x=x.split(",");
    y=(options2.filter(option=> x.indexOf(option.value)!==-1));
    y=y.map((option)=> {return option.label;});
    changeFilterOrg(y);
  };
  return (
    <div className="jobSection">
      <div className="searchFilter">
        <h2>Filter your search</h2>
        <hr />

        <div className="searchArea">
          <input type="text" placeholder="search by interest" onChange={handleSearch}/>
          <SearchIcon className="searchIcon" onClick={onSearch} />
        </div>
        <hr className="orSection" />
        <h3>OR</h3>

        <div className="checkItem">
          <input id="handleJob3" type="checkbox" />
          <label className="labels" htmlFor="">
            Show internships as per my preferences
          </label>
        </div>
        <label className="inputLabel">Area of law</label>
        <MultiSelect
          className="multiselectInput"
          placeholder="Eg: Employment law"
          onChange={handleOnchange}
          options={options}
        />
        <label className="inputLabel">Job type</label>
        <MultiSelect
          className="multiselectInput"
          placeholder="Eg: Remote / online"
          onChange={handleOnchange1}
          options={options1}
        />
        <label className="inputLabel">Organization type</label>
        <MultiSelect
          className="multiselectInput"
          placeholder="Eg: Government"
          onChange={handleOnchange2}
          options={options2}
        />

        <label className="inputLabel" for="location">
          Location{" "}
        </label>
        <input
          name="location"
          type="text"
          class="form-control"
          id="duration"
          placeholder="Eg: Manchester"
          onChange={handleLocation}
        />
        <label className="inputLabel" for="duration">
          Duration{" "}
        </label>
        <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={0} />
        <button onClick={handleCheck1}>Find a match</button>
      </div>

      <div className="jobSection-right">
      {jobs.map((job)=> createJob(job))}
      </div>
    </div>
  );
}

export default JobSection;
