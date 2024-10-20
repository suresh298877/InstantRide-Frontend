import { combineSlices } from "@reduxjs/toolkit";
import axios from "axios";
import { Form, Navigate, useActionData } from "react-router-dom";

const Register = () => {
    const error = useActionData()
    return (
        <Form method="POST" action="/register/" className="mt-[65px]">
            <label htmlFor="username">Username :</label><input placeholder="username" id="username" name="username" type="text" /><br />
            <label htmlFor="email">email :</label><input placeholder="email" id="email" name="email" type="email" /><br />
            <label htmlFor="password1">password :</label><input placeholder="password" id="password1" name="password1" type="password" /><br />
            <label htmlFor="password2">confirm password :</label><input placeholder="confirm password" id="password2" name="password2" type="password" /><br />
            {error ? <p className="text-red-500" >{error}</p> : <></>}
            <button type="submit">submit</button>
        </Form>
    )
}


export const registerAction = async ({ request }) => {
    const form_data = await request.formData()
    const data = {
        username: form_data.get('username'),
        email: form_data.get('email'),
        password: form_data.get('password1'),
    }


    if (data.password != form_data.get('password2')) {
        return ["password should be same"]
    }

    let response = await axios.post('http://127.0.0.1:8000/users/api/register/', data)
    if (response.status == 201) {
        return <Navigate to="/login/" />
    }
    else {
        let error = ["something went wrong"]
        return error;
    }
}
export default Register;