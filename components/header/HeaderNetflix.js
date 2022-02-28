import React, { useRef, useState } from "react";
import Image from "next/image";
import useOutsideAlerter from "../../hooks/useOutsideAlerter";
import Link from "next/link";

function HeaderNetflix() {
  const [isSearch, setIsSearch] = useState(false);

  const handleCloseSearch = () => {
    setIsSearch(false);
  };

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, handleCloseSearch);

  return (
    <header className="header--layout">
      <div className="div-left-header">
        <Link href="/">
          <Image
            className="logo-net"
            src="/Netflixlogo.svg"
            alt="Netflix Logo"
            width={90}
            height={50}
          />
        </Link>
        <ul>
          <li>
            <Link href="/list">Ma liste</Link>
          </li>
        </ul>
      </div>
      <div className="div-right-header">
        <ul>
          <li className={isSearch ? `img search search-w-input` : "img search"}>
            {!isSearch && (
              <Image
                src="/search-svg.svg"
                alt="Netflix profile pic"
                layout="fill"
                objectFit="contain"
                onClick={() => {
                  setIsSearch(!isSearch);
                }}
              />
            )}
            {isSearch && (
              <div ref={wrapperRef} className="scale-in-right">
                <input type="text" placeholder="recherche"></input>
              </div>
            )}
          </li>
          <Link href="/compte">
            <li className="img">
              <Image
                src="/profile-netflix.jpg"
                alt="Netflix profile pic"
                layout="fill"
                objectFit="contain"
              />
            </li>
          </Link>
        </ul>
      </div>
    </header>
  );
}

export default HeaderNetflix;
