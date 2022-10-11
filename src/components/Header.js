import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons'
import $ from 'jquery';
import { logout } from './firebase';


function LogoutButton({updateCurrentUser}) {
  return <li><button className="dropdown-item" type="button" onClick={() => logout(updateCurrentUser(false))}>Logout</button></li>;
}
function LoginButton() {
    return <li><button className="dropdown-item" type="button" onClick={() => {
       const card = $('.card-container');
       card.addClass('shake-me');
       card.on('animationend', function() {
           card.removeClass('shake-me')
       })
    }}>Login</button></li>;
  }

const Header = ({userName, isUser, updateCurrentUser}) => {
    let logButton;
    if(isUser){
        logButton = <LogoutButton updateCurrentUser={updateCurrentUser}/>
    }   else {
        logButton = <LoginButton />
    }
    return (
        <header>
            <nav>
                <div className="container py-2">
                    <div className="d-flex justify-content-between">
                        <ul className="d-flex">
                            <li></li>
                            <li></li>
                        </ul>
                        <div className="dropdown">
                            <div className="login-box d-flex align-items-center" data-bs-toggle="dropdown" aria-expanded="false">
                                <div className="login-text me-2"><p className='mb-0'>{userName ? 'Hello, ' + userName : 'Login'}</p></div>
                                <div className="user-image"><FontAwesomeIcon icon={faUserAstronaut} /></div>
                            </div>
                            <ul className="dropdown-menu nav-dropdown w-100">
                                <li><button className="dropdown-item" type="button">Action</button></li>
                                <li><button className="dropdown-item" type="button">Another action</button></li>
                                {logButton}
                            </ul>
                        </div>

                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header;