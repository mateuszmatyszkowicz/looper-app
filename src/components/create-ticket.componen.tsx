import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { appState } from "../atoms";
import { LayoutElement, Ticket } from "../types";
import DissmissableOverlay from "./dismissable-overlay.component";
import Modal from "./modal.componen";

type CreateTicketModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CreateTicketModal = ({ isOpen, onClose }: CreateTicketModalProps) => {
  const [state, setAppState] = useRecoilState(appState);

  const createNewTicket = () => {
    const id = `${new Date().getTime()}`;
    console.log(id);
    setAppState((state) => ({
      ...state,
      layout: [
        ...state.layout,
        {
          i: id,
          x: 0,
          y: Infinity, // puts it at the bottom
          w: Infinity,
          h: 1,
          collapsed: false,
        } as LayoutElement,
      ],
      tickets: {
        ...state.tickets,
        [id]: Ticket("nowy ticket"),
      },
    }));
  };

  const removeTicket = (ticketId: string) => {
    setAppState((state) => {
      const { [ticketId]: _, ...tickets } = state.tickets;
      const layout = state.layout.filter((l) => l.i !== ticketId);
      return {
        ...state,
        tickets,
        layout,
      };
    });
  };
  return (
    <div>
      {isOpen && (
        <Modal>
          <DissmissableOverlay onClose={onClose}>
            <div
              className="absolute h-auto w-11/12 md:w-1/2 p-5  bg-white dark:bg-gray-700  rounded-md top-2/4 left-2/4"
              style={{ transform: "translate(-50%, -50%)" }}
              data-testid={"settings-modal"}
            >
              <div className="flex flex-col w-full h-auto ">
                <div className="flex w-full h-auto justify-center items-center">
                  <div className="flex w-10/12 h-auto py-3 justify-center items-center text-2xl dark:text-white font-bold dark:bg-gray-700">
                    Settings
                  </div>
                  <div
                    onClick={onClose}
                    className="flex w-1/12 h-auto justify-center cursor-pointer"
                    data-testid={"close-icon"}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-x"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </div>
                </div>
                <div className="flex w-full h-auto py-10 px-2 justify-center items-center bg-gray-200 dark:bg-gray-800 rounded text-center text-gray-500 dark:text-white">
                  <div className="flex flex-col flex-start">
                    <div className="p-5">
                      <button onClick={createNewTicket}>Add new item</button>
                    </div>
                    <div className="p-5">
                      {state.layout.map((l) => (
                        <button onClick={() => removeTicket(l.i)}>
                          Remove {l.i}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DissmissableOverlay>
        </Modal>
      )}
    </div>
  );
};

export default CreateTicketModal;
