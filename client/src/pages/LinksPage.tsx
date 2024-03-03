import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchLinks } from "../store/tokenSlice";
import Link from "../components/Link";

const LinksPage = () => {
  const [link, setLink] = useState("");
  const token = useAppSelector((state) => state.token.token);
  const links = useAppSelector((state) => state.token.links);
  const dispatch = useAppDispatch();


  const generateLink = async () => {
    await axios
      .post(
        "http://localhost:5000/link/create",
        { link },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        dispatch(fetchLinks(token));
        setLink("");
      });
  };
  useEffect(() => {
    dispatch(fetchLinks(token));
  }, []);


  return (
    <section>
      <div className="flex justify-center items-center m-3">
        <label
          className="block text-gray-700 text-sm m-2 text-lg"
          htmlFor="link"
        >
          Link
        </label>
        <div className="flex w-3/4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="link"
            onChange={(e) => setLink(e.target.value)}
            type="text"
            value={link}
            placeholder="Insert the link here (ex. https://www.yourwebsite.com)"
          />

          <button
            onClick={generateLink}
            className="bg-blue-300 rounded h-12 p-2 mx-2 hover:bg-blue-400 active:translate-y-2"
          >
            Generate
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center">
        {links?.map((link) => {
          return <Link link={link} key={link._id}></Link>;
        })}
      </div>
    </section>
  );
};

export default LinksPage;
