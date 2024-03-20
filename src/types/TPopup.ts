import { FormEventHandler, ReactElement } from "react";

export type TPopup = {
  isOpen: boolean;
  setPopupOpen: (value: boolean) => void;
  textTitle: string;
  children: ReactElement<any, any>;
};
