function AccountSecurity(){


return(

<div className="bg-white shadow rounded-2xl p-6">


<h2 className="text-xl font-bold mb-4">

🛡️ Account Security

</h2>




<div className="space-y-4">



<div className="border rounded-lg p-4">

<h3 className="font-semibold">

Login Protection

</h3>

<p className="text-gray-500">

Your account is protected using JWT authentication.

</p>

</div>





<div className="border rounded-lg p-4">


<h3 className="font-semibold">

Email Verification

</h3>


<p className="text-gray-500">

Email verification feature can be enabled.

</p>


</div>






<div className="border rounded-lg p-4">


<h3 className="font-semibold">

Active Session

</h3>


<p className="text-gray-500">

Current device session is active.

</p>


</div>




</div>




</div>


)


}


export default AccountSecurity;