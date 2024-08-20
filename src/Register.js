import React from 'react'
import './Register.css'
const Register = () => {
    return (
        <div className="containerRegister">
            <div className="left-section">
                <div className="toggle-group">
                    <input type="text" className="large-input" placeholder="input text" />
                    <input type="text" className="large-input" placeholder="input text" />
                </div>
                <div className="toggle-group">
                    <input type="text" className="large-input" placeholder="input text" />

                    <div className="half-width">
                        <button className="toggle">toggle</button>
                        <button className="toggle">toggle</button>
                    </div>

                </div>
                <div className="picker-group">

                    <input type="text" className="large-input" placeholder="input text" />
                    <input type="text" className="large-input" placeholder="input text" />


                </div>
                <div className="picker-group">
                    <input type="text" className="large-input" placeholder="input text" />
                    <input type="text" className="large-input" placeholder="input text" />
                </div>
                <div className="picker-group">

                    <input type="text" className="large-input" placeholder="input text" />
                    <input type="text" className="large-input" placeholder="input text" />
                </div>
                <div className="picker-group">

                    <input type="text" className="large-input" placeholder="input text" />
                    <input type="text" className="large-input" placeholder="input text" />
                </div>
                <div className="toggle-group">
                    <input type="text" className="large-input" placeholder="input text" />

                    <div className="half-width">
                        <button className="toggle">toggle</button>
                        <button className="toggle">toggle</button>
                    </div>
                </div>
                <div className="picker-group">

                    <input type="text" className="large-input" placeholder="input text" />
                    <input type="text" className="large-input" placeholder="input text" />
                </div>
                <div className="picker-group">

                    <input type="text" className="large-input" placeholder="input text" />
                    <input type="text" className="large-input" placeholder="input text" />
                </div>
            </div>
            <div className="right-section">
                <div className="picture-input">Picture input</div>
                <button className="button">Button</button>
                <input type="text" className="large-input" placeholder="input text" />
                <input type="text" className="large-input" placeholder="input text" />
                <input type="text" className="large-input" placeholder="input text" />
                <button className="button">Button</button>
            </div>
        </div>
    )
}

export default Register