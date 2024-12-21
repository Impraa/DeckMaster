import { IAddCard } from "../../../types/decklist";

export const asyncFetchAllUserDecklists = (userId: number) => {
  return fetch(`http://localhost:8000/decklist/all/${userId}`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include'
  })
  .then(async (response) => { 
    const data = await response.json();
    if(!response.ok) return { error: true, data: data};
    else return { error: false, data: data};
    })
  .catch((e) => ({ error: true, data: e}));
}

export const asyncFetchAllDecklists = () => {
  return fetch(`http://localhost:8000/decklist/all`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include'
  })
  .then(async (response) => { 
    const data = await response.json();
    if(!response.ok) return { error: true, data: data};
    else return { error: false, data: data};
    })
  .catch((e) => ({ error: true, data: e}));
}
 
export const asyncFetchAllCards = (id: number) => {
    return fetch(`http://localhost:8000/decklist/allCards/${id}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include'
    })
    .then(async (response) => { 
      const data = await response.json();
      if(!response.ok) return { error: true, data: data};
      else return { error: false, data: data};
      })
    .catch((e) => ({ error: true, data: e}));
}
  
export const asyncAddCardToDecklist = (formData: IAddCard, cardId: number) => {
  return fetch(`http://localhost:8000/decklist/card/${cardId}`, {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include'
  })
  .then(async (response) => { 
    const data = await response.json();
    if(!response.ok) return { error: true, data: data};
    else return { error: false, data: data};
    })
  .catch((e) => ({ error: true, data: e}));
}

export const asyncRemoveCardFromDecklist = (decklistId: number, cardId: number, partOfDeck: 'mainDeck' | 'sideDeck' | 'extraDeck') => {
  return fetch(`http://localhost:8000/decklist/${decklistId}/${partOfDeck}/card/${cardId}`, {
    method: 'DELETE',
    credentials: 'include'
  })
  .then(async (response) => { 
    const data = await response.json();
    if(!response.ok) return { error: true, data: data};
    else return { error: false, data: data};
    })
  .catch((e) => ({ error: true, data: e}));
}