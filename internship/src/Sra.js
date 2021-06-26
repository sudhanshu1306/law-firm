import React,{useState,useEffect} from "react";
import "./Sra.css";
import { Link,useHistory } from "react-router-dom";
import axios from "axios";


const api=axios.create({
    withCredentials: true,
    baseURL:process.env.REACT_APP_ROUTE,
    validateStatus: () => true
  });

function Sra() {
  const [sra,changeSra]=useState({});
  function handleSra(event){
    changeSra({
      ...sra,[event.target.name]:event.target.value
    });
  }
  async function submitSra(event){
    event.preventDefault();
    console.log(sra)
    await api.post("/editSra",sra)
    .then(function (res) {
        console.log(res.data);
        if(res.data.success){
            flag=true;
           if(flag){
            window.alert("Successfully updated ");
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
  var flag=false;
  var history=useHistory();
  useEffect(async()=>{await api.post("/viewProfile",{})
   .then(function (res) {
       console.log(res.data);
       if(res.data.success){
           flag=true;
          if(flag){
          res.data.user.sra&&changeSra(res.data.user.sra)
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
    <div className="sra">
      <div className="dashboardHeader">
        <Link className="link6" to="/">
          <h1 className="link5">QWE</h1>
        </Link>
      </div>
      
      <h3>Section 1 - Placement details </h3>

      <div className="table">
        <table>
          <tr>
            <th> </th>
            <th>Placement 1</th>
            <th>Placement 2</th>
            <th>Placement 3</th>
            <th>Placement 4</th>
          </tr>
          <tr>
            <td className="ques">A1. Organisation</td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queF1"
                onChange={handleSra}
                defaultValue={sra?sra.queF1:""}
                id="ans5"
                cols="30"
                rows="2"
              />
            </td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queF2"
                onChange={handleSra}
                defaultValue={sra?sra.queF2:""}
                id="ans5"
                cols="30"
                rows="2"
              />
            </td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queF3"
                onChange={handleSra}
                defaultValue={sra?sra.queF3:""}
                id="ans5"
                cols="30"
                rows="2"
              />
            </td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queF4"
                onChange={handleSra}
                defaultValue={sra?sra.queF4:""}
                id="ans5"
                cols="30"
                rows="2"
              />
            </td>
          </tr>
          <tr>
            <td className="ques">A2. Start date</td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queG1"
                onChange={handleSra}
                defaultValue={sra?sra.queG1:""}
                id="ans5"
                cols="30"
                rows="1"
              />
            </td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queG2"
                onChange={handleSra}
                defaultValue={sra?sra.queG2:""}
                id="ans5"
                cols="30"
                rows="1"
              />
            </td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queG3"
                onChange={handleSra}
                defaultValue={sra?sra.queG3:""}
                id="ans5"
                cols="30"
                rows="1"
              />
            </td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queG4"
                onChange={handleSra}
                defaultValue={sra?sra.queG4:""}
                id="ans5"
                cols="30"
                rows="1"
              />
            </td>
          </tr>
          <tr>
            <td className="ques">A3. End date</td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queH1"
                onChange={handleSra}
                defaultValue={sra?sra.queH1:""}
                id="ans5"
                cols="30"
                rows="1"
              />
            </td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queH2"
                onChange={handleSra}
                defaultValue={sra?sra.queH2:""}
                id="ans5"
                cols="30"
                rows="1"
              />
            </td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queH3"
                onChange={handleSra}
                defaultValue={sra?sra.queH3:""}
                id="ans5"
                cols="30"
                rows="1"
              />
            </td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queH4"
                onChange={handleSra}
                defaultValue={sra?sra.queH4:""}
                id="ans5"
                cols="30"
                rows="1"
              />
            </td>
          </tr>
          <tr>
            <td className="ques">
              A4. How much of this time counts towards overall QWE requirement
            </td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queI1"
                onChange={handleSra}
                defaultValue={sra?sra.queI1:""}
                id="ans5"
                cols="30"
                rows="1"
              />
            </td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queI2"
                onChange={handleSra}
                defaultValue={sra?sra.queI2:""}
                id="ans5"
                cols="30"
                rows="1"
              />
            </td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queI3"
                onChange={handleSra}
                defaultValue={sra?sra.queI3:""}
                id="ans5"
                cols="30"
                rows="1"
              />
            </td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queI4"
                onChange={handleSra}
                defaultValue={sra?sra.queI4:""}
                id="ans5"
                cols="30"
                rows="1"
              />
            </td>
          </tr>
          <tr>
            <td className="ques">A5. Name of individual confirming QWE</td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queJ1"
                onChange={handleSra}
                defaultValue={sra?sra.queJ1:""}
                id="ans5"
                cols="30"
                rows="2"
              />
            </td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queJ2"
                onChange={handleSra}
                defaultValue={sra?sra.queJ2:""}
                id="ans5"
                cols="30"
                rows="2"
              />
            </td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queJ3"
                onChange={handleSra}
                defaultValue={sra?sra.queJ3:""}
                id="ans5"
                cols="30"
                rows="2"
              />
            </td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queJ4"
                onChange={handleSra}
                defaultValue={sra?sra.queJ4:""}
                id="ans5"
                cols="30"
                rows="2"
              />
            </td>
          </tr>
          <tr>
            <td className="ques">A6.Position</td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queK1"
                onChange={handleSra}
                defaultValue={sra?sra.queK1:""}
                id="ans5"
                cols="30"
                rows="2"
              />
            </td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queK2"
                onChange={handleSra}
                defaultValue={sra?sra.queK2:""}
                id="ans5"
                cols="30"
                rows="2"
              />
            </td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queK3"
                onChange={handleSra}
                defaultValue={sra?sra.queK3:""}
                id="ans5"
                cols="30"
                rows="2"
              />
            </td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queK4"
                onChange={handleSra}
                defaultValue={sra?sra.queK4:""}
                id="ans5"
                cols="30"
                rows="2"
              />
            </td>
          </tr>
          <tr>
            <td className="ques">A7. SRA number </td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queL1"
                onChange={handleSra}
                defaultValue={sra?sra.queL1:""}
                id="ans5"
                cols="30"
                rows="2"
              />
            </td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queL2"
                onChange={handleSra}
                defaultValue={sra?sra.queL2:""}
                id="ans5"
                cols="30"
                rows="2"
              />
            </td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queL3"
                onChange={handleSra}
                defaultValue={sra?sra.queL3:""}
                id="ans5"
                cols="30"
                rows="2"
              />
            </td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queL4"
                onChange={handleSra}
                defaultValue={sra?sra.queL4:""}
                id="ans5"
                cols="30"
                rows="2"
              />
            </td>
          </tr>
        </table>
      </div>
      <div className="tableGroup">
        <button className="tableButton" onClick={submitSra}>Save Changes</button>
      </div>
      <h3>Section 2- Qualifying work experience </h3>
      <p>Think about your work experience and consider:</p>
      <ul>
        <li> the competences you have been exposed to</li>
        <li> how you can evidence this</li>
        <li> what you learnt </li>
        <li>
          {" "}
          whether you think you need any more experience in each competence to help you prepare for
          the SQEassessments.
        </li>
      </ul>
      <p>
        Remember, you do not need to develop all of the competences below for your QWE to confirmed.
      </p>
      <h4>Ethics, professional and judgement</h4>
       <div className="table">
          <table>
            <tr>
              <th>Competence</th>
              <th>Have I had experience? What was it/what did I do?</th>
              <th>How can I evidence my experience?</th>
              <th>What did I learn?</th>
              <th>Do I need more experience?</th>
            </tr>
            <tr>
              <td className="ques">
                A1. Act honestly and with integrity, in accordance with legal and regulatory
                requirements and the SRA Standards and Regulations
              </td>
              <td>
                <textarea
                  placeholder="type your answer here"
                  className="textareas"
                  name="queA1"
                  onChange={handleSra}
                  id="ans5"
                  cols="30"
                  rows="5"
                  defaultValue={sra?sra.queA1:""}
                />
              </td>
              <td>
                <textarea
                  placeholder="type your answer here"
                  className="textareas"
                  name="queA2"
                  onChange={handleSra}
                  id="ans5"
                  cols="30"
                  rows="5"
                  defaultValue={sra?sra.queA2:""}
                />
              </td>
              <td>
                <textarea
                  placeholder="type your answer here"
                  className="textareas"
                  name="queA3"
                  onChange={handleSra}
                  id="ans5"
                  cols="30"
                  rows="5"
                  defaultValue={sra?sra.queA3:""}
                />
              </td>
              <td>
                <textarea
                  placeholder="type your answer here"
                  className="textareas"
                  name="queA4"
                  onChange={handleSra}
                  id="ans5"
                  cols="30"
                  rows="5"
                  defaultValue={sra?sra.queA4:""}
                />
              </td>
            </tr>
            <tr>
              <td className="ques">
                A2. Maintain the level of competence and legal knowledge needed to practise
                effectively, taking into account changes in their role and/or practice context and
                developments in the law
              </td>
              <td>
                <textarea
                  placeholder="type your answer here"
                  className="textareas"
                  name="queB1"
                  onChange={handleSra}
                  id="ans5"
                  cols="30"
                  rows="5"
                  defaultValue={sra?sra.queB1:""}
                />
              </td>
              <td>
                <textarea
                  placeholder="type your answer here"
                  className="textareas"
                  name="queB2"
                  onChange={handleSra}
                  id="ans5"
                  cols="30"
                  rows="5"
                  defaultValue={sra?sra.queB2:""}
                />
              </td>
              <td>
                <textarea
                  placeholder="type your answer here"
                  className="textareas"
                  name="queB3"
                  onChange={handleSra}
                  id="ans5"
                  cols="30"
                  rows="5"
                  defaultValue={sra?sra.queB3:""}
                />
              </td>
              <td>
                <textarea
                  placeholder="type your answer here"
                  className="textareas"
                  name="queB4"
                  onChange={handleSra}
                  id="ans5"
                  cols="30"
                  rows="5"
                  defaultValue={sra?sra.queB4:""}
                />
              </td>
            </tr>
            <tr>
              <td className="ques">
                A3. Work within the limits of their competence and the supervision which they need
              </td>
              <td>
                <textarea
                  placeholder="type your answer here"
                  className="textareas"
                  name="queC1"
                  onChange={handleSra}
                  id="ans5"
                  cols="30"
                  rows="5"
                  defaultValue={sra?sra.queC1:""}
                />
              </td>
              <td>
                <textarea
                  placeholder="type your answer here"
                  className="textareas"
                  name="queC2"
                  onChange={handleSra}
                  id="ans5"
                  cols="30"
                  rows="5"
                  defaultValue={sra?sra.queC2:""}
                />
              </td>
              <td>
                <textarea
                  placeholder="type your answer here"
                  className="textareas"
                  name="queC3"
                  onChange={handleSra}
                  id="ans5"
                  cols="30"
                  rows="5"
                  defaultValue={sra?sra.queC3:""}
                />
              </td>
              <td>
                <textarea
                  placeholder="type your answer here"
                  className="textareas"
                  name="queC4"
                  onChange={handleSra}
                  id="ans5"
                  cols="30"
                  rows="5"
                  defaultValue={sra?sra.queC4:""}
                />
              </td>
            </tr>
            <tr>
              <td className="ques">
                A4. Draw on a sufficient detailed knowledge and understanding of their field(s) of
                work and role in order to practise effectively
              </td>
              <td>
                <textarea
                  placeholder="type your answer here"
                  className="textareas"
                  name="queD1"
                  onChange={handleSra}
                  id="ans5"
                  cols="30"
                  rows="5"
                  defaultValue={sra?sra.queD1:""}
                />
              </td>
              <td>
                <textarea
                  placeholder="type your answer here"
                  className="textareas"
                  name="queD2"
                  onChange={handleSra}
                  id="ans5"
                  cols="30"
                  rows="5"
                  defaultValue={sra?sra.queD2:""}
                />
              </td>
              <td>
                <textarea
                  placeholder="type your answer here"
                  className="textareas"
                  name="queD3"
                  onChange={handleSra}
                  id="ans5"
                  cols="30"
                  rows="5"
                  defaultValue={sra?sra.queD3:""}
                />
              </td>
              <td>
                <textarea
                  placeholder="type your answer here"
                  className="textareas"
                  name="queD4"
                  onChange={handleSra}
                  defaultValue={sra?sra.queD4:""}
                  id="ans5"
                  cols="30"
                  rows="5"
                  
                />
              </td>
            </tr>
            <tr>
              <td className="ques">
                A5. Apply understanding, critical thinking and analysis to solve problems
              </td>
              <td>
                <textarea
                  placeholder="type your answer here"
                  className="textareas"
                  name="queE1"
                  onChange={handleSra}
                  id="ans5"
                  cols="30"
                  rows="5"
                  defaultValue={sra?sra.queE1:""}
                />
              </td>
              <td>
                <textarea
                  placeholder="type your answer here"
                  className="textareas"
                  name="queE2"
                  onChange={handleSra}
                  id="ans5"
                  cols="30"
                  rows="5"
                  defaultValue={sra?sra.queE2:""}
                />
              </td>
              <td>
                <textarea
                  placeholder="type your answer here"
                  className="textareas"
                  name="queE3"
                  onChange={handleSra}
                  id="ans5"
                  cols="30"
                  rows="5"
                  defaultValue={sra?sra.queE3:""}
                />
              </td>
              <td>
                <textarea
                  placeholder="type your answer here"
                  className="textareas"
                  name="queE4"
                  onChange={handleSra}
                  id="ans5"
                  cols="30"
                  rows="5"
                  defaultValue={sra?sra.queE4:""}
                />
              </td>
            </tr>
          </table>
        </div> 
      <div className="tableGroup">
        <button className="tableButton" onClick={submitSra}>Save Changes</button>
      </div>
      <h3>Section 3 - Technical legal practice</h3>
      <div className="table">
        <table>
          <tr>
            <th> Competence</th>
            <th>Have I had experience? What was it/what did I do?</th>
            <th>How can I evidence my experience?</th>
            <th>What did I learn?</th>
            <th>Do I need more experience?</th>
          </tr>
          <tr>
            <td className="ques">A1. Obtain relevant facts in a matter</td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queM1"
                onChange={handleSra}
                defaultValue={sra?sra.queM1:""}
                id="ans5"
                cols="30"
                rows="2"
              />
            </td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queM2"
                onChange={handleSra}
                defaultValue={sra?sra.queM2:""}
                id="ans5"
                cols="30"
                rows="2"
              />
            </td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queM3"
                onChange={handleSra}
                defaultValue={sra?sra.queM3:""}
                id="ans5"
                cols="30"
                rows="2"
              />
            </td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queM4"
                onChange={handleSra}
                defaultValue={sra?sra.queM4:""}
                id="ans5"
                cols="30"
                rows="2"
              />
            </td>
          </tr>
          <tr>
            <td className="ques">A2. Undertake legal research</td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queN1"
                onChange={handleSra}
                defaultValue={sra?sra.queN1:""}
                id="ans5"
                cols="30"
                rows="1"
              />
            </td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queN2"
                onChange={handleSra}
                defaultValue={sra?sra.queN2:""}
                id="ans5"
                cols="30"
                rows="1"
              />
            </td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queN3"
                onChange={handleSra}
                defaultValue={sra?sra.queN3:""}
                id="ans5"
                cols="30"
                rows="1"
              />
            </td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queN4"
                onChange={handleSra}
                defaultValue={sra?sra.queN4:""}
                id="ans5"
                cols="30"
                rows="1"
              />
            </td>
          </tr>
          <tr>
            <td className="ques">
              A3. Develop and advise on relevant options, strategies and solutions
            </td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queO1"
                onChange={handleSra}
                defaultValue={sra?sra.queO1:""}
                id="ans5"
                cols="30"
                rows="1"
              />
            </td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queO2"
                onChange={handleSra}
                defaultValue={sra?sra.queO2:""}
                id="ans5"
                cols="30"
                rows="1"
              />
            </td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queO3"
                onChange={handleSra}
                defaultValue={sra?sra.queO3:""}
                id="ans5"
                cols="30"
                rows="1"
              />
            </td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queO4"
                onChange={handleSra}
                defaultValue={sra?sra.queO4:""}
                id="ans5"
                cols="30"
                rows="1"
              />
            </td>
          </tr>
          <tr>
            <td className="ques">
              A4. Draft documents which are legally effective and accurately reflect the client's
              instructions
            </td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queP1"
                onChange={handleSra}
                defaultValue={sra?sra.queP1:""}
                id="ans5"
                cols="30"
                rows="1"
              />
            </td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queP2"
                onChange={handleSra}
                defaultValue={sra?sra.queP2:""}
                id="ans5"
                cols="30"
                rows="1"
              />
            </td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queP3"
                onChange={handleSra}
                defaultValue={sra?sra.queP3:""}
                id="ans5"
                cols="30"
                rows="1"
              />
            </td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queP4"
                onChange={handleSra}
                defaultValue={sra?sra.queP4:""}
                id="ans5"
                cols="30"
                rows="1"
              />
            </td>
          </tr>
          <tr>
            <td className="ques">
              A5.Undertake effective spoken and written advocacy in and of court
            </td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queQ1"
                onChange={handleSra}
                defaultValue={sra?sra.queQ1:""}
                id="ans5"
                cols="30"
                rows="2"
              />
            </td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queQ2"
                onChange={handleSra}
                defaultValue={sra?sra.queQ2:""}
                id="ans5"
                cols="30"
                rows="2"
              />
            </td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queQ3"
                onChange={handleSra}
                defaultValue={sra?sra.queQ3:""}
                id="ans5"
                cols="30"
                rows="2"
              />
            </td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queQ4"
                onChange={handleSra}
                defaultValue={sra?sra.queQ4:""}
                id="ans5"
                cols="30"
                rows="2"
              />
            </td>
          </tr>
          <tr>
            <td className="ques">A6.Negotiate solutions to clients' issues</td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queR1"
                onChange={handleSra}
                defaultValue={sra?sra.queR1:""}
                id="ans5"
                cols="30"
                rows="2"
              />
            </td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queR2"
                onChange={handleSra}
                defaultValue={sra?sra.queR2:""}
                id="ans5"
                cols="30"
                rows="2"
              />
            </td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queR3"
                onChange={handleSra}
                defaultValue={sra?sra.queR3:""}
                id="ans5"
                cols="30"
                rows="2"
              />
            </td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queR4"
                onChange={handleSra}
                defaultValue={sra?sra.queR4:""}
                id="ans5"
                cols="30"
                rows="2"
              />
            </td>
          </tr>
          <tr>
            <td className="ques">A7.Plan, manage and progress legal cases and transactions </td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queS1"
                onChange={handleSra}
                defaultValue={sra?sra.queS1:""}
                id="ans5"
                cols="30"
                rows="2"
              />
            </td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queS2"
                onChange={handleSra}
                defaultValue={sra?sra.queS2:""}
                id="ans5"
                cols="30"
                rows="2"
              />
            </td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queS3"
                onChange={handleSra}
                defaultValue={sra?sra.queS3:""}
                id="ans5"
                cols="30"
                rows="2"
              />
            </td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queS4"
                onChange={handleSra}
                defaultValue={sra?sra.queS4:""}
                id="ans5"
                cols="30"
                rows="2"
              />
            </td>
          </tr>
        </table>
      </div>
      <div className="tableGroup">
        <button className="tableButton" onClick={submitSra}>Save Changes</button>
      </div>
      <h3>Section 4 - Working with other people</h3>
      <div className="table">
        <table>
          <tr>
            <th>Competence</th>
            <th>Have I had experience? What was it/what did I do?</th>
            <th>How can I evidence my experience?</th>
            <th>What did I learn?</th>
            <th>Do I need more experience?</th>
          </tr>
          <tr>
            <td className="ques">A1. Communicate clearly and effectively, orally and in writing</td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queT1"
                onChange={handleSra}
                defaultValue={sra?sra.queT1:""}
                id="ans5"
                cols="30"
                rows="5"
              />
            </td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queT2"
                onChange={handleSra}
                defaultValue={sra?sra.queT2:""}
                id="ans5"
                cols="30"
                rows="5"
              />
            </td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queT3"
                onChange={handleSra}
                defaultValue={sra?sra.queT3:""}
                id="ans5"
                cols="30"
                rows="5"
              />
            </td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queT4"
                onChange={handleSra}
                defaultValue={sra?sra.queT4:""}
                id="ans5"
                cols="30"
                rows="5"
              />
            </td>
          </tr>
          <tr>
            <td className="ques">
              A2. Establish and maintain effective and professional relations with client
            </td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queU1"
                onChange={handleSra}
                defaultValue={sra?sra.queU1:""}
                id="ans5"
                cols="30"
                rows="5"
              />
            </td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queU2"
                onChange={handleSra}
                defaultValue={sra?sra.queU2:""}
                id="ans5"
                cols="30"
                rows="5"
              />
            </td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queU3"
                onChange={handleSra}
                defaultValue={sra?sra.queU3:""}
                id="ans5"
                cols="30"
                rows="5"
              />
            </td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queU4"
                onChange={handleSra}
                defaultValue={sra?sra.queU4:""}
                id="ans5"
                cols="30"
                rows="5"
              />
            </td>
          </tr>
          <tr>
            <td className="ques">
              A3. Establish and maintain effective and professional relations with other people
            </td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queV1"
                onChange={handleSra}
                defaultValue={sra?sra.queV1:""}
                id="ans5"
                cols="30"
                rows="5"
              />
            </td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queV2"
                onChange={handleSra}
                defaultValue={sra?sra.queV2:""}
                id="ans5"
                cols="30"
                rows="5"
              />
            </td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queV3"
                onChange={handleSra}
                defaultValue={sra?sra.queV3:""}
                id="ans5"
                cols="30"
                rows="5"
              />
            </td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queV4"
                onChange={handleSra}
                defaultValue={sra?sra.queV4:""}
                id="ans5"
                cols="30"
                rows="5"
              />
            </td>
          </tr>
        </table>
      </div>
      <div className="tableGroup">
        <button className="tableButton" onClick={submitSra}>Save Changes</button>
      </div>
      <h3>Section 5 - Managing yourself and your work</h3>
      <div className="table">
        <table>
          <tr>
            <th>Competence</th>
            <th>Have I had experience? What was it/what did I do?</th>
            <th>How can I evidence my experience?</th>
            <th>What did I learn?</th>
            <th>Do I need more experience?</th>
          </tr>
          <tr>
            <td className="ques">A1. Initiate, plan, prioritise and manage work activities and projects to ensure that they are completed efficiently, on time and to an appropriate standard, both in relation to their own work and work that they lead or supervise </td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queW1"
                onChange={handleSra}
                defaultValue={sra?sra.queW1:""}
                id="ans5"
                cols="30"
                rows="5"
              />
            </td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queW2"
                onChange={handleSra}
                defaultValue={sra?sra.queW2:""}
                id="ans5"
                cols="30"
                rows="5"
              />
            </td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queW3"
                onChange={handleSra}
                defaultValue={sra?sra.queW3:""}
                id="ans5"
                cols="30"
                rows="5"
              />
            </td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queW4"
                onChange={handleSra}
                defaultValue={sra?sra.queW4:""}
                id="ans5"
                cols="30"
                rows="5"
              />
            </td>
          </tr>
          <tr>
            <td className="ques">A2. Use and maintain accurate, complete and clear records </td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queX1"
                onChange={handleSra}
                defaultValue={sra?sra.queX1:""}
                id="ans5"
                cols="30"
                rows="5"
              />
            </td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queX2"
                onChange={handleSra}
                defaultValue={sra?sra.queX2:""}
                id="ans5"
                cols="30"
                rows="5"
              />
            </td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queX3"
                onChange={handleSra}
                defaultValue={sra?sra.queX3:""}
                id="ans5"
                cols="30"
                rows="5"
              />
            </td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queX4"
                onChange={handleSra}
                defaultValue={sra?sra.queX4:""}
                id="ans5"
                cols="30"
                rows="5"
              />
            </td>
          </tr>
          <tr>
            <td className="ques">A3. Apply good business practice </td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queY1"
                onChange={handleSra}
                defaultValue={sra?sra.queY1:""}
                id="ans5"
                cols="30"
                rows="5"
              />
            </td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queY2"
                onChange={handleSra}
                defaultValue={sra?sra.queY2:""}
                id="ans5"
                cols="30"
                rows="5"
              />
            </td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queY3"
                onChange={handleSra}
                defaultValue={sra?sra.queY3:""}
                id="ans5"
                cols="30"
                rows="5"
              />
            </td>
            <td>
              <textarea
                placeholder="type your answer here"
                className="textareas"
                name="queY4"
                onChange={handleSra}
                defaultValue={sra?sra.queY4:""}
                id="ans5"
                cols="30"
                rows="5"
              />
            </td>
          </tr>
        </table>
      </div>
      <div className="tableGroup">
        <button className="tableButton" onClick={submitSra} >Save Changes</button>
      </div>
    </div>
  );
}

export default Sra;
