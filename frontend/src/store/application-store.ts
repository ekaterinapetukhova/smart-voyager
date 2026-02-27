import { create } from "zustand/index";

interface ApplicationStore {
  userProfilePopup: boolean;
  updateUserProfilePopup: (show: boolean) => void;
}

export const useApplicationStore = create<ApplicationStore>((set) => {
  return {
    userProfilePopup: false,
    updateUserProfilePopup: (show: boolean) => {
      set(() => ({ userProfilePopup: show }));
    },
  };
});
