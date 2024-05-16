import { FC } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../Auth/api/store";

import { ButtonCustom } from "../Auth/ui/ButtonCustom";

type Props = {
  setIsModal: (arg: boolean) => void;
  isModal: boolean;
};

export const Modal: FC<Props> = ({ setIsModal, isModal }) => {
  const { logout } = useAuth();
  const redirect = useNavigate();
  const handleCloseModal = () => setIsModal(false);

  const toGoAuth = () => {
    setIsModal(false);
    logout();
    redirect("/auth", { replace: true });
  };

  return (
    <>
      {isModal &&
        createPortal(
          <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-slate-400/40 z-50">
            <div className="animate-[bubble_1s_ease-in-out_1] w-96 bg-white shadow-xl p-6 rounded-md">
              <h2 className="text-2xl mb-5 font-medium">Будь внимателен</h2>
              <p className="text-lg mb-5">
                Без{" "}
                <b
                  onClick={toGoAuth}
                  className="text-sky-500 hover/link:text-sky-300 transition-all cursor-pointer"
                >
                  регистрации
                </b>{" "}
                или{" "}
                <b
                  onClick={toGoAuth}
                  className="text-sky-500 hover/link:text-sky-300 transition-all cursor-pointer"
                >
                  авторизации
                </b>
                , твои цели или задачи при закрытии или перезагрузки страницы
                исчезнут
              </p>
              <ButtonCustom
                label="Понял"
                disabled={false}
                сlick={handleCloseModal}
              />
            </div>
          </div>,
          document.body
        )}
    </>
  );
};
