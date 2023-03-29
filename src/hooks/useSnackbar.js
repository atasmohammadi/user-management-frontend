import { createContext, useContext, useState } from 'react';

import SnackbarComponent from '../components/snackbar';

const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [severity, setSeverity] = useState('success');

  const showSnackbar = (text, severity = 'success') => {
    setText(text);
    setSeverity(severity);
    setOpen(true);
  };

  const hideSnackbar = () => setOpen(false);

  return (
    <SnackbarContext.Provider
      value={{
        showSnackbar,
        hideSnackbar,
      }}
    >
      <SnackbarComponent open={open} setOpen={setOpen} text={text} severity={severity} />
      {children}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => useContext(SnackbarContext);
