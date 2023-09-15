import React, { useState } from 'react';
import './Card.css'


export const Card = () => {
    const [username, setUsername] = useState('');
    const [userData, setUserData] = useState(null);

    const ChangeIt = (event) => {
        setUsername(event.target.value);
    };


    const Submit = async () => {
    
        try {
            const response = await fetch(`https://api.github.com/users/${username}`);
            if (response.ok) {
              const data = await response.json();
              console.log(data)
              setUserData(data);
            } else {
              console.error('User not found');
              setUserData(null);
            }
          } catch (error) {
            console.error(error);
          } 

        setUsername("")
    };
    return (
        <div className='container'>
            <div className='search'>
                <input
                    type="text"
                    placeholder="Enter GitHub username"
                    value={username}
                    onChange={ChangeIt}
                />
                <button onClick={Submit}>Submit</button>
            </div>


            {userData && (
                <div className="userCard">
                    <div className="avatar">
                        <img src={userData.avatar_url} alt={`${username}'s avatar`} />
                    </div>
                    <div className="userdescription">
                        <h2>{userData.name}</h2>
                        <p>@{userData.login}</p>
                        <div className='description'>
                            <p>{userData.bio}</p>
                        </div>

                        <div className="repobutton">
                            <button>Public Repos : {userData.public_repos}</button>
                            <button>Public Gists : {userData.public_gists}</button>
                            <p>Profile created at : {new Date(userData.created_at).toISOString().split('T')[0]}</p>

                        </div>

                    </div>






                </div>



            )}
        </div>
    )
}