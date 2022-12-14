/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useLayoutEffect, useState } from 'react';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { Avatar, MenuProps } from 'antd';
import { Dropdown, Menu } from 'antd';
import MenuDivider from 'antd/lib/menu/MenuDivider';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/configStore';
import { User } from '../../redux/signin/types';
import { logOut } from '../../redux/signin/account';
import { ACCESS_TOKEN, USER_INFO, USER_LOGIN } from '../../utils/setting';
import {
  getLocationApi,
  LocationModel,
  searchLocationFilterApi,
} from '../../redux/reducer/locationReducer';

type Props = {
  handleOpenLogin: (value: boolean) => void;
};

type Screen = {
  width: number;
};

const renderUserDropdownMenu = (
  accessToken: string,
  user: User,
  openLogin: (a: true) => void,
  current: string,
  onClickItem: any
) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logOut());
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(USER_INFO);
    localStorage.removeItem(USER_LOGIN);
    navigate('/');
    window.location.reload();
  };

  return accessToken ? (
    <Dropdown
      overlayClassName='navbar__info-dropdown'
      overlay={
        <Menu
          selectedKeys={[current]}
          items={[
            {
              key: '1',
              label: (
                <NavLink to='/' className='register'>
                  Tin nhắn
                </NavLink>
              ),
            },
            {
              key: '2',
              label: (
                <NavLink to='/' onClick={() => openLogin(true)}>
                  Chuyến đi
                </NavLink>
              ),
            },
            {
              key: '3',
              label: (
                <NavLink to='/' onClick={() => openLogin(true)}>
                  Danh sách yêu thích
                </NavLink>
              ),
            },
            {
              key: '4',
              label: <MenuDivider />,
              className: 'dropdown__divider',
            },
            {
              key: '5',
              label: (
                <NavLink target='_blank' rel='noopener noreferrer' to='/'>
                  Cho thuê nhà
                </NavLink>
              ),
            },
            {
              key: '6',
              label: (
                <NavLink target='_blank' rel='noopener noreferrer' to='/'>
                  Tổ chức trải nghiệm
                </NavLink>
              ),
            },
            {
              key: '7',
              label: (
                <NavLink
                  to={`user/${user?.id}`}
                >
                  Tài khoản
                </NavLink>
              ),
            },
            {
              key: '8',
              label: <MenuDivider />,
              className: 'dropdown__divider',
            },
            {
              key: '9',
              label: (
                <NavLink target='_blank' rel='noopener noreferrer' to='/'>
                  Trợ giúp
                </NavLink>
              ),
            },
            {
              key: '10',
              label: (
                <NavLink
                  onClick={handleLogout}
                  rel='noopener noreferrer'
                  to='/'
                >
                  Đăng xuất
                </NavLink>
              ),
            },
          ]}
          onClick={onClickItem}
        />
      }
      placement='bottomRight'
      trigger={['click']}
    >
      <button className='btn-dropdown'>
        <div className='icon__left'>
          <img
            src={require('../../assets/icons/icon-menu.svg').default}
            alt='icon-menu'
            className='icon-menu'
          />
        </div>
        <div className='icon__right'>
          {/* <img
						src={user?.avatar || require("../../assets/icons/user.svg").default}
						alt='icon-user'
						className='icon-user'
					/> */}
          <Avatar
            size={30}
            src={user?.avatar || require('../../assets/icons/user.svg').default}
          />
        </div>
      </button>
    </Dropdown>
  ) : (
    <Dropdown
      overlayClassName='navbar__info-dropdown'
      overlay={
        <Menu
          selectedKeys={[current]}
          items={[
            {
              key: '1',
              label: (
                <NavLink to='/register' className='register'>
                  Đăng ký
                </NavLink>
              ),
            },
            {
              key: '2',
              label: (
                <NavLink to='#' onClick={() => openLogin(true)}>
                  Đăng nhập
                </NavLink>
              ),
            },
            {
              key: '3',
              label: <MenuDivider />,
              className: 'dropdown__divider',
            },
            {
              key: '4',
              label: (
                <NavLink target='_blank' rel='noopener noreferrer' to='/'>
                  Cho thuê nhà
                </NavLink>
              ),
            },
            {
              key: '5',
              label: (
                <NavLink target='_blank' rel='noopener noreferrer' to='/'>
                  Tổ chức trải nghiệm
                </NavLink>
              ),
            },
            {
              key: '6',
              label: (
                <NavLink target='_blank' rel='noopener noreferrer' to='/'>
                  Trợ giúp
                </NavLink>
              ),
            },
          ]}
          onClick={onClickItem}
        />
      }
      placement='bottomRight'
      trigger={['click']}
    >
      <button className='btn-dropdown'>
        <div className='icon__left'>
          <img
            src={require('../../assets/icons/icon-menu.svg').default}
            alt='icon-menu'
            className='icon-menu'
          />
        </div>
        <div className='icon__right'>
          <Avatar
            size={30}
            src={user?.avatar || require('../../assets/icons/user.svg').default}
          />
        </div>
      </button>
    </Dropdown>
  );
};

