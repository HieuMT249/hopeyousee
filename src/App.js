import React, { useState, useEffect } from "react";
import { faArrowRight, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [isLoginCorrect, setIsLoginCorrect] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isClick, setClick] = useState(true);
  const [isChuc, setChuc] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const [fileContent, setFileContent] = useState("");
  const [fileContent1, setFileContent1] = useState("");
  const [fileContent2, setFileContent2] = useState("");

  useEffect(() => {
    const fetchFileContent = async () => {
      try {
        const response = await fetch(process.env.PUBLIC_URL + "/content.txt");
        const response1 = await fetch(process.env.PUBLIC_URL + "/content1.txt");
        const response2 = await fetch(process.env.PUBLIC_URL + "/content2.txt");
        const content = await response.text();
        const content1 = await response1.text();
        const content2 = await response2.text();
        setFileContent(content);
        setFileContent1(content1);
        setFileContent2(content2);
        setIsInitialLoad(false);
      } catch (error) {
        console.error("Error fetching file:", error);
      }
    };

    if (isInitialLoad || isClick) {
      fetchFileContent();
    }
  }, [isInitialLoad, isClick]);

  const handleLogin = () => {
    if (password === "24092002") {
      setIsLoginCorrect(true);
    } else {
      setIsLogin(false);
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRetry = () => {
    setIsLogin(true);
    setPassword("");
  };

  const handleClick = () => {
    setClick(!isClick);
  };

  const handleChuc = () => {
    setChuc(!isChuc);
  };

  return (
    <div className="App">
      {/* Đăng nhập */}
      {isLoginCorrect ? (
        <div id="home">
          <div className="wrapper">
            {isChuc ? (
              <div className="container">
                {isClick ? (
                  <>
                    <pre className={isClick ? "content" : "content hidden"}>
                      {!isInitialLoad && fileContent}
                    </pre>
                    <div className="btn-next">
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        onClick={handleClick}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <pre className={isClick ? "content hidden" : "content"}>
                      {!isInitialLoad && fileContent1}
                    </pre>
                    <div className="btn-next">
                      <FontAwesomeIcon icon={faHeart} onClick={handleChuc} />
                    </div>
                  </>
                )}
               
              </div>
            ) : (
              <div className="chuctet">
                <pre>{fileContent2}</pre>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div id="login" className={isLogin ? "login" : "login hidden"}>
          <div className="login-wrapper">
            <div className="login-header">ĐĂNG NHẬP</div>
            <div className="login-body">
              {isLogin ? (
                <>
                  <span>Nhập mật khẩu để xem tiếp</span>
                  <div className="login-password">
                    <span>Password</span>
                    <input
                      type="password"
                      placeholder="Mật khẩu có 8 chữ số"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                    <div className="login-btn">
                      <button type="submit" onClick={handleLogin}>
                        LOGIN
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="login-error">
                  Mật khẩu không đúng, vui lòng thử lại.
                  <div className="login-btn">
                    <button onClick={handleRetry}>THỬ LẠI</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
