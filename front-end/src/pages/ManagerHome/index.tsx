import { Link } from "react-router";

function Manager() {
  return (
    <div className="container">
      <Link to={'/success-checkout'}>checkout</Link>
      <Link to={'/about'}>About</Link>
      <Link to={'/manager/sign-in'}>Sign-In</Link>
      <h1>Hello</h1>
    </div>
  )
}

export default Manager