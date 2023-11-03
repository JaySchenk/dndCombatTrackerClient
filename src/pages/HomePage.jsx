import React from "react";

const people = [
  {
    name: "Calvin Hawkins",
    email: "calvin.hawkins@example.com",
    image:
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Kristen Ramos",
    email: "kristen.ramos@example.com",
    image:
      "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Ted Fox",
    email: "ted.fox@example.com",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

const HomePage = () => {
  return (
    <div>
      <div>
        Welcome to Combat Tracker, the essential tool for Dungeon Masters to
        efficiently monitor and manage intense battles at your gaming table.
        Whether you're a seasoned storyteller or new to the world of
        role-playing, our app is tailored to streamline the chaos of combat
        scenarios. Say goodbye to cluttered notes and frantic dice rolls. With
        Combat Tracker, you can effortlessly oversee each turn, ensuring your
        players' actions and the creatures' responses are accurately recorded.
        Explore our comprehensive resource library, and witness how you can
        orchestrate thrilling encounters and dramatic twists, fostering an
        immersive and captivating gaming experience for everyone involved. Join
        us, and let's craft legendary tales of heroism and adventure together.
      </div>
      <fieldset>
        <legend className="sr-only">Notifications</legend>
        <div className="space-y-5">
          <div className="relative flex items-start">
            <div className="flex h-6 items-center">
              <input
                id="comments"
                aria-describedby="comments-description"
                name="comments"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
            </div>
            <div className="ml-3 text-sm leading-6">
              <label htmlFor="comments" className="font-medium text-gray-900">
                New comments
              </label>{" "}
              <span id="comments-description" className="text-gray-500">
                <span className="sr-only">New comments </span>so you always know
                what's happening.
              </span>
            </div>
          </div>
          <div className="relative flex items-start">
            <div className="flex h-6 items-center">
              <input
                id="candidates"
                aria-describedby="candidates-description"
                name="candidates"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
            </div>
            <div className="ml-3 text-sm leading-6">
              <label htmlFor="candidates" className="font-medium text-gray-900">
                New candidates
              </label>{" "}
              <span id="candidates-description" className="text-gray-500">
                <span className="sr-only">New candidates </span>who apply for
                any open postings.
              </span>
            </div>
          </div>
          <div className="relative flex items-start">
            <div className="flex h-6 items-center">
              <input
                id="offers"
                aria-describedby="offers-description"
                name="offers"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
            </div>
            <div className="ml-3 text-sm leading-6">
              <label htmlFor="offers" className="font-medium text-gray-900">
                Offers
              </label>{" "}
              <span id="offers-description" className="text-gray-500">
                <span className="sr-only">Offers </span>when they are accepted
                or rejected by candidates.
              </span>
            </div>
          </div>
        </div>
      </fieldset>
      <ul className="divide-y divide-gray-200">
        {people.map((person) => (
          <li key={person.email} className="py-4 flex">
            <img className="h-10 w-10 rounded-full" src={person.image} alt="" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{person.name}</p>
              <p className="text-sm text-gray-500">{person.email}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
