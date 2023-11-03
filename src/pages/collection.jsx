import { useEffect, useState } from "react";
import { useFetcher } from "react-router-dom";

function Collection() {
  const [monster, setMonster] = useState();
  const [loading, setLoading] = useState(true);
  const [enviroment, setEnviroment] = useState();
  const [types, setTypes] = useState();

  // CR slider 0, 1/8 1/4 1/2 1 t/m 30
  // multi select for monster areas
  // multi select for monster race
  // multi select for alignment
  
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/monsters`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setMonster(data.monsters);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/filter/environments`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setEnviroment(data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/filter/types`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setTypes(data);
      })
      .catch((error) => console.log(error));
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>DnD Combat Tracker to Be - collection page - create encounter</h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #000", padding: "10px" }}>Name</th>
            <th style={{ border: "1px solid #000", padding: "10px" }}>Type</th>
            <th style={{ border: "1px solid #000", padding: "10px" }}>CR</th>
            <th style={{ border: "1px solid #000", padding: "10px" }}>
              hitpoints
            </th>
            <th style={{ border: "1px solid #000", padding: "10px" }}>AC</th>
            <th style={{ border: "1px solid #000", padding: "10px" }}>
              allighment{" "}
            </th>
            <th style={{ border: "1px solid #000", padding: "10px" }}>
              Legendary Actions?
            </th>
            <th style={{ border: "1px solid #000", padding: "10px" }}>size</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(monster) &&
            monster.map((monster, index) => (
              <tr key={index} style={{ border: "1px solid #000" }}>
                <td style={{ border: "1px solid #000", padding: "10px" }}>
                  {monster.name}
                </td>
                <td style={{ border: "1px solid #000", padding: "10px" }}>
                  {monster.type}
                </td>
                <td style={{ border: "1px solid #000", padding: "10px" }}>
                  {monster.challenge_rating}
                </td>
                <td style={{ border: "1px solid #000", padding: "10px" }}>
                  {monster.hit_points} hp
                </td>
                <td style={{ border: "1px solid #000", padding: "10px" }}>
                  {monster.armor_class} ac
                </td>
                <td style={{ border: "1px solid #000", padding: "10px" }}>
                  {monster.alignment}
                </td>
                <td style={{ border: "1px solid #000", padding: "10px" }}>
                  {monster.legendary_actions.length > 0 ? "yes" : "no"}
                </td>
                <td style={{ border: "1px solid #000", padding: "10px" }}>
                  {monster.size}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

export default Collection;
