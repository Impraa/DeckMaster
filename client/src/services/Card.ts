export const fetchCards = (offset: number) => {
    return fetch(`http://localhost:8000/card/cards`, {
        method: 'POST',
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ offset: offset }),
        credentials: 'include'
      })
      .then(async (response) => { 
        const data = await response.json();
        if(!response.ok) return { error: true, data: data};
        else return { error: false, data: data};
        })
      .catch((e) => ({ error: true, data: e}));
}