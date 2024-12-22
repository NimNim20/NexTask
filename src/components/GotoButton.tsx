import { Link } from "react-router-dom";

function GoToButton() {
  return (
    <Link to="/login">
      <button className="h-12 w-32 rounded-lg bg-lime-500">See Projects...</button>
    </Link>
  );
}

export default GoToButton;
