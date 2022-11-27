import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";

const style = {
  wrapper: `text-white h-80 w-72 flex flex-col justify-center items-center`,
  title: `font-semibold text-xl mb-12`,
};

const cssOverride = css`
  display: block;
  margin: 0 auto;
  border-color: white;
`;

const LoadingTransaction = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.title}>Sending Transaction ...</div>
      <ClipLoader
        color={"#2F0D72"}
        loading={true}
        css={cssOverride}
        size={70}
      />
    </div>
  );
};

export default LoadingTransaction;
