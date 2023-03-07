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
import Background from "@/components/background";

const Homepage = () => {
  const [words, setwords] = useState<string>("");
  const [secret, setsecret] = useState<string>("");
  const [history, setHistory] = useState<string[]>([]);
  const [isCopy, setIsCopy] = useState<boolean>(false);
  const [tab, setTab] = useState<string>("rahasiain");

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
    setsecret(handleConvert(word));
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
      <Background />
      <section className={styles.hero}>
        <div className={styles["tab"]}>
          <p
            className={[
              styles.button,
              tab === "rahasiain" && styles.active,
            ].join(" ")}
            onClick={() => setTab("rahasiain")}
          >
            Rahasiain
          </p>
          <p
            className={[styles.button, tab === "history" && styles.active].join(
              " "
            )}
            onClick={() => setTab("history")}
          >
            History
          </p>
        </div>
        <div className={styles["content"]}>
          {tab === "history" ? (
            <div>
              <h1>Dokumen rahasia</h1>
              {history.length === 0 && <p>Belum ada rahasia</p>}
              {history.length > 0 ? (
                <p
                  className={[
                    styles.button,
                    styles.delete,
                    styles["delete-all"],
                  ].join(" ")}
                  onClick={() => handleClearAllHistory()}
                >
                  Hapus semua history
                </p>
              ) : null}
              {history.map((item: string, key: number) => (
                <div className={styles["history-item"]} key={key}>
                  <p onClick={() => handleSubmit(item)}>{item}</p>
                  <div className={styles.action}>
                    <p
                      className={[styles.button, styles.copy].join(" ")}
                      onClick={() => handleCopyClipboard(handleConvert(item))}
                    >
                      {isCopy ? "copied" : "copy kode"}
                    </p>
                    <p
                      className={[styles.button, styles.delete].join(" ")}
                      onClick={() => handleDeleteHistory(item)}
                    >
                      hapus
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <h1>Rahasia.in</h1>
              <h3>ngode ke dia dengan gaya</h3>
              <div className={styles["input"]}>
                <input
                  type={"text"}
                  value={words}
                  onChange={(e) => setwords(e.target.value)}
                />
                <button onClick={() => handleSubmit(words)}>Rahasiain</button>
              </div>

              <div className={styles["secret-container"]}>
                <p className={styles.secret}>{secret}</p>
                {secret !== "" ? (
                  <button
                    className={styles["secret-copy"]}
                    onClick={() => handleCopyClipboard(secret)}
                  >
                    {isCopy ? "Copied" : "Copy"}
                  </button>
                ) : null}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Homepage;
