import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHome, FaQuoteLeft, FaUndoAlt } from "react-icons/fa";

import styles from "./call.module.css";

const farewellQuotes = [
  {
    id: 1,
    quote: "Every new beginning comes from some other beginning’s end.",
    author: "Semisonic",
  },
  {
    id: 2,
    quote: "Farewell! God knows when we shall meet again.",
    author: "William Shakespeare",
  },
  {
    id: 3,
    quote:
      "It is so hard to leave—until you leave. And then it is the easiest thing in the world.",
    author: "John Green",
  },
  {
    id: 4,
    quote:
      "If you’re brave enough to say goodbye, life will reward you with a new hello.",
    author: "Paulo Coelho",
  },
  {
    id: 5,
    quote:
      "Goodbyes make you think. They make you realize what you’ve had, what you’ve lost, and what you’ve taken for granted.",
    author: "Ritu Ghatourey",
  },
  {
    id: 6,
    quote:
      "It’s sad, but sometimes moving on with the rest of your life, starts with goodbye.",
    author: "Carrie Underwood",
  },
  {
    id: 7,
    quote: "Don’t cry because it’s over. Smile because it happened.",
    author: "Dr. Seuss",
  },
  {
    id: 8,
    quote: "Goodbye always makes my throat hurt.",
    author: "Charlie Brown",
  },
  {
    id: 9,
    quote: "Great is the art of beginning, but greater is the art of ending.",
    author: "Henry Wadsworth Longfellow",
  },
  {
    id: 10,
    quote: "Be well, do good work, and keep in touch.",
    author: "Garrison Keillor",
  },
  {
    id: 11,
    quote:
      "A farewell is necessary before we can meet again, and meeting again, after moments or a lifetime, is certain for those who are friends.",
    author: "Richard Bach",
  },
  {
    id: 12,
    quote:
      "I’ll miss you until you come back but I hope you’ll make up for it by getting me awesome gifts.",
    author: "Bon voyage",
  },
];

const getRandomQuote = () =>
  farewellQuotes[Math.floor(Math.random() * farewellQuotes.length)];

const LeaveCall = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    setQuote(getRandomQuote());
  }, []);

  return (
    <div className={styles.container}>
      {quote ? (
        <div className={styles.quotes}>
          <div className={styles.quote}>
            <FaQuoteLeft className={styles.icon} /> {quote.quote}
          </div>
          <div className={styles.author}>~ {quote.author}</div>
        </div>
      ) : (
        <div className={styles.loading} />
      )}
      <div className={styles.buttons}>
        {location.state ? (
          <Link to={location.state.from} className={styles.button}>
            <FaUndoAlt /> Rejoin
          </Link>
        ) : (
          <button className={styles.button} onClick={() => navigate(-1)}>
            <FaUndoAlt /> Rejoin
          </button>
        )}
        <Link to="/dashboard/me" className={styles.button}>
          <FaHome /> Home
        </Link>
      </div>
    </div>
  );
};

export default LeaveCall;
