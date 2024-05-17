import { useFormik } from "formik";
import "../../assets/css/Login.css"
import axios from "axios";
import { ENDPOINT } from "../../config/index"
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
const Login = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },

        validate: (values) => {
            let errors = {};
            if (!values.username) {
                errors.username = "Please enter username";
            }
            if (!values.password) {
                errors.password = "Please enter password";
            }
            return errors;
        },
        onSubmit: (values) => {
            try {
                console.log(ENDPOINT);
                axios.post(`${ENDPOINT}/auth/login`, {
                    username: values.username,
                    password: values.password,
                }).then(res => {
                    if (res?.status === 200 && res?.data?.token) {
                        localStorage.setItem('token', res?.data?.token)
                        localStorage.setItem('userData', JSON.stringify(res?.data))
                        navigate('/')
                    }
                }).catch(error => {
                    console.log(error.message);
                })
            } catch (error) {
                console.log(error.message);
            }
        }
    });
    useEffect(() => {
        if (id) {
            getData(id)
        }
    }, [id])
    const getData = async (id) => {
        let res = await axios.get(`https://dummyjson.com/users/${id}`)
        if (res.status === 200) {
            console.log(res.data);
            formik.setFieldValue("username", res?.data?.username)
            formik.setFieldValue("password", res?.data?.password)
        }
    }
    return (
        <>
            <h1>Login</h1>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <input
                        style={{ width: "30%" }}
                        type="text"
                        name="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        placeholder="Enter Username"
                        className={formik.errors.username}
                    />
                    {formik.errors.username ? <div className="error-text">{formik.errors.username}</div> : null}
                </div>
                <div>
                    <input
                        style={{ width: "30%" }}
                        type="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        placeholder="Enter Password"
                        className={formik.errors.password && 'is-error'}

                    />
                    {formik.errors.password ? <div className="error-text">{formik.errors.password}</div> : null}
                </div>
                <div>
                    <a href="/2"><button type="submit" style={{ backgroundColor: "black", color: "white", width: "10%", height: "30px", textAlign: "center", paddingTop: '5px' }}>Login</button></a>
                </div>
            </form>
        </>
    );
};

export default Login;