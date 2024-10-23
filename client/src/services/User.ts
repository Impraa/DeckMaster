import { LoginUser } from "../../../types/user"

export const loginUserAsync = (formData: LoginUser) => {
    return fetch(`http://localhost:${process.env.PORT || 8000}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      })
}