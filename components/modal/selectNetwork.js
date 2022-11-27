import { css } from "@emotion/react";

const style = {
  wrapper: `text-white h-80 w-72 flex flex-col justify-center items-center`,
  title: `font-semibold text-xl mb-12`,
};

const cssOverride = css`
  display: block;
  margin: 0 auto;
  border-color: white;
`;

const selectNetwork = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.title}>Select Network</div>
      <li>
        <ul>shiden</ul>
        <ul>Shibuya</ul>
      </li>
    </div>
  );
};

export default selectNetwork;
