import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "~/api";
import { useContext, useState } from "react";
import { AppContext } from "~/contexts/app-context";

type FormData = {
   username: string;
   password: string;
}

const initFormState: FormData = {
   username: 'admin',
   password: 'qeqe'
}

function Login() {
   const { setIsAuthenticated } = useContext(AppContext)
   const navigate = useNavigate();
   const [formState] = useState<FormData>(initFormState);

   const loginMutation = useMutation({
      mutationFn: (body: FormData) => authApi.login(body)
   })

   const handleSubmitLogin = () => {
      loginMutation.mutate(formState, {
         onSuccess: (data) => {
            setIsAuthenticated(true);
            console.log("onSuccess", data);
            navigate('/')
         },
         onError: (error) => {
            alert(error)
            // if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
            //    const formError = error.response?.data.data
            //    if (formError) {
            //       Object.keys(formError).forEach((key) => {
            //          setError(key as keyof FormData, {
            //             message: formError[key as keyof FormData],
            //             type: 'Server'
            //          })
            //       })
            //    }
            // }
         }
      })
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