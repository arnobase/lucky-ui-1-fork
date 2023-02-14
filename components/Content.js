
function Content({children}) {

  const style = {
    wrapper: `h-screen w-screen flex items-center justify-center mt-14`,
    content: `bg-[#191B1F] w-[40rem] rounded-2xl p-4`,
  };

  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        {children}
      </div>
    </div>
  );
}

export default Content;
