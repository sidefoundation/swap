// https://codepen.io/chris__sev/pen/JjRqOxa

function Loader() {
  return (
    <div
      className="bg-secondary flex space-x-3 rounded-full p-5"
      style={{ animationDuration: '0.5s' }}
    >
      <div
        className="h-5 w-5 animate-bounce rounded-full bg-white"
        style={{ animationDelay: '0.1s' }}
      />
      <div
        className="h-5 w-5 animate-bounce rounded-full bg-white"
        style={{ animationDelay: '0.3s' }}
      />
      <div
        className="h-5 w-5 animate-bounce rounded-full bg-white"
        style={{ animationDelay: '0.5s' }}
      />
    </div>
  );
}

export default Loader;
