import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const handleSubmitLogin = () => {
        localStorage.setItem('token', '123123')
        navigate('/')
    }

    return (
        <div>
            <label htmlFor="username">Tài khoản</label>
            <input id="username" type="text" />
            <br />
            <label htmlFor="password">Mật khẩu</label>
            <input id="password" type="text" />
            <br />
            <button onClick={handleSubmitLogin}>Đăng nhập</button>
        </div>
    );
}

export default Login;