import {createContext, RefObject, useContext} from 'react';
import {Toast} from 'primereact/toast';

export type ToastContextType = {
  toast: RefObject<Toast> | null
}

export const ToastContext = createContext<ToastContextType>({toast: null});

const useToast = (): ToastContextType => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('ToastContext Provider is required!');
  }
  return ctx;
};

export default useToast;
