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

    const [comments, setComments] = useState("");

    const [loading, setLoading] = useState(false);

    const departments = ["CSE", "CS-AI", "AI-DS", "IT", "ECE", "EE", "ME", "CE"];
    const facultyDepartments = [...departments, "First Year"];

    const next = () => setStep(step + 1);
    const back = () => setStep(step - 1);

    const submitFeedback = async () => {

        setLoading(true);

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
            presentation,
            comments
        };

        try {

            await fetch("https://script.google.com/macros/s/AKfycbhzBtPmalyvNckuFuD5uxQzaUIBgc1HO8MvxCWI8I-g1NepuC2yEYYkZpbijcC8uqH/exec", {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            setStep(5);   // Thank you screen

        } catch (error) {

            console.error(error);
            alert("Submission failed");

        }

        setLoading(false);  // stop loading
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

            <img
                src={robot}
                alt="robot"
                style={{
                    position: "fixed",
                    bottom: "30px",
                    right: "40px",
                    width: "110px"
                }}
            />

            <div style={{
                width: 520,
                padding: 40,
                borderRadius: 20,
                background: "rgba(15,23,42,0.65)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 0 40px rgba(168,85,247,0.35)"
            }}>

                <h1 style={{
                    textAlign: "center",
                    fontSize: 36,
                    background: "linear-gradient(90deg,#a855f7,#ec4899)",
                    WebkitBackgroundClip: "text",
                    color: "transparent"
                }}>
                    J-TECHTRIX 7.0
                </h1>

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

                {/* FLOOR SELECTION */}

                {step === 3 && (

                    <>

                        <h3>Select Floor</h3>

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
                        <input type="range" min="1" max="10" value={innovation} onChange={e => setInnovation(Number(e.target.value))} style={slider} />

                        <p>Technical Depth {techDepth}</p>
                        <input type="range" min="1" max="10" value={techDepth} onChange={e => setTechDepth(Number(e.target.value))} style={slider} />

                        <p>Presentation {presentation}</p>
                        <input type="range" min="1" max="10" value={presentation} onChange={e => setPresentation(Number(e.target.value))} style={slider} />

                        <h2 style={{ color: "#a855f7" }}>
                            Average Score {((innovation + techDepth + presentation) / 3).toFixed(1)}
                        </h2>

                        <p>Share your thoughts (2 lines)</p>

                        <textarea
                            rows="2"
                            placeholder="Write your feedback..."
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                            style={{
                                width: "100%",
                                padding: 10,
                                borderRadius: 8,
                                border: "none",
                                marginBottom: 10
                            }}
                        />

                        <button style={buttonStyle} onClick={back}>Back</button>

                        <button style={buttonStyle} onClick={submitFeedback} disabled={loading}>
                            {loading ? "Submitting..." : "Submit Feedback"}
                        </button>

                    </>

                )}

                {/* THANK YOU SCREEN */}

                {step === 5 && (

                    <div style={{ textAlign: "center" }}>

                        <h1 style={{ color: "#a855f7" }}>🎉 Thank You!</h1>

                        <p>Your feedback has been recorded.</p>

                        <button style={buttonStyle} onClick={() => setStep(1)}>
                            Submit Another Feedback
                        </button>

                    </div>

                )}

            </div>

        </div>

    );
}

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