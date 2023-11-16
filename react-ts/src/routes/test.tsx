// menu.cssの追加
import React from 'react';
import '@css/menu.css';

const Test = () => {
    return(
        <>
            <div>
                <nav className="menu">

                <input type="radio" name="nav-item" id="m-home"/><label htmlFor="m-home">Home</label>
                <input type="radio" name="nav-item" id="m-search"/><label htmlFor="m-search">Search</label>
                <input type="radio" name="nav-item" id="m-notification"/><label htmlFor="m-notification">Notification</label>
                <input type="radio" name="nav-item" id="m-favorites"/><label htmlFor="m-favorites">Favorites</label>
                <input type="radio" name="nav-item" id="m-profile"/><label htmlFor="m-profile">Profile</label>

                <div className="selector"></div>
                </nav>
            </div>
        </>
    )
}

export default Test;