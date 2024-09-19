const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
  //!State

  //!Function

  //!Render
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => React.useContext(AuthContext);
