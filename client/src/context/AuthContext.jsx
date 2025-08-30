
// import { createContext, useState, useEffect } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [auth, setAuth] = useState(null); // { user, token }

//   // 🔹 Load from localStorage on first render
//   useEffect(() => {
//     const stored = localStorage.getItem("auth");
//     if (stored) {
//       try {
//         setAuth(JSON.parse(stored));
//       } catch {
//         localStorage.removeItem("auth");
//       }
//     }
    
//   }, []);

//   // 🔹 Sync whenever auth changes
//   useEffect(() => {
//     if (auth?.token) {
//       localStorage.setItem("auth", JSON.stringify(auth));
//     } else {
//       localStorage.removeItem("auth");
//     }
//   }, [auth]);

//   // logout helper
//   const logout = () => {
//     setAuth(null);
//     localStorage.removeItem("auth");
//   };

//   return (
//     <AuthContext.Provider value={{ auth, setAuth, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null); // { user, token }
  const [loading, setLoading] = useState(true); // ✅ new loading state

  // 🔹 Load from localStorage on first render
  useEffect(() => {
    const stored = localStorage.getItem("auth");
    if (stored) {
      try {
        setAuth(JSON.parse(stored));
      } catch {
        localStorage.removeItem("auth");
      }
    }
    setLoading(false); // ✅ done loading
  }, []);

  // 🔹 Sync whenever auth changes
  useEffect(() => {
    if (auth?.token) {
      localStorage.setItem("auth", JSON.stringify(auth));
    } else {
      localStorage.removeItem("auth");
    }
  }, [auth]);

  // logout helper
  const logout = () => {
    setAuth(null);
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
