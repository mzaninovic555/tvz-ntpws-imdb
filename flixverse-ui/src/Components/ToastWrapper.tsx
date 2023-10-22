import {JSXChildrenProps} from '../@types';
import {useRef} from 'react';
import {Toast} from 'primereact/toast';
import {ToastContext} from '../common/context/ToastContext.ts';

const ToastWrapper = (props: JSXChildrenProps) => {
  const toast = useRef<Toast>(null);

  return (
    <>
      <Toast style={{zIndex: '10000'}} ref={toast} />
      <ToastContext.Provider value={{toast: toast}}>
        {props.children}
      </ToastContext.Provider>
    </>
  );
};

export default ToastWrapper;
