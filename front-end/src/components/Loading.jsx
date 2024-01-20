import "../styles/loading.css";

const Loading = () => {
  console.log("loading");
  return (
    <div className="loadingScreen">
      <img
        className="myImg"
        src="https://cdn0.iconfinder.com/data/icons/basic-ui-42/24/REFRESH_1-512.png"
      />
    </div>
  );
};

export default Loading;
