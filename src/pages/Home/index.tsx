import Head from "next/head";
import { useEffect, useState } from "react";
import { handleConvert } from "@/utils/converter";
import styles from "./Home.module.scss";
import {
  clearAllHistory,
  clearHistory,
  getSecretHistory,
  setSecretHistory,
} from "@/utils/common";

const Homepage = () => {
  const [words, setwords] = useState<string>("");
  const [secret, setsecret] = useState<string>("");
  const [history, setHistory] = useState<string[]>([]);
  const [isCopy, setIsCopy] = useState<boolean>(false);
  const [expandHistory, setExpandHistory] = useState<boolean>(false);

  useEffect(() => {
    const localHistory = getSecretHistory();
    if (localHistory?.length > 0) {
      setHistory(localHistory);
    }
  }, []);

  const handleCopyClipboard = (secret: string) => {
    navigator.clipboard.writeText(secret);
    setIsCopy(true);
    setTimeout(() => {
      setIsCopy(false);
    }, 1000);
  };
  const handleSubmit = (word: string) => {
    setwords(word);
    handleConvert(word, setsecret);
    setSecretHistory(word);
    setHistory(getSecretHistory());
  };

  const handleDeleteHistory = (deletedItem: string) => {
    const deleteOne = history.filter((item) => item !== deletedItem);
    clearHistory(deleteOne);
    setHistory(getSecretHistory());
  };
  const handleClearAllHistory = () => {
    clearAllHistory();
    setHistory(getSecretHistory());
    setwords("");
    setsecret("");
  };

  return (
    <>
      <Head>
        <title>Rahasia.in | secret</title>
        <meta name="description" content="rahasiain by kyra" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={styles.hero}>
        <h1>Rahasia.in</h1>
        <h3>ngode ke dia dengan gaya</h3>
        <input
          type={"text"}
          value={words}
          onFocus={() => setExpandHistory(true)}
          onBlur={() => setExpandHistory(false)}
          onChange={(e) => setwords(e.target.value)}
        />
        <button onClick={() => handleSubmit(words)}>Rahasiain</button>

        {expandHistory ? (
          <div>
            {history.length > 0 ? (
              <p onClick={() => handleClearAllHistory()}>Delete all</p>
            ) : null}
            {history.map((item: string, key: number) => (
              <div key={key}>
                <p onClick={() => handleSubmit(item)}>{item}</p>
                <p onClick={() => handleDeleteHistory(item)}>delete</p>
              </div>
            ))}
          </div>
        ) : null}
        <div>
          <p className={styles.secret}>{secret}</p>
          {secret !== "" ? (
            <button onClick={() => handleCopyClipboard(secret)}>
              {isCopy ? "Copied" : "Copy"}
            </button>
          ) : null}
        </div>
      </section>
    </>
  );
};

export default Homepage;
