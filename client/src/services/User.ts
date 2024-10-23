import { LoginUser } from "../../../types/user"

export const loginUserAsync = (formData: LoginUser) => {
    return fetch(`http://localhost:8000/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      })
      .then(async (response) => { 
        const data = await response.json();
        if(!response.ok) return { error: true, data: data};
        else return { error: false, data: data};
        })
      .catch((e) => console.error(e));
}