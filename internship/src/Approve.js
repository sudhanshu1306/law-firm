import React,{useState,useEffect} from "react";
import "./Approve.css";
import JobApproveCard from "./JobApproveCard";
import CourseApproveCard from "./CourseApproveCard";
import ArticleApproveCard from "./ArticleApproveCard";
import axios from "axios";


const api=axios.create({
    withCredentials: true,
    baseURL:process.env.REACT_APP_ROUTE,
    validateStatus: () => true
  });

function Approve() {
  const [jobs,changeJobs]=useState([]);
  const [articles,changeArticles]=useState([]);
   const [videos,changeVideos]=useState([]);
  var vd=[];
  const [url,changeUrl]=useState();
  useEffect(()=>{api.get("/adminJobs")
  .then((res)=>{
    console.log(res.data);
    changeJobs(res.data.jobs);
  }).catch((err)=>{
    console.log(err);
  })
  api.get("/adminArticles")
  .then((res)=>{
    console.log(res.data);
    changeArticles(res.data.articles);
  }).catch((err)=>{
    console.log(err);
  })
  api.get("/adminVideos")
  .then((res)=>{
    console.log(res.data);
    var vd=res.data.videos

    vd.map(v=>{
      console.log(videos)
      changeVideos((prev)=>[
        ...prev,{id:v._id,image:v.lesson.course.image,company:v.lesson.course.author.profileImage,title:v.title,description:v.content,employer:v.lesson.course.author.name}
      ])
    })
     // changeVideos(res.data.videos);
    changeUrl(res.data.url);
  }).catch((err)=>{
    console.log(err);
  })},[]);
function mapJob(job){
  return (
    <JobApproveCard
      key={job._id}
      title={job.title}
      companyname={job.company}
      years={job.experience}
      venue={job.venue}
      salary={job.salary}
      id={job._id}
    />
  )
}
function mapArticle(article){
  return(
    <ArticleApproveCard
    key={article._id}
    topicName={article.title}
    author={article.author.name}
    content={article.content}
    likes={article.likes.length}
    id={article._id}
    />
  )
}
function mapVideo(video){
  return(
    <CourseApproveCard
      key={video._id}
      image={url+video.image}
      company={url+video.company}
      title={video.title}
      description={video.description}
      employer={video.employer}
      number="0"
      button2="Decline"
      button="Approve"
      id={video._id}
    />
  )
}


  return (
    <div className="approve">
      <h3>Approve Courses & articles</h3>
      <hr />
      <p>Courses to Approve</p>
      <div className="corsesRegistered">
        {videos.map(video=>mapVideo(video))}
      </div>
      <p>Jobs to Approve</p>
      <div className="jobsRegistered">
        {jobs.map(job=> mapJob(job))}
      </div>
      <p>Aticles to approve</p>
      <div className="articlesWritten">
        {articles.map(article=> mapArticle(article))}
      </div>
    </div>
  );
}

export default Approve;