// eslint-disable-next-line no-empty-pattern
export default function Header({ handleOpenLogin }: Props) {
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [current, setCurrent] = useState<string>('1');
  const [keyword, setKeyword] = useState<string>('');
  const [screenX, setScreenX] = useState<Screen>({
    width: window.innerWidth,
  });
  const { accessToken, user } = useSelector(
    (state: RootState) => state.accountState.myAccount
  );
  const { arrLocation } = useSelector(
    (state: RootState) => state.locationReducer
  );
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [scrollPosition, setScrollPosition] = useState(0);

 
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };
  
  useLayoutEffect(() => {
    if (dropdown) {
      if (scrollPosition > 80) {
        setDropdown(false);
      }
    }
  }, [scrollPosition, dropdown]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };
  const onClickSearch = () => {
    setDropdown(true);
    handleScrollToTop();
  };
  const onSearch = (e: any) => {
    setKeyword(e.target.value);
    let keyword = e.target.value;
    if (keyword) {
      dispatch(searchLocationFilterApi(keyword));
    } else {
      dispatch(getLocationApi());
    }
  };
  const onSubmit = (e: any) => {
    e.preventDefault();
    console.log('search');
  };

  const renderResultLookup = () => {
    if (arrLocation == '') {
      return (
        <div className='result-item'>
          <div className='result-icon'>
            <i className='fa fa-location-arrow' aria-hidden='true'></i>
          </div>
          <div className='result-location'>
            <div className='text-location'>Không tìm thấy kết quả</div>
          </div>
        </div>
      );
    }
    return arrLocation?.map((item: LocationModel, index: number) => {
      return (
        <div
          className='result-item'
          onClick={() => {
            // <Navigate to={`/location/${item.id}`}/>
            navigate(`/location/${item.id}`);
            setDropdown(false);
          }}
          key={index}
        >
          <div className='result-icon'>
            <i className='fa fa-location-arrow' aria-hidden='true'></i>
          </div>
          <div className='result-location'>
            <div className='text-location'>{item.tenViTri}</div>
          </div>
        </div>
      );
    });
  };

  useEffect(() => {
    let resizeFunction = () => {
      setScreenX({
        width: window.innerWidth,
      });
    };
    window.onresize = resizeFunction;
    return () => {
      window.removeEventListener('resize', resizeFunction);
    };
  }, []);

  useEffect(() => {
    dispatch(getLocationApi());
  }, [dropdown]);

  return (
    <div className='header'>
      {dropdown ? (
        <div className='wrapper__header'>
          <header id='header' className='header__dropdown'>
            <div className='navbar__wrapper'>
              <div className='container'>
                <div className='navbar__content'>
                  <div className='navbar__icon'>
                    <div className='navbar__brand'>
                      <div className='navbar__brand-wrapper'>
                        <NavLink to='/'>
                          <img
                            src={require('../../assets/icons/logo.svg').default}
                            alt='icon-brand'
                            className='icon__brand'
                          />
                        </NavLink>
                      </div>
                    </div>
                  </div>
                  <div
                    className={
                      screenX.width > 768
                        ? 'search__dropdown'
                        : 'search__dropdown d-none'
                    }
                  >
                    <div className='search__dropdown-wrapper'>
                      <div className='search__dropdown-cover'>
                        <div className='search__dropdown-tab'>
                          <div className='tab__list-wrapper'>
                            <div className='tab__list-content'>
                              <div className='tab__list-left'>
                                <button className='btn__tab-left'>
                                  <div className='label'>
                                    <span className='place'>Chỗ ở</span>
                                  </div>
                                </button>
                                <button className='btn__tab-right'>
                                  <div className='label'>
                                    <span className='experience'>
                                      Trải nghiệm
                                    </span>
                                  </div>
                                </button>
                              </div>
                              <div className='tab__list-right'>
                                <button className='btn__tab-item'>
                                  <div className='label'>
                                    <span className='experience__online'>
                                      Trải nghiệm trực tuyến
                                    </span>
                                  </div>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <form
                          className='search__dropdown-form'
                          onSubmit={onSubmit}
                        >
                          <div className='search__dropdown-form-wrapper'>
                            <div className='form__btn-place'>
                              <div className='form__btn-wrapper'>
                                <label className='form__btn-label'>
                                  <div className='form__btn-content'>
                                    <div className='text'>Địa điểm</div>
                                    <input
                                      type='text'
                                      className='input-search'
                                      placeholder='Tìm kiếm điểm đến'
                                      id='bigsearch-query-location-input'
                                      value={keyword}
                                      onChange={onSearch}
                                    />
                                  </div>
                                </label>
                                <div className='form__btn-result'>
                                  <div className='form__btn-result-wrapper'>
                                    <div className='form__btn-result-cover'>
                                      <div className='form__btn-result-content'>
                                        <div className='result-list'>
                                          {renderResultLookup()}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className='search__divider'></div>
                            <div className='form__btn-date-picker'>
                              <div className='form__btn-wrapper'>
                                <div className='form__btn-receive'>
                                  <span className='text'>Nhận phòng</span>
                                  <span className='sub-text'>Thêm ngày</span>
                                </div>
                                <div className='search__divider'></div>
                                <div className='form__btn-pay'>
                                  <span className='text'>Trả phòng</span>
                                  <span className='sub-text'>Thêm ngày</span>
                                </div>
                              </div>
                            </div>
                            <div className='search__divider'></div>
                            <div className='form__btn-guest'>
                              <div className='form__btn-wrapper'>
                                <div className='form__btn-content'>
                                  <label className='label__btn'>
                                    <div className='text'>Khách</div>
                                    <div className='sub-text'>Thêm khách</div>
                                  </label>
                                  <button
                                    className='button-search'
                                    type='submit'
                                  >
                                    <div className='icon-search'>
                                      <i
                                        className='fa fa-search'
                                        aria-hidden='true'
                                      ></i>
                                    </div>
                                    <div className='text-btn-search'>
                                      Tìm kiếm
                                    </div>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className='navbar__info'>
                    <div className='navbar__info-wrapper'>
                      <div className='navbar__info-content'>
                        <div className='navbar__info-left'>
                          <div className='owned__nav-link'>
                            <NavLink to='/'>Trở thành chủ nhà</NavLink>
                          </div>
                          <div className='lang__nav-link'>
                            <img
                              src={
                                require('../../assets/icons/global.svg').default
                              }
                              alt='icon-lang'
                              className='icon-lang'
                            />
                          </div>
                        </div>
                        <div className='navbar__info-right'>
                          {renderUserDropdownMenu(
                            accessToken,
                            user,
                            handleOpenLogin,
                            current,
                            onClick
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <div
            className='navbar__search-cover'
            onClick={() => {
              setDropdown(false);
            }}
          ></div>
        </div>
      ) : (
        <header id='header'>
          <div className='navbar__wrapper'>
            <div className='container'>
              <div className='navbar__content'>
                <div className='navbar__icon'>
                  <div className='navbar__brand'>
                    <div className='navbar__brand-wrapper'>
                      <NavLink to='/'>
                        <img
                          src={require('../../assets/icons/logo.svg').default}
                          alt='icon-brand'
                          className='icon__brand'
                        />
                      </NavLink>
                    </div>
                  </div>
                </div>
                <div
                  className={
                    screenX.width > 768
                      ? 'navbar__search'
                      : 'navbar__search d-none'
                  }
                >
                  <div className='navbar__search-wrapper'>
                    <div className='navbar__search-content'>
                      <div className='navbar__search-left'>
                        <button
                          className='btn__search-left'
                          onClick={onClickSearch}
                        >
                          <div className='btn__label'>Địa điểm bất kỳ</div>
                        </button>
                      </div>
                      <span className='divider'></span>
                      <div className='navbar__search-center'>
                        <button
                          className='btn__search-center'
                          onClick={onClickSearch}
                        >
                          <div className='btn__label'>Tuần bất kỳ</div>
                        </button>
                      </div>
                      <span className='divider'></span>
                      <div className='navbar__search-right'>
                        <button
                          className='btn__search-right'
                          onClick={onClickSearch}
                        >
                          <div className='btn__label'>Thêm khách</div>
                          <div className='btn__icon'>
                            <i
                              className='fa fa-search'
                              aria-hidden='true'
                              id='icon-search'
                            ></i>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='navbar__info'>
                  <div className='navbar__info-wrapper'>
                    <div className='navbar__info-content'>
                      <div className='navbar__info-left'>
                        <div className='owned__nav-link'>
                          <NavLink to='/'>Trở thành chủ nhà</NavLink>
                        </div>
                        <div className='lang__nav-link'>
                          <img
                            src={
                              require('../../assets/icons/global.svg').default
                            }
                            alt='icon-lang'
                            className='icon-lang'
                          />
                        </div>
                      </div>
                      <div className='navbar__info-right'>
                        {renderUserDropdownMenu(
                          accessToken,
                          user,
                          handleOpenLogin,
                          current,
                          onClick
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      )}
    </div>
  );
}
