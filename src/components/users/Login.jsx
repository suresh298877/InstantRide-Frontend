import { Form, Navigate, useActionData, useNavigate, useNavigation } from "react-router-dom";
import { store } from "../../app/store";
import { login } from "../../features/Auth/authSlice";
import axios from "axios";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";



const Login = () => {
    const error = useActionData()
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    const navigate = useNavigate()
    if (isAuthenticated) {
        navigate("/users/")
        return
    }
    return (
        <Form method="POST" action="/login/" className="mt-[65px]" >
            <label htmlFor="username">Username :</label><input placeholder="username" id="username" name="username" type="text" /><br />
            <label htmlFor="password">password :</label><input placeholder="password" id="password" name="password" type="password" /><br />
            {error ? <p>{error}</p> : <></>}
            <button type="submit">submit</button>
        </Form>
    )
}

export const loginAction = async ({ request }) => {
    const form_data = await request.formData()
    const data = {
        username: form_data.get('username'),
        password: form_data.get('password')
    }

    let response = await axios.post('http://127.0.0.1:8000/users/api/token/', data)
    if (response.status == 200) {
        let access_token = response.data.access
        let refresh_token = response.data.refresh
        const user_id = jwtDecode(access_token).user_id
        await store.dispatch(login({ access_token, refresh_token, user_id }))
        localStorage.setItem("access_token", access_token)
        localStorage.setItem("refresh_token", refresh_token)
        localStorage.setItem("isAuthenticated", true)
        return <Navigate to="/users/" />
    }
    else {
        let error = "No active account found with the given credentials"
        return error;
    }
}


export default Login;