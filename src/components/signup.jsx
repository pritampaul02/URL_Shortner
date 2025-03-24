import React, { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { BeatLoader } from "react-spinners";
import Error from "./error";
import * as Yup from "yup";
import useFetch from "@/hooks/use-fetch";
import { signup } from "@/db/apiAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "@/context/context";

const Signup = () => {
    const [errors, setErrors] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        profile_pic: null,
    });

    const { data, error, loading, fn: fnSignup } = useFetch(signup, formData);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const { fetchUser } = UrlState();

    const longLink = searchParams.get("createNew");

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    useEffect(() => {
        console.log(data);
        if (error === null && data) {
            navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
            fetchUser();
        }
    }, [loading, error]);

    const handleSignup = async () => {
        setErrors([]);

        try {
            const schema = Yup.object().shape({
                name: Yup.string().required("Name is required"),
                email: Yup.string()
                    .email("Invalid email")
                    .required("Email is required"),
                password: Yup.string()
                    .min(6, "Password must be at least 6 charecter")
                    .required("Password is required"),
                profile_pic: Yup.mixed().required("Profile pic is required"),
            });

            await schema.validate(formData, { abortEarly: false });

            await fnSignup();
        } catch (error) {
            const newErrors = [];
            error?.inner?.forEach((err) => {
                newErrors[err.path] = err.message;
            });

            setErrors(newErrors);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Signup</CardTitle>
                <CardDescription>
                    create an account if you don't have one.
                </CardDescription>
                {error && <Error message={error?.message} />}
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="space-y-1">
                    <Input
                        name="name"
                        type="text"
                        placeholder="Enter name"
                        onChange={handleInputChange}
                    />
                    {errors.name && <Error message={errors.name} />}
                </div>
                <div className="space-y-1">
                    <Input
                        name="email"
                        type="email"
                        placeholder="Enter email"
                        onChange={handleInputChange}
                    />
                    {errors.email && <Error message={errors.email} />}
                </div>
                <div className="space-y-1">
                    <Input
                        name="password"
                        type="password"
                        placeholder="Enter password"
                        onChange={handleInputChange}
                    />
                    {errors.password && <Error message={errors.password} />}
                </div>
                <div className="space-y-1">
                    <Input
                        name="profile_pic"
                        type="file"
                        accept="image/*"
                        onChange={handleInputChange}
                    />
                    {errors.profile_pic && (
                        <Error message={errors.profile_pic} />
                    )}
                </div>
            </CardContent>
            <CardFooter>
                <Button onClick={handleSignup}>
                    {loading ? (
                        <BeatLoader size={10} color="#1e2939" />
                    ) : (
                        "create account"
                    )}
                </Button>
            </CardFooter>
        </Card>
    );
};

export default Signup;
