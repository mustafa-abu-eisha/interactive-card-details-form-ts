import completeIcon from "../assets/icon-complete.svg";

interface ThanksCardPropsTypes {
  handleToggleForm: () => void;
}

export default function ThanksCard({ handleToggleForm }: ThanksCardPropsTypes) {
  return (
    <div className="card text-center">
      <img src={completeIcon} alt="Complete Icon" className="mx-auto" />
      <h2 className="text-3xl font-medium uppercase text-purple-950 tracking-widest mt-9 mb-4">
        Thank You!
      </h2>
      <p className="text-lg text-gray-400">{"We've added your card details"}</p>
      <button type="button" className="btn mt-11.5" onClick={handleToggleForm}>
        Continue
      </button>
    </div>
  );
}
