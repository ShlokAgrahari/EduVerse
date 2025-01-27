import React, { useEffect, useState } from "react";
import "./Certificate.css";
import completionBadge from "./completion-badge.png";
import logoImage from "./logo.png";
import completionMedal from "./completion-medal.png";
import student from './student.png'             
import html2pdf from 'html2pdf.js';
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { useParams } from "react-router-dom";

const Certificate = () => {

    const {courseId} = useParams();
    const [userName,setuserName] = useState("");
    const [courseName,setcourseName] = useState("");

    useEffect(()=>{
      const getDetail = async () => {
        const response = await fetch(`http://localhost:8000/getdetail/${courseId}`,{
          method:"GET",
          credentials:"include",
        });
        if(!response.ok){
          throw new Error('Failed to fetch details');
        }
        const result = await response.json();
        const {name,course} = result.data.Detail;
        setuserName(name);
        setcourseName(course);
      }
      getDetail();
    },[]);




    useEffect(() => {
        const generatePDF = async () => {
          const element = document.querySelector("#container5");
    
          if (element) {
            // Use html2canvas to capture the entire certificate
            const canvas = await html2canvas(element, {
              scale: 1, // Higher scale improves image quality
              useCORS: true, // Ensures images from external sources are captured
            });
    
            const imgData = canvas.toDataURL("image/png");
    
            // Create a PDF instance in landscape mode
            const pdf = new jsPDF("landscape", "px", [canvas.width, canvas.height]);
    
            // Add the captured image to the PDF
            pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    
            // Save the PDF
            pdf.save("certificate.pdf");
          } else {
            console.error("Certificate container not found!");
          }
        };
    
        generatePDF();
      }, []); 

  return (
    <>
      <div id="container5">
        <div className="images">
          <img src={logoImage} id="image" />
          <img src={completionBadge} id="image" />
        </div>

        <div className="content5">
          <div className="box4">
            <div className="block">
              <div className="box1"></div>
              <div className="box">
              <div 
    className="box2" 
    style={{ fontFamily: 'Roboto, sans-serif', fontSize: '17px', color: 'rgb(0, 106, 255)' }}
>
    CERTIFICATE OF COMPLETION
</div>

                <div className="box3">
                <p
  style={{
    fontFamily: 'Aristotelica Pro, sans-serif',
    fontSize: '35px',
    fontWeight: 'bold', 
    lineHeight: '1.2', 
    color: '#333',     
  }}
>
  Only web development course that you will need. Covers HTML, CSS, Tailwind,
  Node, React, MongoDB, Prisma, Deployment etc
</p>

                  <img src={completionMedal} id="medal" />
                </div> 
              </div>
            </div>
            <div className="text">
            <p
  style={{
    fontFamily: 'Roboto, sans-serif',
    fontSize: '21px',
    lineHeight: '1.5', // Optional, adjusts line spacing
    color: '#333',     // Optional, sets text color
  }}
>
  This is to certify that {userName} has successfully completed the online course {courseName} of duration HOURS on DATE.
</p>

              </div>
          </div>
        </div>
        <div className="student">
            <img src={student}/>
        </div>
      </div>
    </>
  );
};

export default Certificate;
