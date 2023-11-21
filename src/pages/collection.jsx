import { useEffect, useState, useMemo } from "react";
import { useFetcher } from "react-router-dom";

function Collection() {
  const [monster, setMonster] = useState();
  const [loading, setLoading] = useState(true);
  const [enviroment, setEnviroment] = useState();
  const [types, setTypes] = useState();
  const [alignments, setAlignments] = useState();
  const availableValues = [
    0,
    1 / 8,
    1 / 4,
    1 / 2,
    1,
    2,
    3,
    4,
    5,
    7,
    10,
    12,
    15,
    18,
    20,
    25,
    30,
  ];
  const [sliderRange, setSliderRange] = useState({ min: 0, max: 30 });
  const [filteredMonsters, setFilteredMonsters] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // CR slider 0, 1/8 1/4 1/2 1 t/m 30
  // multi select for monster areas
  // multi select for monster race
  // multi select for alignment

  const handleSelectChange = (event, name) => {
    const rawValue = event.target.value;
    let value;

    // Convert fractions to approximate decimal equivalents
    switch (rawValue) {
      case "1/8":
        value = 0.125;
        break;
      case "1/4":
        value = 0.25;
        break;
      case "1/2":
        value = 0.5;
        break;
      default:
        value = parseFloat(rawValue);
    }

    setSliderRange({ ...sliderRange, [name]: value });
  };

  const handleHeaderClick = (key) => {
    let direction = "asc";

    // If the same column is clicked again, reverse the sorting direction
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    setSortConfig({ key, direction });
  };

  const sortedMonsters = useMemo(() => {
    const comparison = (a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    };

    return [...filteredMonsters].sort(comparison);
  }, [filteredMonsters, sortConfig]);

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
    const fetchData = async (endpoint, setter) => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/filter/${endpoint}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setter(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData("environments", setEnviroment);
    fetchData("types", setTypes);
    fetchData("alignment", setAlignments);
  }, []);

  function parseFraction(fractionOrNumber) {
    if (typeof fractionOrNumber === "number") {
      return fractionOrNumber; // Already a number
    }

    // Check if it's a fraction
    if (fractionOrNumber.includes("/")) {
      const [numerator, denominator] = fractionOrNumber.split("/").map(Number);
      if (!isNaN(numerator) && !isNaN(denominator) && denominator !== 0) {
        return numerator / denominator;
      }
    }

    // If it's not a fraction, try parsing it as a float
    const parsedFloat = parseFloat(fractionOrNumber);
    return !isNaN(parsedFloat) ? parsedFloat : NaN;
  }

  useEffect(() => {
    // Check if monsters is not empty before filtering
    if (monster && Array.isArray(monster)) {
      const filtered = monster.filter((monster) => {
        const challengeRating = parseFraction(monster.challenge_rating);
        const isInRange =
          !isNaN(challengeRating) &&
          challengeRating >= sliderRange.min &&
          challengeRating <= sliderRange.max;

        return isInRange;
      });
      setFilteredMonsters(filtered);
    }
  }, [sliderRange, monster]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-gray-900">
      <div className="bg-gray-800 p-4 rounded-lg">
        <label className="text-white" htmlFor="minSelect">
          Min CR :
        </label>
        <select
          id="minSelect"
          className="w-16 mt-2 p-2 rounded"
          value={sliderRange.min}
          onChange={(e) => handleSelectChange(e, "min")}
        >
          {availableValues.map((value) => (
            <option key={value} value={value.toString()}>
              {value}
            </option>
          ))}
        </select>

        <label className="text-white mt-4" htmlFor="maxSelect">
          Max CR :
        </label>
        <select
          id="maxSelect"
          className="w-16 mt-2 p-2 rounded"
          value={sliderRange.max}
          onChange={(e) => handleSelectChange(e, "max")}
        >
          {availableValues.map((value) => (
            <option key={value} value={value.toString()}>
              {value}
            </option>
          ))}
        </select>
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="bg-gray-900 py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto"></div>
              <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none"></div>
            </div>
            <div className="mt-8 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0 cursor-pointer"
                          onClick={() => handleHeaderClick("name")}
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-white cursor-pointer"
                          onClick={() => handleHeaderClick("type")}
                        >
                          Type
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-white cursor-pointer"
                          onClick={() => handleHeaderClick("challenge_rating")}
                        >
                          CR
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-white cursor-pointer"
                          onClick={() => handleHeaderClick("hit_points")}
                        >
                          HP
                        </th>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0 cursor-pointer"
                          onClick={() => handleHeaderClick("armor_class")}
                        >
                          AC
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-white cursor-pointer"
                          onClick={() => handleHeaderClick("alignment")}
                        >
                          Alignment
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-white cursor-pointer"
                          onClick={() => handleHeaderClick("legendary_actions")}
                        >
                          Legendary Actions
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-white cursor-pointer"
                          onClick={() => handleHeaderClick("size")}
                        >
                          Size
                        </th>
                        <th
                          scope="col"
                          className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                        >
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {sortedMonsters.map((monster, index) => (
                        <tr key={index}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                            {monster.name}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                            {monster.type}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                            {monster.challenge_rating}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                            {monster.hit_points}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                            {monster.armor_class}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                            {monster.alignment}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                            {monster.legendary_actions.length > 0
                              ? "yes"
                              : "no"}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                            {monster.size}
                          </td>

                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                            <a
                              href="#"
                              className="text-indigo-400 hover:text-indigo-300"
                            >
                              Add to encounter
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Collection;
