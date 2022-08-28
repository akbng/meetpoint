import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { FaTimes } from "react-icons/fa";

import styles from "./index.module.css";

const EventDialog = ({ isOpen, closeDialog, children }) => {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={closeDialog} className={styles.dialog_container}>
        <Transition.Child
          as={Fragment}
          enter={styles.enter}
          enterFrom={styles.enter_from_backdrop}
          enterTo={styles.enter_to_backdrop}
          leave={styles.leave}
          leaveFrom={styles.leave_from_backdrop}
          leaveTo={styles.leave_to_backdrop}
        >
          <div className={styles.backdrop} aria-hidden="true" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter={styles.enter}
          enterFrom={styles.enter_from_dialog}
          enterTo={styles.enter_to_dialog}
          leave={styles.leave}
          leaveFrom={styles.leave_from_dialog}
          leaveTo={styles.leave_to_dialog}
        >
          <div className={styles.panel_container}>
            <Dialog.Panel className={styles.dialog_panel}>
              {children}
              <div className={styles.close_button} onClick={closeDialog}>
                <FaTimes />
              </div>
            </Dialog.Panel>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default EventDialog;
