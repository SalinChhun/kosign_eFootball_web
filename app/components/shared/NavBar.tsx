import React from 'react';
import Link from 'next/link';

const NavBar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link href="/">
                    We-Football
                </Link>
                <ul className="navbar-menu">
                    <li className="navbar-item">
                        <Link href="/scores">
                            Scores
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link href="/products">
                            Favorites
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link href="/about">
                            About
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link href="/about">
                            Manages
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;