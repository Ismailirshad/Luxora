const Skeleton = ({ className = "" }) => {
  return (
    <div className={`relative overflow-hidden ${className} mx-auto rounded-lg bg-gray-800 animate-pulse`}>
        <div className="rounded-xl bg-gray-700 w-2/3 h-2/3 mx-auto mt-2"></div>
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="h-8 bg-gray-700 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-700 rounded w-1/2" />
      </div>
    </div>
  );
};

export default Skeleton;
