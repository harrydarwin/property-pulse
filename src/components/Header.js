import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons'


const Header = () => {
    return (
        <header>
            <nav>
                <div className="container py-2">
                    <div className="d-flex justify-content-between">
                        <ul className="d-flex">
                            <li></li>
                            <li></li>
                        </ul>
                        <div className="login-box d-flex align-items-center">
                            <div className="login-text me-2"><p className='mb-0'>Login</p></div>
                            <div className="user-image"><FontAwesomeIcon icon={faUserAstronaut} /></div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header;