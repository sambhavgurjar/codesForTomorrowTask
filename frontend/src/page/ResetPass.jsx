import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
export default function ResetPass() {
  const { token } = useParams();
  const [pass, setPass] = useState("");
  const [confrmPass, setConfrmPass] = useState("");

  useEffect(() => {
    console.log(token);

    if (!token) {
      alert("Invalid action !");
      window.close();
    }
  }, [token]);

  const handleSubmit = async () => {
    if (!pass || !confrmPass) {
      alert("fill all field");
      return;
    }
    if (pass !== confrmPass) {
      alert("password not match");
      return;
    }

    try {
      let url =
        import.meta.env.VITE_BACKEND_URL || "http://localhost:5050/api/vi";
      let response = await axios.post(`${url}/auth/reset-password/${token}`, {
        password: pass,
      });
      alert(response.data.message || "password reset successfull");
      window.close();
    } catch (err) {
      console.log(err);

      alert(err?.response?.data?.message || "Password reset failed");
      return;
    }
  };
  return (
    <>
      <div className="main-div">
        <input
          type="password"
          placeholder="enter new password"
          value={pass}
          onChange={(e) => {
            setPass(e.target.value);
          }}
        />
        <input
          type="password"
          value={confrmPass}
          placeholder="confirm new password"
          onChange={(e) => {
            setConfrmPass(e.target.value);
          }}
        />
        <button onClick={handleSubmit}>save</button>
      </div>
    </>
  );
}
