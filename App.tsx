import { useEffect, useState } from "react";

function App() {
  const [city, setCity] = useState("Guntur");
  const [department, setDepartment] = useState("Cardiology");
  const [doctors, setDoctors] = useState([]);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [whatsapp, setWhatsapp] = useState("");

  const loadDoctors = async () => {
    const res = await fetch(
      `http://localhost:3000/doctors?city=${city}&department=${department}`
    );
    const data = await res.json();
    setDoctors(data);
  };

  useEffect(() => {
    loadDoctors();
  }, [city, department]);

  const sendMessage = async () => {
    if (!message) return;

    const res = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: 1,
        message,
        city,
        department,
        whatsapp,
      }),
    });

    const data = await res.json();

    setChat((prev) => [
      ...prev,
      { sender: "user", text: message },
      { sender: data.type, text: data.reply },
    ]);

    setMessage("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🏥 Hospital Chat</h2>

      <div>
        <label>City: </label>
        <select value={city} onChange={(e) => setCity(e.target.value)}>
          <option>Guntur</option>
        </select>

        <label style={{ marginLeft: 10 }}>Department: </label>
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option>Cardiology</option>
          <option>General</option>
        </select>
      </div>

      <hr />

      <h3>Doctors</h3>

      {doctors.map((doc: any) => (
        <div key={doc.id}>
          👨‍⚕️ {doc.name} ({doc.speciality})
        </div>
      ))}

      <hr />

      <div style={{ border: "1px solid gray", height: 200, padding: 10 }}>
        {chat.map((c, i) => (
          <p key={i}>
            {c.sender === "user" && "👤 You: "}
            {c.sender === "doctor" && "👨‍⚕️ "}
            {c.sender === "ai" && "🤖 "}
            {c.text}
          </p>
        ))}
      </div>

      <br />

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type message"
      />

      <br /><br />

      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;