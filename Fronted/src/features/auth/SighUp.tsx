import React from 'react'

const Login:React.FC = () => {
  

    return (
        <div>
            <div className="form-container">
                <p>Sigh up</p>
                <form className="form">
                    <label>Email</label>
                    <input type="text" className="input" placeholder="Enter your email" />
                    <label>Password</label>
                    <input type="password" className="input" placeholder="Password" />
                    <button type="submit">Submit</button>
                </form>
            </div>

        </div>
    )
}

export default Login