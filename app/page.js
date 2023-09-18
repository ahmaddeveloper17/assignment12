"use client"
import { useState } from "react";
export default function home() {
    const [userName, setUserName] = useState(null)
    const [followers, setFollowers] = useState([])
    const [data, setData] = useState(null)
    const onChangeHandler = (e) => {
        setUserName(e.target.value)
    }
    const onClickHandler = async () => {
        setFollowers([])

        let response = await fetch(`https://api.github.com/users/${userName}`)
        response = await response.json()
        setData(response)
        console.log(response);

    }
    const onFollowerHandler = async () => {
        let response = await fetch(data.followers_url)
       response.data = await response.json()
        console.log("response", response.data);
        setFollowers(response.data)

    }
    return (
        <div > 
            <img style={{borderRadius:"150%", width:"5%", marginLeft:"45%",marginTop:"14%"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMIYPQpAHWfspO8qrIdSO7Pkx-JpkIU03WVA&usqp=CAU" alt="" />
            <div className="User-data" style={{textAlign:"center" , marginTop:"1%"}}>
                <h1 style={{fontWeight:"bolder" , fontSize:"250%"}}>Get User Github Data</h1>
                <input placeholder="Enter Username" style={{ width:"30%" , height:"30px"}} type="text" onChange={onChangeHandler} />
                <button class="btn btn-light" onClick={onClickHandler} style={{ width:"7%" , height:"30px"}}>Get Data</button>
            </div> 
            <div className="follow">

            {data &&
                <div style={{marginLeft:"40%"}}>
                
                    <h1 style={{color:"white" }}>Github user</h1>
                    <img style={{borderRadius:"30px"}} src={data.avatar_url} width={150} alt="" /><br />
                    <span style={{color:"white"}}><b>Bio:</b>   {data.bio} - {data.followers}</span><hr style={{marginLeft:"420px", marginRight:"420px"}}/><br />
                    <button  className="Button" onClick={onFollowerHandler}>Get followers</button>
                </div>
            }
            </div><br />
            {followers.length >= 1 &&

            <table className="Table" >
                <tr style={{color:"white"}}>
                    <th ><h4 style={{marginLeft:"200px"}} >The User Id</h4> </th>
                    <th ><h4 style={{marginLeft:"200px"}}>The User Image</h4></th>
                    <th ><h4 style={{marginLeft:"200px"}}>The User Name</h4></th>
                    <th ><h4 style={{marginLeft:"200px"}}>The Type</h4></th>
                </tr>
                {followers.map((element) => {
                    return (
                        <tr style={{color:"white"}}> 
                            <td> < div style={{marginLeft:"200px"}}>{element.id}</div></td>
                            <td> <img style={{borderRadius:"50px" , marginLeft:"200px"}} src={element.avatar_url} width={80} alt="" /></td>
                            <td> <div  style={{marginLeft:"200px"}} >{element.login} </div></td>
                            <td> <div  style={{marginLeft:"200px"}}>{element.type} </div></td>
                        </tr>
                    )
                })}

            </table>
}
        </div>  )
}