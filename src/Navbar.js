import React, { useState, useRef, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { links, social } from "./data";
import logo from "./logo.svg";

const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false);
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);

  useEffect(() => {
    //get element height dynamically
    const linksHeight = linksRef.current.getBoundingClientRect().height;

    //set links container's height (show/hide)
    if (showLinks) {
      linksContainerRef.current.style.height = `${linksHeight}px`;
    } else {
      linksContainerRef.current.style.height = `0px`;
    }
  }, [showLinks]);

  return (
    <nav>
      <div className="nav-center">
        {/*small screen nav */}
        <div className="nav-header">
          <img src={logo} alt="logo" className="logo" />
          <button
            className="nav-toggle"
            onClick={() => setShowLinks(!showLinks)}
          >
            <FaBars />
          </button>
        </div>
        {/*larg screens nav*/
        /*
        setting a ternary operator(condition? true:false) to show/hide is ok but we can't use animation with it, as we are mounting and unmounting the element. Instead we use JS to dynamically add inline styles that show/hides the element with animation
        */}
        <div
          className="links-container"
          /* if we use interpolation to add/remove the show class, the height must be hard coded and NOT auto to work. also, this creates an issue when links list grows as the height is hard coded and won't exapnd accordingly */

          /*this parent container is required to adjust the height according to the list. we get the list height from the ul below then set the height of the parent(this div) to be the height of the links.*/

          ref={linksContainerRef}
        >
          <ul className="links" ref={linksRef}>
            {links.map((link) => {
              const { id, url, text } = link;
              return (
                <li key={id}>
                  <a href={url}>{text}</a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="social-icons">
          <ul className="links">
            {social.map((item) => {
              const { id, url, icon } = item;
              return (
                <li key={id}>
                  <a href={url}>{icon}</a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
