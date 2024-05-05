export default function Message({ message }: { message: string }) {
  return (
    <div className="h-screen relative text-[#ECE6D5] bg-[#050c0f] flex justify-center items-center">
      <div
        className="text-6xl md:text-9xl transition-all duration-500"
        style={{ fontFamily: "AntonioBold" }}
      >
        {message}
      </div>
    </div>
  );
}
