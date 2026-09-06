import { useEffect, useState } from "react";

export default function MyDialog() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function authorize() {
      try {
        const response = await fetch("/authorize", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            type: "request"
          })
        });

        const res = await response.json();

        if (res.id) {
          setMessage(`Welcome ${res.id}`);
        }
      } catch (error) {
        console.error(error);
      }
    }

    authorize();
  }, []);

  return (
    <div className="m-50 text-center">
      <div className="text-9xl">Welcome</div>

      {message ? (
        <p className="text-xl">{message}</p>
      ) : (
        <p className="text-xl">
          You are not recognized. Are you a user? If yes login{" "}
          <a className="text-blue-300" href="/login">
            here
          </a>
          .
        </p>
      )}
    </div>
  );
}