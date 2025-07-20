import { useLocation } from "react-router";

const ErrorPage = () => {
  const location = useLocation();
  const message = location.state?.error;
  console.log("Error", message);

  return (
    <div>
      <h1>Uuuppppsss ... Something went wrong....</h1>
      <p>Reason: {message}</p>
    </div>
  );
};

export default ErrorPage;
