"use client"
import React, {useState} from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {Path} from "@/utils/enum";
import Image from "next/image";
import {signOut} from "next-auth/react";

const NavBar = () => {

    const baseUrl = `${process.env.NEXT_PUBLIC_BASE_PATH}`;
    const pathname = usePathname();

    const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage mobile menu visibility

    // Function to open the menu
    const openMenu = () => setIsMenuOpen(true);

    // Function to close the menu
    const closeMenu = () => setIsMenuOpen(false);


    const handleLogout = () => {
        if (confirm("Do you really want to Logout?")) {
            signOut();
        }
    }

    return (
        <nav className="navbar">
            {/* Logo */}
            <a href="/" className="navbar-logo">
                <Image
                    src={`${baseUrl}/asset/icon/home-icon.svg`}
                    alt="Logo"
                    width={30}
                    height={30}
                    className="img-banner mx-auto"
                    priority
                />
            </a>

            {/* Full Menu for Desktop */}
            <ul className="navbar-menu">
                <li className="navbar-item">
                    <Link href="/" className={pathname === '/' ? 'cur_act' : ''}>
                        <svg className="ks_img svg-icon" xmlns="http://www.w3.org/2000/svg" fill="#FFFFFFFF"
                             viewBox="0 0 20 20">
                            <path
                                d="M7.82 19.762l-0.113-0.026c-0.139-0.031-0.21-0.049-0.281-0.068l0.069 0.016 0.326 0.078c-0.451-0.101-0.826-0.211-1.191-0.342l0.069 0.022-0.068-0.024c-0.299-0.106-0.526-0.199-0.748-0.3l0.062 0.025-0.066-0.030c-0.986-0.452-1.833-1.016-2.579-1.691l0.009 0.008c-0.602-0.542-1.131-1.146-1.581-1.808l-0.022-0.034-0.052-0.082c-0.866-1.293-1.443-2.847-1.604-4.524l-0.003-0.040-0.002 0.001c-0.028-0.282-0.045-0.609-0.045-0.941 0-0.279 0.012-0.555 0.034-0.828l-0.002 0.036 0.012-0.122c0.132-1.437 0.551-2.751 1.199-3.92l-0.026 0.051 0.038-0.070c0.156-0.281 0.295-0.506 0.441-0.724l-0.023 0.037 0.063-0.092c0.235-0.347 0.49-0.676 0.764-0.986 0.908-1.023 2.007-1.854 3.246-2.439l0.061-0.026 0.22-0.098 0.012-0.005c0.093-0.040 0.187-0.080 0.282-0.117l-0.294 0.122c1.165-0.519 2.524-0.821 3.954-0.821 0.135 0 0.268 0.003 0.402 0.008l-0.019-0.001-0.364-0.007c0.777 0.001 1.534 0.088 2.261 0.254l-0.068-0.013c0.683 0.155 1.277 0.354 1.843 0.605l-0.063-0.025 0.22 0.098c1.3 0.611 2.399 1.442 3.297 2.456l0.009 0.011v-0.002c0.476 0.537 0.901 1.138 1.257 1.784l0.026 0.051c0.623 1.118 1.043 2.433 1.173 3.831l0.003 0.039 0.008 0.12c0.020 0.239 0.032 0.518 0.032 0.799 0 1.874-0.517 3.628-1.417 5.126l0.025-0.045h0.002c-0.083 0.142-0.17 0.281-0.26 0.418-0.020 0.026-0.037 0.053-0.056 0.080-0.532 0.786-1.142 1.464-1.834 2.048l-0.015 0.012c-0.671 0.569-1.435 1.060-2.26 1.441l-0.062 0.026-0.066 0.029c-0.225 0.1-0.453 0.192-0.686 0.275l-0.068 0.024c-0.298 0.11-0.673 0.22-1.057 0.308l-0.065 0.012c-0.655 0.152-1.407 0.239-2.179 0.239s-1.525-0.087-2.247-0.252l0.068 0.013zM13.076 1.54l-2.451 1.96c-0.17 0.137-0.388 0.219-0.625 0.219-0.193 0-0.373-0.054-0.525-0.149l0.004 0.002-0.104-0.073-2.45-1.96c-1.629 0.605-2.989 1.612-4.004 2.904l-0.015 0.019 1.107 2.934c0.041 0.105 0.065 0.226 0.065 0.353 0 0.303-0.135 0.575-0.348 0.758l-0.001 0.001-0.101 0.076-2.62 1.724c0.060 1.771 0.625 3.399 1.555 4.758l-0.020-0.031 3.133-0.146c0.014-0.001 0.030-0.001 0.047-0.001 0.414 0 0.769 0.251 0.921 0.61l0.002 0.007 0.040 0.12 0.83 3.026c0.743 0.221 1.596 0.348 2.478 0.348 0.002 0 0.005 0 0.007 0h-0c0.002 0 0.004 0 0.007 0 0.883 0 1.736-0.127 2.542-0.364l-0.064 0.016 0.83-3.026c0.112-0.402 0.459-0.698 0.88-0.733l0.004-0 0.126-0.002 3.133 0.146c0.91-1.328 1.474-2.956 1.534-4.712l0-0.015-2.619-1.724c-0.273-0.181-0.45-0.488-0.45-0.835 0-0.083 0.010-0.163 0.029-0.239l-0.001 0.007 0.037-0.12 1.107-2.935c-1.030-1.311-2.391-2.319-3.958-2.904l-0.062-0.020zM10.589 6.428l2.628 1.91c0.251 0.184 0.412 0.478 0.412 0.809 0 0.111-0.018 0.217-0.051 0.316l0.002-0.007-1.004 3.090c-0.134 0.404-0.509 0.691-0.951 0.691h-3.249c-0.442-0-0.817-0.287-0.949-0.684l-0.002-0.007-1.004-3.090c-0.031-0.092-0.049-0.199-0.049-0.309 0-0.331 0.161-0.625 0.409-0.807l0.003-0.002 2.628-1.91c0.163-0.119 0.367-0.191 0.588-0.191s0.425 0.072 0.591 0.193l-0.003-0.002z">
                            </path>
                        </svg>
                        <span>Home</span>
                    </Link>
                </li>
                <li className="navbar-item">
                    <Link href={Path.RESULT} className={pathname === Path.RESULT ? 'cur_act' : ''}>Results</Link>
                </li>
                <li className="navbar-item">
                    <Link href={Path.TABLE} className={pathname === Path.TABLE ? 'cur_act' : ''}>
                        <svg className="icon flat-color ks_img svg-icon" fill="#000000" width="800px" height="800px"
                             viewBox="0 0 24 24" id="align-center-square-2" data-name="Flat Color"
                             xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                            <g id="SVGRepo_iconCarrier">
                                <rect id="primary" x="2" y="2" width="20" height="20" rx="2"
                                      style={{fill: '#fill: #ffffff'}}/>
                                <path id="secondary"
                                      d="M15,17H9a1,1,0,0,1,0-2h6a1,1,0,0,1,0,2Zm0-4H9a1,1,0,0,1,0-2h6a1,1,0,0,1,0,2Zm2-4H7A1,1,0,0,1,7,7H17a1,1,0,0,1,0,2Z"
                                      style={{fill: '#141b30'}}/>
                            </g>
                        </svg>
                        Tables
                    </Link>
                </li>
                <li className="navbar-item">
                    <Link href={Path.CLUB} className={pathname === Path.CLUB ? 'cur_act' : ''}>
                        <svg className="icon flat-color ks_img svg-icon" width="800px" height="800px"
                             viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg"
                             aria-hidden="true" role="img"
                             preserveAspectRatio="xMidYMid meet" fill="#ff6b00">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"/>

                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>

                            <g id="SVGRepo_iconCarrier">

                                <path fill="#ffffff" className="svg-icon"
                                      d="M35.858 17.376L.079 17.053v11.821c.011 1.084 1.009 2.12 2.52 3.028l2.396 1.133c.732.278 1.531.534 2.393.766l3.585.762c.791.127 1.615.232 2.46.32l9.328.088a43.678 43.678 0 0 0 2.524-.285l3.57-.707a24.447 24.447 0 0 0 2.378-.73l2.374-1.098c1.507-.893 2.262-1.923 2.251-3.013V17.376z"/>

                                <path fill="#ffffff" className="svg-icon"
                                      d="M22.885 30.848c-.043-4.36-2.19-5.47-4.825-5.493c-2.634-.024-4.759 1.047-4.716 5.407c.016 1.606.046 2.96.089 4.12c1.504.156 3.079.254 4.712.269c1.6.014 3.141-.054 4.616-.18c.097-1.003.142-2.341.124-4.123zM10.917 28.89l.001.107l.003.364l.003.271l.001.065c.001.052 0 .044 0 0l-.001-.065l-.003-.271l-.003-.364l-.001-.107l-.001-.122c-.022-2.18-3.61-3.303-3.589-1.122v.037l.002.204l.002.158l.005.47l.001.067l.051 5.218c1.106.297 2.302.556 3.585.762l-.056-5.753v.081zm17.878-.992l.005.506v.027l.003.27c.001.118.001.15 0 0l-.003-.27v-.027l-.005-.506l-.001-.058c-.022-2.18-3.589-1.123-3.567 1.057v.036l.057 5.753a34.49 34.49 0 0 0 3.57-.707l-.06-6.1l.001.019zM4.931 26.534c-.022-2.18-2.417-3.292-2.396-1.112v.041l.063 6.439c.676.406 1.483.785 2.396 1.133l-.052-5.321c.003.208.006.582-.011-1.18zm26.237.237l.012 1.137v-.047v.047l.053 5.34c.906-.334 1.705-.701 2.374-1.098l-.064-6.448c-.021-2.18-2.396-1.111-2.375 1.069zM2.972 5.225a.5.5 0 0 0-.5.5v12.37a.5.5 0 0 0 1 0V5.725c0-.277-.223-.5-.5-.5z"/>

                                <path fill="#ffffff" className="svg-icon"
                                      d="M3.207 5.936c1.478.269 3.682 1.102 4.246 1.424c.564.322.215.484-.322.725c-.538.242-3.441 1.021-3.87 1.102c-.431.082-.054-3.251-.054-3.251z"/>

                                <path fill="#ffffff" className="svg-icon"
                                      d="M11.969 2.976a.5.5 0 0 0-.5.5v12.37a.5.5 0 0 0 1 0V3.476a.5.5 0 0 0-.5-.5z"/>

                                <path fill="#ffffff" className="svg-icon"
                                      d="M12.203 3.687c1.478.269 3.682 1.102 4.247 1.425c.564.322.215.484-.322.725c-.538.242-3.44 1.021-3.87 1.102c-.432.081-.055-3.252-.055-3.252z"/>

                                <path fill="#ffffff" className="svg-icon"
                                      d="M21.339 2.976a.5.5 0 0 0-.5.5v12.37a.5.5 0 0 0 1 0V3.476a.5.5 0 0 0-.5-.5z"/>

                                <path fill="#ffffff" className="svg-icon"
                                      d="M21.574 3.687c1.478.269 3.681 1.102 4.246 1.425c.564.322.215.484-.322.725c-.537.242-3.44 1.021-3.871 1.102c-.431.081-.053-3.252-.053-3.252z"/>

                                <path fill="#ffffff" className="svg-icon"
                                      d="M30.335 5.225a.5.5 0 0 0-.5.5v12.37a.5.5 0 0 0 1 0V5.725a.5.5 0 0 0-.5-.5z"/>

                                <path fill="#ffffff" className="svg-icon"
                                      d="M30.57 5.936c1.478.269 3.681 1.102 4.246 1.425c.564.322.215.484-.322.725c-.537.242-3.44 1.021-3.871 1.102c-.43.081-.053-3.252-.053-3.252z"/>

                                <path fill="#E9EFF3" className="svg-icon"
                                      d="M35.858 17.444c.033 3.312-7.949 5.924-17.829 5.835C8.148 23.19.112 20.431.08 17.121c-.033-3.312 7.95-5.924 17.83-5.835c9.879.09 17.915 2.847 17.948 6.158z"/>

                                <path fill="#141b30"
                                      d="M33.257 18.209c.029 2.995-6.788 5.361-15.226 5.286c-8.44-.077-15.305-2.567-15.334-5.562c-.029-2.994 6.787-5.36 15.227-5.284c8.437.077 15.304 2.566 15.333 5.56z"/>

                                <path fill="#E9EFF3" className="svg-icon"
                                      d="M26.766 19.378l5.83-3.939l-1.8-1.106s-3.63 3.394-4.822 4.548c-.876-.455-2.073-.837-3.486-1.104l2.439-5.303l-2.463-.294l-1.094 5.419a26.979 26.979 0 0 0-3.401-.244a27.665 27.665 0 0 0-2.671.106l-1.183-5.357l-2.457.251l2.491 5.235c-1.64.226-3.037.604-4.036 1.085c-1.271-1.227-4.847-4.573-4.847-4.573l-1.778 1.074l5.814 3.98c-.541.397-.847.84-.843 1.311c.018 1.766 4.303 3.237 9.573 3.285c5.268.048 9.527-1.346 9.51-3.113c-.004-.445-.281-.872-.776-1.261z"/>

                                <path fill="#ffffff" className="svg-icon"
                                      d="M26.427 20.862c.013 1.321-3.732 2.357-8.363 2.315c-4.631-.042-8.396-1.146-8.409-2.467c-.013-1.32 3.731-2.356 8.362-2.314c4.63.041 8.396 1.146 8.41 2.466z"/>

                            </g>
                        </svg>
                        Clubs
                    </Link>
                </li>
            </ul>

            {/* Navbar Actions (Sign in and Search) */}
            <div className="navbar-actions">
                <Link href={Path.LOGIN} className="sign-in-button">Sign in</Link>
                <span className="search-icon">
                    <svg width={25} height={25} viewBox="0 0 24 24" fill="#ffffff"
                         xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M4 11C4 7.13401 7.13401 4 11 4C14.866 4 18 7.13401 18 11C18 14.866 14.866 18 11 18C7.13401 18 4 14.866 4 11ZM11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C13.125 20 15.078 19.2635 16.6177 18.0319L20.2929 21.7071C20.6834 22.0976 21.3166 22.0976 21.7071 21.7071C22.0976 21.3166 22.0976 20.6834 21.7071 20.2929L18.0319 16.6177C19.2635 15.078 20 13.125 20 11C20 6.02944 15.9706 2 11 2Z"
                              fill="#ffffff"/>
                    </svg>
                </span>
                <span className="menu-icon" onClick={openMenu}>☰</span>
            </div>
            <button onClick={handleLogout}>Log Out</button>
            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
                    <ul>
                        <button className="close-btn" onClick={closeMenu}>X</button>
                        {/* Close Button */}
                        <li><Link href="/" onClick={closeMenu}>Home</Link></li>
                        <li><Link href={Path.RESULT} onClick={closeMenu}>Results</Link></li>
                        <li><Link href={Path.TABLE} onClick={closeMenu}>Tables</Link></li>
                        <li><Link href={Path.CLUB} onClick={closeMenu}>Clubs</Link></li>
                    </ul>
                </div>
            )}
        </nav>
    )

};

export default NavBar;