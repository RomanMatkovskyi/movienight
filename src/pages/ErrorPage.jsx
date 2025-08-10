import { useLocation } from "react-router";
import { Title } from "./ErrorPage.styled";

const ErrorPage = () => {
  const location = useLocation();
  const message = location.state?.error;

  return (
    <div>
      <Title>Uuuppppsss ... Something went wrong....</Title>
      {message && <ErrorMessage>Reason: {message}</ErrorMessage>}
    </div>
  );
};

export default ErrorPage;
