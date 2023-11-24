const TransparentBackground = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="backdrop-blur-sm brightness-75	absolute 0 right-0 top-0 bottom-0 m-auto h-full w-full  items-center shadow-2xl ">
      <div className="flex h-full w-full justify-center items-center ">
        {children}
      </div>
    </div>
  );
};

export default TransparentBackground;
