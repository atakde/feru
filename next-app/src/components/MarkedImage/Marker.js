const Marker = ({ xPercent, yPercent, imgWidth, imgHeight, label }) => {
  const x = (xPercent / 100) * imgWidth;
  const y = (yPercent / 100) * imgHeight;

  return (
    <div
      className="absolute group"
      style={{
        top: `${y}px`,
        left: `${x}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div className="relative">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
      </div>
      {label && (
        <div className="absolute left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-white rounded-md shadow-sm border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          <span className="text-xs text-gray-600">{label}</span>
        </div>
      )}
    </div>
  );
};

export default Marker;
