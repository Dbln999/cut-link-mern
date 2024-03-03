import React from "react";
import { fetchLinks, ILinks } from "../store/tokenSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

type LinkProps = {
  link: ILinks;
};

const Link = ({ link }: LinkProps) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.token.token);

  const refreshData = () => {
    dispatch(fetchLinks(token));
  };

  return (
    <div className="w-3/4 h-32 mt-2 shadow border rounded flex flex-col p-2">
      <span>
        Short link:
        <a
          href={link.to}
          target="_blank"
          className="text-blue-400"
          onClick={refreshData}
        >
          {link.to}
        </a>
      </span>
      <span>
        Full link:
        <a href={link.from} target="_blank" className="text-blue-400 ">
          {link.from}
        </a>
      </span>
      <p>Clicks: {link.clicks}</p>
      <small className="text-end mt-5 mr-3">
        Created: {new Date(link.date).toLocaleDateString()}
      </small>
    </div>
  );
};

export default Link;
