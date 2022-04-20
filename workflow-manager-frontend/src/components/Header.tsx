import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { SocialIcon } from 'react-social-icons';
import Flag from 'react-world-flags';
import { Navbar, Nav, NavItem } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';

import '../scss/root.scss';
import '../scss/Navbar.scss';
import { setLang } from '../Middleware/actions';
export interface NavBarDataProps {
  title_FR: string;
  title_EN: string;
  link: string;
  className?: string;
  activeClassName?: string;
}

export const HeaderNavigationIntels: NavBarDataProps[] = [
  { title_FR: 'Acceuil', title_EN: 'Home', link: '/' },
  { title_FR: ' Designer', title_EN: 'Designer', link: '/designer' },
  { title_FR: ' Historique', title_EN: 'History', link: '/history' },
  { title_FR: 'Informations', title_EN: 'Data', link: '/infos' },
  { title_FR: 'Tutoriel', title_EN: 'Tutorial', link: '/tutorial' },
  { title_FR: 'Utilisateur', title_EN: 'User', link: '/user' },
  { title_FR: 'Options', title_EN: 'Options', link: '/options' },
];

const Header: FC<any> = (): JSX.Element => {
  const langage = useSelector((state: any) => state.lang);
  const { lang } = langage;
  const dispatch = useDispatch();
  const linkedin_url = 'https://linkedin.com/in/youri-choucoutou-690522142';
  const mail_url =
    'https://mail.google.com/mail/?view=cm&fs=1&to=youri.choucoutou@gmail.com';
  console.log('langage', langage);
  return (
    <header className='navbar'>
      <Navbar>
        <Nav
          style={{
            listStyleType: 'none',
            display: 'flex',
          }}
        >
          {lang === 'FR'
            ? HeaderNavigationIntels.map(
                (nav: NavBarDataProps, index: number) => (
                  <NavItem key={index} className='navitem'>
                    <NavLink
                      className='navlink hoverable big-title'
                      to={nav.link}
                    >
                      {nav.title_FR}
                    </NavLink>
                  </NavItem>
                )
              )
            : HeaderNavigationIntels.map(
                (nav: NavBarDataProps, index: number) => (
                  <NavItem key={index} className='navitem'>
                    <NavLink
                      className='navlink hoverable big-title'
                      to={nav.link}
                    >
                      {nav.title_EN}
                    </NavLink>
                  </NavItem>
                )
              )}
          <NavItem className='navitem hoverable'>
            <SocialIcon
              url={linkedin_url}
              className='icon'
              target='_blank'
              fgColor='#fff'
              style={{ height: 42, width: 42 }}
            />
          </NavItem>
          <NavItem className='navitem hoverable'>
            <SocialIcon
              url={mail_url}
              className='icon'
              target='_blank'
              fgColor='#fff'
              style={{ height: 42, width: 42 }}
            />
          </NavItem>
          <NavItem className='navitem hoverable'>
            <Flag
              style={{ verticalAlign: 'middle' }}
              onClick={() => dispatch(setLang(lang === 'FR' ? 'GBR' : 'FR'))}
              code={lang === 'FR' ? 'GBR' : 'FR'}
              height='22'
            />
          </NavItem>
        </Nav>
      </Navbar>
    </header>
  );
};

export default Header;
