export default function CircuitBackground() {
    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: -1,
                background:
                    "radial-gradient(circle at top, #1f2937, #020617)",
                overflow: "hidden"
            }}
        >
            <div className="circuit-lines"></div>
        </div>
    );
}