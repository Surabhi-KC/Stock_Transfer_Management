import { SignUp } from "@clerk/clerk-react";

export default function Signup() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <SignUp path="/signup" routing="path" />
    </div>
  );
}
