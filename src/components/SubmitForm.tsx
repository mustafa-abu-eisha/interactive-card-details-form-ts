import { useState, type ChangeEvent, type SubmitEvent } from "react";
import type { ErrorsTypes, InputsTypes } from "../types/inputs";

interface SubmitFormPropsTypes {
  cardDetails: InputsTypes;
  handleChange: (
    e: ChangeEvent<HTMLInputElement>,
    name: keyof InputsTypes,
  ) => void;
  handleToggleForm: () => void;
}

const INITIAL_ERRORS: ErrorsTypes = {
  holderName: null,
  cardNumber: null,
  year: null,
  month: null,
  cvc: null,
};

export default function SubmitForm({
  cardDetails,
  handleChange,
  handleToggleForm,
}: SubmitFormPropsTypes) {
  const [inputsErrors, setInputsErrors] = useState<ErrorsTypes>(INITIAL_ERRORS);

  const getValidation = (
    name: keyof InputsTypes,
    regex: RegExp,
    msg: string = "Wrong format, numbers only",
  ): string | null => {
    if (!cardDetails[name].trim()) {
      return "Can't be blank";
    } else if (!regex.test(cardDetails[name])) {
      return msg;
    } else {
      return null;
    }
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const nameRegex: RegExp = /^[A-Z][a-z]+ [A-Z][a-z]+$/;
    const numberRegex: RegExp = /^(\d{4} ){3}\d{4}$/;
    const monthRegex: RegExp = /^(0[1-9]|1[0-2])$/;
    const yearRegex: RegExp = /^\d{2}$/;
    const cvcRegex: RegExp = /^\d{3}$/;

    const currentErrors: ErrorsTypes = {
      holderName: getValidation(
        "holderName",
        nameRegex,
        "Wrong format, valid name only",
      ),
      cardNumber: getValidation("cardNumber", numberRegex),
      month: getValidation("month", monthRegex),
      year: getValidation("year", yearRegex),
      cvc: getValidation("cvc", cvcRegex),
    };
    setInputsErrors(currentErrors);

    const isValidated = Object.values(currentErrors).every((err) => !err);

    if (isValidated) {
      handleToggleForm();
    }
  };
  return (
    <form className="card" onSubmit={handleSubmit}>
      <div className="relative">
        <label htmlFor="card-holder" className="form-label">
          Cardholder Name
        </label>
        <input
          type="text"
          id="card-holder"
          placeholder="e.g. Jane Appleseed"
          className={`form-input ${inputsErrors.holderName ? "input-error" : ""}`}
          autoComplete="off"
          value={cardDetails.holderName}
          onChange={(e) => handleChange(e, "holderName")}
        />
        {inputsErrors.holderName && (
          <p className="error">{inputsErrors.holderName}</p>
        )}
      </div>
      <div className="mt-5 sm:mt-6.5 relative">
        <label htmlFor="card-number" className="form-label">
          Card Number
        </label>
        <input
          type="text"
          id="card-number"
          placeholder="e.g. 1234 5678 9123 0000"
          className={`form-input ${inputsErrors.cardNumber ? "input-error" : ""}`}
          autoComplete="off"
          value={cardDetails.cardNumber}
          onChange={(e) => handleChange(e, "cardNumber")}
        />
        {inputsErrors.cardNumber && (
          <p className="error">{inputsErrors.cardNumber}</p>
        )}
      </div>
      <div className="flex gap-3 sm:gap-5 mt-5 sm:mt-6.5">
        <div className="flex-1 relative">
          <label htmlFor="date-month" className="form-label">
            Exp. Date (MM/YY)
          </label>
          <div className="flex gap-2 sm:gap-2.5">
            <input
              type="text"
              id="date-month"
              placeholder="MM"
              className={`form-input ${inputsErrors.month ? "input-error mb-3" : ""}`}
              autoComplete="off"
              value={cardDetails.month}
              onChange={(e) => handleChange(e, "month")}
            />
            <input
              type="text"
              id="date-year"
              placeholder="YY"
              className={`form-input ${inputsErrors.year ? "input-error mb-3" : ""}`}
              autoComplete="off"
              value={cardDetails.year}
              onChange={(e) => handleChange(e, "year")}
            />
          </div>
          {(inputsErrors.month || inputsErrors.year) && (
            <p className="error -bottom-3">
              {inputsErrors.month || inputsErrors.year}
            </p>
          )}
        </div>
        <div className="flex-1 relative">
          <label htmlFor="cvc-number" className="form-label">
            CVC
          </label>
          <input
            type="text"
            id="cvc-number"
            placeholder="e.g. 123"
            className={`form-input ${inputsErrors.cvc ? "input-error mb-3" : ""}`}
            autoComplete="off"
            value={cardDetails.cvc}
            onChange={(e) => handleChange(e, "cvc")}
          />
          {inputsErrors.cvc && (
            <p className="error -bottom-3">{inputsErrors.cvc}</p>
          )}
        </div>
      </div>
      <button type="submit" className="btn mt-7 sm:mt-10">
        Confirm
      </button>
    </form>
  );
}
