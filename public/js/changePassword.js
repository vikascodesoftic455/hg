const Old_Password = document.getElementById('form3Example3cg')
const new_Password = document.getElementById('form3Example4cg')
const confirm_Password= document.getElementById('form3Example5cg')
const mypasswordChangeData =document.getElementById('mypasswordChangeData')

mypasswordChangeData.addEventListener('submit',(event)=>{
    event.preventDefault()
    const oldpassword =Old_Password.value;
    const nwPassword =new_Password.value
    const confirmPassword =confirm_Password.value
      
    if(nwPassword.length<5){
        alert('The Password must be 5+ char long')
    }
     
      if(oldpassword!=oldpassword){
          alert('oldPassword && newPassword are differnt')
      }
      if(nwPassword!=confirmPassword){
        alert('plase fil newpassword && confirmpassword are same')
    }
    const da =localStorage.getItem("jwt")
    console.log(da)
    fetch('/changepassword',{
        method: 'POST',
        body:JSON.stringify({oldPassword:oldpassword,newPassword:nwPassword,confirmNewpassword:confirmPassword}),
        headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
         Authorization:`Bearer ${localStorage.getItem("jwt")}`
        }
     })
     .then((Response)=>{
          if(Response.status==201){
            swal("password Change Sucessfully");
            localStorage.removeItem('jwt')
            setTimeout(()=>{
                window.location.replace("http://localhost:8000/login");
            },2000)
          }
     })
})

