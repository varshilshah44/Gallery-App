const onsignup = async () => {
  const object = {
    firstName: document.getElementById("fname").value,
    lastName: document.getElementById("lname").value,
    mobile: document.getElementById("mobile").value,
    email: document.getElementById("email").value,
    address: document.getElementById("address").value,
    password: document.getElementById("password").value,
    confirmPassword: document.getElementById("confirm_passoword").value,
  };
  const response = await axios.post(
    `${window.location.origin}/api/user/signup`,
    object
  );
  if (response.data.status === "success") {
    alert("Signup successfully");
    location.href = "/";
  } else {
    alert(response.data.message);
  }
};

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
});
