import css from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={css.container}>
      <div className={css.dot}></div>
      <div className={css.dot}></div>
      <div className={css.dot}></div>
    </div>
  );
};

export default Loader;
