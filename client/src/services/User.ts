import { IUpdateUserData, IUser, LoginUser } from "../../../types/user"

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
      .catch((e) => ({ error: true, data: e}));
}

export const registerUserAsync = (formData: Omit<IUser, 'id' | 'role'>) => {
  return fetch(`http://localhost:8000/user/register`, {
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
    .catch((e) => ({ error: true, data: e}));
}

export const refreshUserAsync = () => {
    return fetch(`http://localhost:8000/user/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
      .then(async (response) => { 
        const data = await response.json();
        if(!response.ok) return { error: true, data: data};
        else return { error: false, data: data};
        })
      .catch((e) => ({ error: true, data: e}));
}

export const fetchSingleUserAsync = (id: number) => {
  return fetch(`http://localhost:8000/user/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
  .then(async (response) => { 
    const data = await response.json();
    if(!response.ok) return { error: true, data: data};
    else return { error: false, data: data};
    })
  .catch((e) => ({ error: true, data: e}));
}

export const logoutUserAsync = () => {
  return fetch('http://localhost:8000/user/logout', {
    method: 'DELETE',
    headers: {
      "Content-Type" : "application/json",
    },
    credentials: 'include',
  })
  .then(async (response) => { 
    const data = await response.json();
    if(!response.ok) return { error: true, data: data};
    else return { error: false, data: data};
    })
  .catch((e) => ({ error: true, data: e}));
}

export const updateUserAsync = (id: number, formData: IUpdateUserData) => {
  return fetch(`http://localhost:8000/user/${id}`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
    credentials: 'include'
  })
  .then(async (response) => { 
    const data = await response.json();
    if(!response.ok) return { error: true, data: data};
    else return { error: false, data: data};
    })
  .catch((e) => ({ error: true, data: e}));
}

export const isUserDeckOwnerAsync = (userId: number, deckId: number) => {
  return fetch(`http://localhost:8000/user/${userId}/deck/${deckId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
  .then(async (response) => { 
    const data = await response.json();
    if(!response.ok) return { error: true, data: data};
    else return { error: false, data: data};
    })
  .catch((e) => ({ error: true, data: e}));
}