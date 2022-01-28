import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  changeValue,
  selectValue,
  selectList,
  addressesAsync,
  sendAsync,
  changeListVisible,
  selectListVisible,
} from './addressSlice';
import './Address.css';

export function Address() {
  const value = useSelector(selectValue);
  const list = useSelector(selectList);
  const isListVisible = useSelector(selectListVisible);
  const isValid =
    value === '' ||
    (value !== '' && list.length > 1) ||
    (value !== '' && list.length === 1 && list[0].name === value);

  const dispatch = useDispatch();
  const loadAddresses = () => dispatch(addressesAsync());
  const sendAddress = (addr) => dispatch(sendAsync(addr));

  const changeVisible = (e) => {
    if (value === '' || list.length === 0) {
      dispatch(changeListVisible(false));
    }
  };

  const chooseAddress = (addr) => {
    dispatch(changeValue(addr));
    dispatch(changeListVisible(false));
    sendAddress(addr);
  };

  useEffect(() => {
    loadAddresses();
  }, []);

  return (
    <div className='address-wrapper' onClick={changeVisible}>
      <label>Адрес:</label>
      <div className='address-select-wrapper'>
        <div className={'address-select ' + (value === '' ? 'empty' : '') + (isValid ? '' : 'error')}>
          <input
            type='search'
            value={value}
            onChange={(e) => dispatch(changeValue(e.target.value))}
            onFocus={(e) => dispatch(changeListVisible(true))}
            onClick={(e) => e.stopPropagation()}
          />
        </div>

        <ul className={'address-list ' + (isListVisible ? 'fadein' : 'fadeout')}>
          {list.length === 0 && value === '' && <div>loading...</div>}
          {list.map((x) => (
            <li className='address-item' key={x.id} onClick={() => chooseAddress(x.name)}>
              {x.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
