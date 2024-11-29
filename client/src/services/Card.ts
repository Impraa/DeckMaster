import { ICard, IMonsterCard } from "../../../types/card";

export const fetchCardsAsync = (offset: number, searchTerm?: string) => {
    return fetch(`http://localhost:8000/card/cards`, {
        method: 'POST',
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ offset: offset, searchTerm: searchTerm ?? '' }),
        credentials: 'include'
      })
      .then(async (response) => { 
        const data = await response.json();
        if(!response.ok) return { error: true, data: data};
        else return { error: false, data: data};
        })
      .catch((e) => ({ error: true, data: e}));
}

export const uploadNewCardAsync = (formData: FormData) => {
  return fetch(`http://localhost:8000/card/new`, {
      method: 'POST',
      body: formData,
      credentials: 'include'
    })
    .then(async (response) => { 
      const data = await response.json();
      if(!response.ok) return { error: true, data: data};
      else return { error: false, data: data};
      })
    .catch((e) => ({ error: true, data: e}));
}

export const deleteCardAsync = (cardId: number) => {
  return fetch(`http://localhost:8000/card/${cardId}`, {
    method: 'DELETE',
    credentials: 'include'
  })
  .then(async (response) => {
    const data = await response.json();
    if (!response.ok) return { error: false, data: data };
    else return { error: false, data: data };
  })
  .catch((e) => ({ error: true, data: e }));
}

export const updateCardAsync = (id: number, formData: ICard | IMonsterCard) => {
  return fetch(`http://localhost:8000/card/${id}`, {
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