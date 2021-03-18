const onload = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userid');
}

const onlogin = async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
   
    const response = await axios.put(`${window.location.origin}/api/user/login`,{
        email:email,
        password:password
    })
    if(response.data.status === "success"){
        localStorage.setItem('token',response.data.user.token);
        localStorage.setItem('userid',response.data.user._id);
        alert("Login Successfully");
        location.href=`/dashboard?userid=${response.data.user._id}&type=image`
    }
    else{
        alert(response.data.message);
    }
}

const onSignup = () => {
    location.href = "/signup"
}
 
document.getElementById("form").addEventListener("submit",(el) => {
    el.preventDefault();
})