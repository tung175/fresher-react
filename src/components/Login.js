import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { postLogin } from "../services/UserService";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useDispatch, useSelector } from "react-redux";
import { handleLoginRedux } from "../redux/actions/userAction";

const Login = () => {
  // const {loginContext} = useContext(UserContext)
  const dispatch = useDispatch()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [loadingApi, setLoadingApi] = useState(false);

  const isLoading = useSelector(state => state.user.isLoading)
  const userAcc = useSelector(state => state.user.userAcc)
  const navigate = useNavigate()
  // useEffect(() => {
  //   let token = localStorage.getItem("token")
  //   if (token) {
  //     navigate("/")
  //   }
  // },[])
  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Email or Password not empty");
      return;
    }
    // setLoadingApi(true);
    dispatch(handleLoginRedux(email, password))
    // let res = await postLogin(email.trim(), password);
    // if (res && res.token) {
    //   loginContext(email, res.token)
    //   navigate("/")
    // } else {
    //   if (res && res.status === 400) {
    //     toast.error(res.data.error);
    //   }
    // }
    // setLoadingApi(false);
  };

  const handleGoBack = () => {
    navigate("/")
  }

  const handlePressEnter = (event) => {
    if (event.key === "Enter") {
      handleLogin()
    }
  }

  useEffect(() => {
    if (userAcc && userAcc.auth === true) {
      navigate("/")
    }
  }, [userAcc])
  return (
    <>
      <div className="login-container col-12 col-sm-4">
        <div className="title">Login</div>
        <div className="text">Username or Email</div>
        <input
          type="text"
          className=""
          placeholder="Email or Username"
          onChange={(event) => setEmail(event.target.value)}
        />
        <div className="parent-password">
          <input
            type={isShowPassword === true ? "text" : "password"}
            className=""
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          onKeyDown={(event) => handlePressEnter(event)}

          />
          <i
            className={
              isShowPassword === true
                ? "fa-solid fa-eye"
                : "fa-solid fa-eye-slash"
            }
            onClick={() => setIsShowPassword(!isShowPassword)}
          ></i>
        </div>
        <button
          className={email && password ? "active" : ""}
          disabled={email && password ? false : true}
          onClick={() => handleLogin()}
        >
          {isLoading && <i className="fa-solid fa-sync fa-spin" ></i>}
          &nbsp;
          Login
        </button>
        <div className="back">
          <i className="fa-solid fa-angles-left"></i><span onClick={()=> handleGoBack()}>&nbsp;Go back</span>
        </div>
      </div>
    </>
  );
};

export default Login;
