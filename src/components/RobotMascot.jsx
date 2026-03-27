import robot from "../assets/robot.png";

export default function RobotMascot() {
    return (
        <div
            style={{
                position: "fixed",
                bottom: "30px",
                right: "40px",
                zIndex: 100
            }}
        >
            <img
                src={robot}
                alt="robot mascot"
                style={{
                    width: "110px",
                    animation: "floatRobot 4s ease-in-out infinite",
                    filter: "drop-shadow(0 0 12px #a855f7)"
                }}
            />
        </div>
    );
}