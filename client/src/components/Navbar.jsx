import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


function Navbar(){

    const navigate = useNavigate();

    const [open,setOpen] = useState(false);


    const token = localStorage.getItem("token");


    let user = null;


    if(token){

        user = jwtDecode(token);

    }


    const logout = ()=>{

        localStorage.removeItem("token");

        navigate("/login");

    };


    return(

<nav className="
bg-gray-900
text-white
px-6
py-4
shadow-lg
">


<div className="
max-w-7xl
mx-auto
flex
justify-between
items-center
">


<h1 className="text-2xl font-bold">

🚗 CarDealer

</h1>



<button

className="md:hidden text-3xl"

onClick={()=>setOpen(!open)}

>

☰

</button>



<div

className={`
${open ? "block" : "hidden"}
md:flex
gap-6
items-center
absolute
md:static
top-16
left-0
w-full
md:w-auto
bg-gray-900
md:bg-transparent
p-6
md:p-0
`}
>


<Link
to="/cars"
className="hover:text-blue-400"
>
Cars
</Link>



{

!token &&

<>

<Link
to="/login"
className="hover:text-blue-400"
>
Login
</Link>


<Link
to="/register"
className="hover:text-blue-400"
>
Register
</Link>

</>

}



{

token && user?.role==="admin" &&

<Link

to="/dashboard"

className="hover:text-blue-400"

>

Dashboard

</Link>

}



{

token &&

<button

onClick={logout}

className="
bg-red-600
px-4
py-2
rounded-lg
hover:bg-red-700
"

>

Logout

</button>

}


</div>


</div>


</nav>


    );

}


export default Navbar;