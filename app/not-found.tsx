import styles from "@/styles/notFound.module.scss";
export default function NotFound() {
  return (
    <>
      <div className={`${styles["not-found"]}`}>
        <h1>404 - Site not found</h1>
      </div>
    </>
  );
}
