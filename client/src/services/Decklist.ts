export const fetchAllCardsAsync = (id: number) => {
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