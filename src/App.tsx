import { useState, type ChangeEvent } from "react";
import type { InputsTypes } from "./types/inputs";
import "./App.css";

import SubmitForm from "./components/SubmitForm";
import ThanksCard from "./components/ThanksCard";

import frontCard from "./assets/bg-card-front.png";
import cardLogo from "./assets/card-logo.svg";
import backCard from "./assets/bg-card-back.png";

const INITIAL_CARD_DETAILS: InputsTypes = {
  holderName: "",
  cardNumber: "",
  month: "",
  year: "",
  cvc: "",
};

function App() {
  const [cardDetails, setCardDetails] =
    useState<InputsTypes>(INITIAL_CARD_DETAILS);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    name: keyof InputsTypes,
  ): void => {
    if (name === "cardNumber") {
      const noSpaces = e.target.value.replace(/\s+/g, "");

      const formatted = noSpaces.replace(/(.{4})(?=.)/g, "$1 ");
      setCardDetails((prev) => ({ ...prev, [name]: formatted }));
    } else {
      setCardDetails((prev) => ({
        ...prev,
        [name]: e.target.value,
      }));
    }
  };

  const handleToggleForm = (): void => {
    if (!isSubmitted) {
      setCardDetails(INITIAL_CARD_DETAILS);
    }
    setIsSubmitted((prev) => !prev);
  };
  return (
    <main className="flex flex-col lg:flex-row min-h-screen font-space-grotesk">
      <h1 className="sr-only">Interactive Card Details Form</h1>
      <section className="relative min-h-60 lg:min-h-full lg:w-120.75 max-w-full bg-(image:--mobile-bg) lg:bg-(image:--desktop-bg) bg-cover bg-center bg-no-repeat">
        <div className="absolute flex flex-col items-center lg:gap-9 top-8 lg:top-1/2 left-4 lg:left-auto right-4 xl:right-[-223.5px] lg:-translate-y-1/2">
          <div className="relative order-2 lg:order-1 mr-14.5 lg:mr-0 xl:-left-23.5 -top-17 sm:-top-26.5 lg:top-auto rounded-[0.625rem] shadow-[-10px_10px_40px_10px_rgba(33,9,47,0.2)]">
            <img
              src={frontCard}
              alt="Front Card Background"
              className="max-w-full"
            />
            <div className="absolute flex flex-col justify-between items-start w-full h-full px-5 py-4.5 sm:px-8 sm:py-7 left-0 top-0">
              <img
                src={cardLogo}
                alt="Card Logo"
                className="w-13.5 sm:w-auto"
              />
              <div className="w-full">
                <p className="text-white text-lg sm:text-[1.75rem] tracking-widest sm:tracking-[3.5px]">
                  {cardDetails.cardNumber === ""
                    ? "0000 0000 0000 0000"
                    : cardDetails.cardNumber}
                </p>
                <div className="flex justify-between text-gray-200 text-[0.625rem] sm:text-sm uppercase tracking-widest sm:tracking-[2px] mt-3 sm:mt-6">
                  <p>
                    {cardDetails.holderName === ""
                      ? "Jana Appleseed"
                      : cardDetails.holderName}
                  </p>
                  <p>{`${cardDetails.month === "" ? "00" : cardDetails.month}/${cardDetails.year === "" ? "00" : cardDetails.year}`}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative order-1 lg:order-2 ml-14.5 lg:ml-0 rounded-[0.625rem] shadow-[-10px_10px_40px_10px_rgba(33,9,47,0.2)]">
            <img
              src={backCard}
              alt="Back Card Background"
              className="max-w-full"
            />
            <p className="absolute top-1/2 -translate-y-1/2 right-10 sm:right-15 text-[0.625rem] sm:text-sm text-white tracking-[.125rem]">
              {cardDetails.cvc === "" ? "000" : cardDetails.cvc}
            </p>
          </div>
        </div>
      </section>
      <section className="flex-1 px-6 pb-11.25 xl:pr-0 xl:pl-32 flex justify-center items-end lg:items-center">
        {!isSubmitted && (
          <SubmitForm
            cardDetails={cardDetails}
            handleChange={handleChange}
            handleToggleForm={handleToggleForm}
          />
        )}
        {isSubmitted && <ThanksCard handleToggleForm={handleToggleForm} />}
      </section>
    </main>
  );
}

export default App;
