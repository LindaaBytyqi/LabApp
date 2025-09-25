import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserService } from "../Services/UserService";
import { UserModel } from "../Interfaces/UserModel";
import { Role } from "../Interfaces/Role";
import { v4 as uuidv4 } from "uuid";

export default function Register() {
  const [formData, setFormData] = useState<UserModel>({
    id: "",
    userName:"",
    lastName: "",
    email: "",
    password: "",
    address: "",
    role: Role.User, // Default role
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

 async function submitForm(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    // Siguro që të gjitha fushat të jenë string ose number si kërkon backend
    const payload: UserModel = {
        id: uuidv4(),
    //   id: formData.id || "", // bosh GUID
      userName: formData.userName || "",
      lastName: formData.lastName || "",
      email: formData.email || "",
      password: formData.password || "",
      address: formData.address || "",
      role: Role.User,
    };

    console.log("Payload sent to backend:", payload);

    const response = await UserService.EditOrAddUser(payload);
    console.log("Register response:", response);

    alert("Registration successful!");
    navigate("/login"); // redirect pas regjistrimit
  } catch (error: any) {
    console.error(error);
    alert(
      error?.response?.data?.message || "Registration failed. Check your data."
    );
  } finally {
    setIsSubmitting(false);
  }
}



  return (
    <div
      style={{
        background: "linear-gradient(135deg,rgba(235, 234, 223, 1), #cad5dcff)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflowX: "hidden",
        boxSizing: "border-box",
        padding: "1rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "#586474ff",
          borderRadius: "1rem",
          padding: "2rem",
          color: "white",
          boxShadow: "0 8px 16px rgba(0,0,0,0.25)",
        }}
      >
        <h2 className="text-center fw-bold mb-4 text-uppercase">Register</h2>
        <p className="text-center text-white-50 mb-4">
          Fill in your details to create an account
        </p>

        <form onSubmit={submitForm}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={formData.email|| ""}
              onChange={handleChange}
              required
              style={{
                backgroundColor: "#34495e",
                border: "none",
                color: "white",
              }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              value={formData.password|| ""}
              onChange={handleChange}
              required
              style={{
                backgroundColor: "#34495e",
                border: "none",
                color: "white",
              }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="lastName" className="form-label text-white">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="form-control"
              value={formData.lastName|| ""}
              onChange={handleChange}
              required
              style={{
                backgroundColor: "#34495e",
                border: "none",
                color: "white",
              }}
            />
          </div>
           <div className="mb-3">
            <label htmlFor="userName" className="form-label text-white">
             UserName
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              className="form-control"
              value={formData.userName|| ""}
              onChange={handleChange}
              required
              style={{
                backgroundColor: "#34495e",
                border: "none",
                color: "white",
              }}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="form-label text-white">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className="form-control"
              value={formData.address|| ""}
              onChange={handleChange}
              required
              style={{
                backgroundColor: "#34495e",
                border: "none",
                color: "white",
              }}
            />
          </div>

          <button
            type="submit"
            className="btn btn-light w-100"
            disabled={isSubmitting}
            style={{
              fontWeight: "bold",
              padding: "10px",
              borderRadius: "0.5rem",
            }}
          >
            {isSubmitting ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              "Register"
            )}

            
          </button>

          <p className="text-center text-white-50 mt-3">
    Already have an account?{" "}
    <span
      style={{ color: "#f0f0f0", textDecoration: "underline", cursor: "pointer" }}
      onClick={() => navigate("/login")}
    >
      Login
    </span>
  </p>
        </form>
      </div>
    </div>
  );
}
