
const Name  = document.getElementById('form3Example1cg')
const emails =document.getElementById('form3Example3cg')
const passwords =document.getElementById('form3Example4cg')
const PasswordCofirms = document.getElementById('form3Example4cdg')
const sucessFully =document.getElementById('suceessalert')
const form = document.getElementById('form')
const button =document.getElementById('remove')



form.addEventListener('submit',async(event)=>{
    event.preventDefault()
        const name=Name.value;
        const email=emails.value;
       const password =passwords.value;
       const  PasswordCofirm  =PasswordCofirms.value;
  
    if((name.length<=3) || (name.length>=15)){
      document.getElementById('name').innerHTML ='** The name lenth must 3  and 15 char log';
        return false
    }
      
    if(!isNaN(name)){
      document.getElementById('name').innerHTML ='** only for char is Allowed';
      return false
    }


   

    if(email.charAt(email.length-4)!='.' &&email.charAt(email.length-2)!='.' ){
        document.getElementById('email').innerHTML='*** please fill the valid email';
        return false

    }

    if((password.length<5) || (password.length>20)){
      document.getElementById('password').innerHTML='** The password lenth must 3  and 15 char log'
        return false
    }
    
     if(password!=PasswordCofirm){ 
       document.getElementById('checkPassword').innerHTML='**  Password are not Matching'
         return false
     }
  
      let data ={
                name :name,
                email: email,
                password: password,
                PasswordCofirm:PasswordCofirm
              }
      await fetch('/pages-register',{
          method: 'POST',
          headers:{
             'Content-Type':'application/json'
          },
          body:JSON.stringify(data)
          
      })
      .then((Response)=>{
          console.log(Response)
           if(Response.status==201){
           sucessFully.classList.add('alert_alert-success')
            const button =document.createElement('button')
                  button.type ="button"
                  button.id="remove"
                  button.classList.add("close-alert")
                  const x =document.createTextNode('x') 
                  button.appendChild(x)
                  const i =document.createElement('i')
                        i.classList.add('"material-icons"')
                  const text =document.createTextNode('Sign Up sucessFully') 
                  sucessFully.appendChild(button)     
                  sucessFully.appendChild(i)
                  sucessFully.appendChild(text)   

                 setTimeout(()=>{
                    window.location.replace("http://localhost:8000/login");
                },1500)   
           }else if(Response.status==401){
                sucessFully.classList.add('alert_alert-warning')
                const button =document.createElement('button')
                      button.type ="button"
                      button.id="remove"
                      button.classList.add("close-alert")
                      const x =document.createTextNode('x') 
                      button.appendChild(x)
                      const i =document.createElement('i')
                            i.classList.add('"material-icons"')
                      const text =document.createTextNode('User is Already Exits') 
                      sucessFully.appendChild(button)     
                      sucessFully.appendChild(i)
                      sucessFully.appendChild(text)   
                    setTimeout(()=>{
                       window.location.replace("http://localhost:8000/pages-register");
                   },2500) 
            }
           
      })
      .catch((err)=>{
          if(err){
            if(Response.status==500){
              console.log(Response.status) 
              sucessFully.classList.add('alert_alert-danger')
               const button =document.createElement('button')
                     button.type ="button"
                     button.id="remove"
                     button.classList.add("close-alert")
                     const x =document.createTextNode('x') 
                     button.appendChild(x)
                     const i =document.createElement('i')
                           i.classList.add('"material-icons"')
                     const text =document.createTextNode('INTERNAL SERVER Error') 
                     sucessFully.appendChild(button)     
                     sucessFully.appendChild(i)
                     sucessFully.appendChild(text)   
              }
              setTimeout(()=>{
                window.location.replace("http://localhost:8000/pages-register");
              },1500)
          }
      })
    

})




