import React, { useState } from "react";
import robot from "./assets/robot.png";

export default function App() {

    const [step, setStep] = useState(1);

    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [role, setRole] = useState("");

    const [year, setYear] = useState("");
    const [department, setDepartment] = useState("");
    const [customDept, setCustomDept] = useState("");

    const [floor, setFloor] = useState("");

    const [innovation, setInnovation] = useState(5);
    const [techDepth, setTechDepth] = useState(5);
    const [presentation, setPresentation] = useState(5);

    const departments = ["CSE", "CS-AI", "AI-DS", "IT", "ECE", "EE", "ME", "CE"];
    const facultyDepartments = [...departments, "First Year"];

    const next = () => setStep(step + 1);
    const back = () => setStep(step - 1);


    const submitFeedback = async () => {

        const data = {
            name,
            id,
            role,
            year,
            department,
            customDept,
            floor,
            innovation,
            techDepth,
            presentation
        };

        console.log("Submitting:", data);

        try {

            await fetch("https://script.google.com/macros/s/AKfycbyhZbTpMalvyWckuFuD5uxQzaUIbGc1HO8MvxCwI8I-glNepuC2yEYYkZpbijcC8uqH/exec", {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            alert("Feedback submitted successfully!");

            setStep(5);

        } catch (error) {

            console.error(error);
            alert("Submission failed");

        }

    };

    return (

        <div style={{
            minHeight: "100vh",
            background: "linear-gradient(135deg,#020617,#111827)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Orbitron, sans-serif",
            color: "white"
        }}>

            {/* CIRCUIT BACKGROUND */}

            <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: -1,
                    backgroundImage:
                        "linear-gradient(90deg, transparent 95%, #9333ea),linear-gradient(0deg, transparent 95%, #9333ea)",
                    backgroundSize: "60px 60px",
                    opacity: 0.1,
                    animation: "circuitMove 40s linear infinite"
                }}
            />

            {/* ROBOT MASCOT */}

            <img
                src={robot}
                alt="robot"
                style={{
                    position: "fixed",
                    bottom: "30px",
                    right: "40px",
                    width: "110px",
                    animation: "floatRobot 4s ease-in-out infinite",
                    filter: "drop-shadow(0 0 12px #a855f7)"
                }}
            />

            <div style={{
                width: 520,
                padding: 40,
                borderRadius: 20,
                background: "rgba(15,23,42,0.65)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 0 40px rgba(168,85,247,0.35)",
                border: "1px solid rgba(168,85,247,0.2)"
            }}>

                <h1 style={{
                    textAlign: "center",
                    marginBottom: 10,
                    fontSize: 36,
                    letterSpacing: 2,
                    background: "linear-gradient(90deg,#a855f7,#ec4899)",
                    WebkitBackgroundClip: "text",
                    color: "transparent"
                }}>
                    J-TECHTRIX 7.0
                </h1>

                <p style={{ textAlign: "center", opacity: 0.6 }}>
                    Feedback & Floor Evaluation System
                </p>

                <hr style={{ margin: "20px 0", opacity: 0.2 }} />

                {/* STEP 1 */}

                {step === 1 && (

                    <>

                        <h3>Identity & Role</h3>

                        <p>Full Name</p>
                        <input value={name} onChange={e => setName(e.target.value)} style={inputStyle} />

                        <p>Official ID (optional)</p>
                        <input value={id} onChange={e => setId(e.target.value)} style={inputStyle} />

                        <p>Role</p>

                        <label><input type="radio" value="Student" checked={role === "Student"} onChange={e => setRole(e.target.value)} /> Student</label><br />
                        <label><input type="radio" value="Faculty" checked={role === "Faculty"} onChange={e => setRole(e.target.value)} /> Faculty</label><br />
                        <label><input type="radio" value="Administration" checked={role === "Administration"} onChange={e => setRole(e.target.value)} /> Administration</label>

                        <br /><br />

                        <button style={buttonStyle} onClick={next}>Continue</button>

                    </>

                )}

                {/* STUDENT */}

                {step === 2 && role === "Student" && (

                    <>

                        <h3>Student Details</h3>

                        <p>Current Year</p>

                        <select style={inputStyle} value={year} onChange={e => setYear(e.target.value)}>
                            <option>1st</option>
                            <option>2nd</option>
                            <option>3rd</option>
                            <option>4th</option>
                        </select>

                        <p>Department</p>

                        <select style={inputStyle} value={department} onChange={e => setDepartment(e.target.value)}>

                            {departments.map(d => (
                                <option key={d}>{d}</option>
                            ))}

                        </select>

                        <br /><br />

                        <button style={buttonStyle} onClick={back}>Back</button>
                        <button style={buttonStyle} onClick={next}>Next</button>

                    </>

                )}

                {/* FACULTY */}

                {step === 2 && role === "Faculty" && (

                    <>

                        <h3>Faculty Details</h3>

                        <select style={inputStyle} value={department} onChange={e => setDepartment(e.target.value)}>

                            {facultyDepartments.map(d => (
                                <option key={d}>{d}</option>
                            ))}

                        </select>

                        {department === "First Year" && (

                            <>
                                <p>Specify Department</p>
                                <input value={customDept} onChange={e => setCustomDept(e.target.value)} style={inputStyle} />
                            </>

                        )}

                        <br /><br />

                        <button style={buttonStyle} onClick={back}>Back</button>
                        <button style={buttonStyle} onClick={() => setStep(3)}>Next</button>

                    </>

                )}

                {/* ADMIN */}

                {step === 2 && role === "Administration" && (

                    <>
                        <h3>Administration</h3>
                        <button style={buttonStyle} onClick={() => setStep(3)}>Continue</button>
                    </>

                )}

                {/* FLOOR HUB */}

                {step === 3 && (

                    <>

                        <h3>Select Floor To Evaluate</h3>

                        <div style={{ display: "grid", gap: 12 }}>

                            <button style={floorButton} onClick={() => { setFloor("Ground Floor"); setStep(4) }}>Ground Floor</button>
                            <button style={floorButton} onClick={() => { setFloor("1st Floor"); setStep(4) }}>1st Floor</button>
                            <button style={floorButton} onClick={() => { setFloor("2nd Floor"); setStep(4) }}>2nd Floor</button>

                        </div>

                    </>

                )}

                {/* FLOOR RATING */}

                {step === 4 && (
                    <>
                        <h3>{floor} Evaluation</h3>

                        <p>Innovation {innovation}</p>
                        <input
                            type="range"
                            min="1"
                            max="10"
                            value={innovation}
                            onChange={(e) => setInnovation(Number(e.target.value))}
                            style={slider}
                        />

                        <p>Technical Depth {techDepth}</p>
                        <input
                            type="range"
                            min="1"
                            max="10"
                            value={techDepth}
                            onChange={(e) => setTechDepth(Number(e.target.value))}
                            style={slider}
                        />

                        <p>Presentation {presentation}</p>
                        <input
                            type="range"
                            min="1"
                            max="10"
                            value={presentation}
                            onChange={(e) => setPresentation(Number(e.target.value))}
                            style={slider}
                        />

                        <h2 style={{ color: "#a855f7" }}>
                            Average Score {((innovation + techDepth + presentation) / 3).toFixed(1)}
                        </h2>

                        <button style={buttonStyle} onClick={back}>
                            Back
                        </button>

                        <button style={buttonStyle} onClick={submitFeedback}>
                            Submit Feedback
                        </button>
                    </>
                )}
                {step === 5 && (
                    <div style={{ textAlign: "center" }}>

                        <h1 style={{ color: "#a855f7", fontSize: "36px" }}>
                            🎉 Thank You!
                        </h1>

                        <p style={{ fontSize: "18px", marginTop: "10px" }}>
                            Your feedback has been recorded successfully.
                        </p>

                        <p style={{ opacity: 0.7 }}>
                            We appreciate your contribution to JTECHTRIX 7.0.
                        </p>

                        <button
                            style={buttonStyle}
                            onClick={() => setStep(1)}
                        >
                            Submit Another Feedback
                        </button>

                    </div>
                )}
            </div>

            <style>
                {`
@keyframes floatRobot {
0%{transform:translateY(0px);}
50%{transform:translateY(-18px);}
100%{transform:translateY(0px);}
}

@keyframes circuitMove {
0%{transform:translate(0,0);}
100%{transform:translate(-200px,-200px);}
}
`}
            </style>

        </div>

    );
}

/* UI styles */

const inputStyle = {
    width: "100%",
    padding: 10,
    borderRadius: 8,
    border: "none",
    marginBottom: 10
};

const buttonStyle = {
    padding: "10px 16px",
    marginRight: 10,
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    background: "linear-gradient(90deg,#a855f7,#ec4899)",
    color: "white"
};

const floorButton = {
    padding: 14,
    borderRadius: 10,
    border: "none",
    background: "#1f2937",
    color: "white",
    cursor: "pointer"
};

const slider = {
    width: "100%",
    accentColor: "#a855f7"
};