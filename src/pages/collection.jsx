import { useState } from "react";

function collection() {
  const [monster, setMonster] = useState();
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/monsters`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setMonster(data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      <h1>DnD Combat Tracker to Be</h1>
    </>
  );
}

export default collection;
