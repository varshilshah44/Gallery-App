let file;
const onchangephoto = async (userid) => {
    if(!file){
        alert('please select the new image');
    }
    else{
        let fd = new FormData();
        fd.append('image',file);
        const response = await axios.put(`${window.location.origin}/api/user/modify-image/${userid}`,fd,{
            headers:{
                Authorization:localStorage.getItem('token') 
            }
        });
        if(response.data.status === 'success'){
            alert("photo updated successfully");
            location.href = `/profile?userid=${userid}`
        }   
        else{
            alert(response.data.message);
        }     
    }
}

const onremovephoto = async (userid) => {
   const response = await axios.delete(`${window.location.origin}/api/user/remove-image/${userid}`,{
    headers:{
        Authorization:localStorage.getItem('token') 
    }
   }) 
   if(response.data.status === "success"){
        alert("removed successfully");
        location.href = `/profile?userid=${userid}`;
   }   
   else{
       alert(response.data.message);
   }
}

const onfilechoose = (target) => {
    file = target.files[0];
}


const onsave = async (userid) => {
    const obj = {
        firstName:document.getElementById('fname').value,
        lastName:document.getElementById('lname').value,
        mobile:document.getElementById('mobile').value,
        address:document.getElementById('address').value,
        email:document.getElementById('email').value,
    }
    const response = await axios.put(`${window.location.origin}/api/user/modify-user/${userid}`,obj,{
         headers:{
             Authorization:localStorage.getItem('token')
         }
    })
    
    if(response.data.status === "success"){
        alert("updated successfully");
        location.href = `/profile?userid=${userid}`
    }
    else{
        alert(response.data.message);
    }
}